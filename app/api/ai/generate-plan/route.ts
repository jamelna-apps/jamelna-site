import { NextRequest } from 'next/server';
import { getAnthropicClient, MODELS } from '@/lib/ai/client';
import { buildSystemPrompt, buildPlanGenerationPrompt, DistrictProfile, SupportedLocale } from '@/lib/ai/prompts';
import { getContextForQuestion } from '@/lib/ai/rag';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { RateLimiters, getClientIdentifier, createRateLimitResponse } from '@/lib/ai/rateLimiter';
import { validatePlanGeneration, createValidationErrorResponse } from '@/lib/ai/validation';

export const runtime = 'nodejs';
export const maxDuration = 120; // Plan generation can take longer

interface GeneratePlanRequest {
  districtProfile: DistrictProfile;
  locale?: SupportedLocale;
  conversationId?: string;
}

interface ScopeSequenceEntry {
  gradeLevel: string;
  competencies: string[];
  instructionTime: string;
  curricula: string[];
  standards: string[];
}

interface CurriculumRecommendation {
  name: string;
  provider: string;
  gradeLevels: string[];
  features: string[];
  resources: string;
  rationale: string;
}

interface ImplementationPhase {
  phase: string;
  title: string;
  priorities: string[];
}

interface ProfessionalDevelopment {
  essential: string[];
  certifications: string[];
  support: string[];
}

interface SuccessMetrics {
  measurements: string[];
  milestones: string[];
}

interface GeneratedPlan {
  title: string;
  executiveSummary: string;
  scopeSequence: ScopeSequenceEntry[];
  curriculumRecommendations: CurriculumRecommendation[];
  implementationRoadmap: ImplementationPhase[];
  professionalDevelopment: ProfessionalDevelopment;
  successMetrics: SuccessMetrics;
}

/**
 * Parse the AI-generated plan into structured JSON
 */
function parsePlanFromText(text: string): Partial<GeneratedPlan> {
  // This is a simplified parser - in production, you might use structured output
  const plan: Partial<GeneratedPlan> = {};

  // Extract executive summary (typically after ## Executive Summary)
  const summaryMatch = text.match(/##?\s*Executive Summary[:\s]*\n([\s\S]*?)(?=\n##|\n\*\*\d|$)/i);
  if (summaryMatch) {
    plan.executiveSummary = summaryMatch[1].trim();
  }

  // Extract scope & sequence entries
  const scopeSequence: ScopeSequenceEntry[] = [];
  const gradeBands = ['K-2', 'K-5', '3-5', '6-8', '9-12', 'Elementary', 'Middle', 'High'];

  for (const band of gradeBands) {
    const bandRegex = new RegExp(`(?:###?\\s*)?(?:${band}|Grade[s]?\\s*${band})[:\\s]*\\n([\\s\\S]*?)(?=\\n###|\\n##|\\n\\*\\*(?:${gradeBands.join('|')})|$)`, 'i');
    const bandMatch = text.match(bandRegex);

    if (bandMatch) {
      const content = bandMatch[1];
      scopeSequence.push({
        gradeLevel: band,
        competencies: extractBulletPoints(content, /competenc|skills|learn/i),
        instructionTime: extractSingleValue(content, /time|minutes|hours|weekly/i) || 'Not specified',
        curricula: extractBulletPoints(content, /curricul|recommend|program/i),
        standards: extractBulletPoints(content, /standard|CSTA|align/i),
      });
    }
  }

  if (scopeSequence.length > 0) {
    plan.scopeSequence = scopeSequence;
  }

  return plan;
}

function extractBulletPoints(text: string, contextRegex: RegExp): string[] {
  const points: string[] = [];
  const lines = text.split('\n');
  let inContext = false;

  for (const line of lines) {
    if (contextRegex.test(line)) {
      inContext = true;
    }
    if (inContext && /^[\s]*[-•*]\s+(.+)/.test(line)) {
      const match = line.match(/^[\s]*[-•*]\s+(.+)/);
      if (match) {
        points.push(match[1].trim());
      }
    }
    if (inContext && /^#{2,3}/.test(line)) {
      inContext = false;
    }
  }

  // If no context-based extraction worked, get all bullet points
  if (points.length === 0) {
    const allBullets = text.match(/^[\s]*[-•*]\s+(.+)/gm);
    if (allBullets) {
      return allBullets.slice(0, 5).map(b => b.replace(/^[\s]*[-•*]\s+/, '').trim());
    }
  }

  return points.slice(0, 5);
}

function extractSingleValue(text: string, regex: RegExp): string | null {
  const lines = text.split('\n');
  for (const line of lines) {
    if (regex.test(line)) {
      // Try to extract a time value
      const timeMatch = line.match(/(\d+[-–]\d+|\d+)\s*(minutes?|hours?|min|hr)/i);
      if (timeMatch) {
        return `${timeMatch[1]} ${timeMatch[2]}`;
      }
      // Return the whole line content after colon
      const colonMatch = line.match(/:\s*(.+)/);
      if (colonMatch) {
        return colonMatch[1].trim();
      }
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - plan generation is expensive, limit to 5/min
    const clientId = getClientIdentifier(request);
    const rateLimitResult = RateLimiters.planGeneration(clientId);
    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult);
    }

    // Parse and validate input
    const body = await request.json();
    const validationResult = validatePlanGeneration(body);
    if (!validationResult.valid) {
      return createValidationErrorResponse(validationResult.errors || []);
    }

    const { districtProfile, locale = 'en' } = validationResult.data!;
    const supportedLocale = locale as SupportedLocale;
    const conversationId = body.conversationId;

    // Get RAG context for plan generation
    let ragContext = '';
    try {
      const contextQuery = `K-12 CS curriculum scope and sequence for ${districtProfile.state} state ${districtProfile.gradeLevels?.join(' ')} grade levels`;
      ragContext = await getContextForQuestion(contextQuery, districtProfile.state);
    } catch (ragError) {
      console.warn('RAG search failed, continuing without context:', ragError);
    }

    // Build prompts
    const systemPrompt = buildSystemPrompt(districtProfile, supportedLocale, ragContext);
    const userPrompt = buildPlanGenerationPrompt(districtProfile, supportedLocale);

    // Get Anthropic client
    const client = getAnthropicClient();

    // Create streaming response for real-time feedback
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let fullContent = '';

          // Signal that generation is starting
          const startEvent = `data: ${JSON.stringify({ type: 'start', message: 'Generating plan...' })}\n\n`;
          controller.enqueue(encoder.encode(startEvent));

          // Create streaming message
          const messageStream = await client.messages.stream({
            model: MODELS.PLANNING,
            max_tokens: 8192, // Plans can be long
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }],
          });

          // Stream the response
          for await (const event of messageStream) {
            if (event.type === 'content_block_delta') {
              const delta = event.delta;
              if ('text' in delta) {
                fullContent += delta.text;
                const contentEvent = `data: ${JSON.stringify({ type: 'content', content: delta.text })}\n\n`;
                controller.enqueue(encoder.encode(contentEvent));
              }
            }
          }

          // Parse the generated plan
          const parsedPlan = parsePlanFromText(fullContent);

          // Generate a title
          const title = `${districtProfile.schoolName} K-12 CS Education Plan`;

          // Save plan to Firebase
          const db = getAdminFirestore();
          const planData = {
            districtId: (body.districtProfile as Record<string, unknown>)?.id as string || null,
            conversationId: conversationId || null,
            title,
            version: 1,
            locale: supportedLocale,
            rawContent: fullContent,
            scopeSequence: parsedPlan.scopeSequence || [],
            curriculumRecommendations: parsedPlan.curriculumRecommendations || [],
            implementationRoadmap: parsedPlan.implementationRoadmap || [],
            professionalDevelopment: parsedPlan.professionalDevelopment || {},
            successMetrics: parsedPlan.successMetrics || {},
            executiveSummary: parsedPlan.executiveSummary || '',
            districtProfile,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
          };

          const planRef = await db.collection('plans').add(planData);

          // Send completion event with plan ID
          const completeEvent = `data: ${JSON.stringify({
            type: 'complete',
            planId: planRef.id,
            plan: {
              id: planRef.id,
              title,
              ...parsedPlan,
            },
          })}\n\n`;
          controller.enqueue(encoder.encode(completeEvent));

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } catch (error) {
          console.error('Plan generation error:', error);
          const errorEvent = `data: ${JSON.stringify({
            type: 'error',
            error: error instanceof Error ? error.message : 'Plan generation failed',
          })}\n\n`;
          controller.enqueue(encoder.encode(errorEvent));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Generate plan API error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'An error occurred',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
