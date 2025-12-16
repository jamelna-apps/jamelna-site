import { NextRequest } from 'next/server';
import { getAnthropicClient, MODELS } from '@/lib/ai/client';
import { buildSystemPrompt, DistrictProfile, SupportedLocale } from '@/lib/ai/prompts';
import { getContextForQuestion, searchDocuments, RAGSearchResult } from '@/lib/ai/rag';
import { RateLimiters, getClientIdentifier, createRateLimitResponse } from '@/lib/ai/rateLimiter';
import { validateChatMessage, createValidationErrorResponse } from '@/lib/ai/validation';

export const runtime = 'nodejs';
export const maxDuration = 60;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Format RAG sources for the response
 */
function formatSources(results: RAGSearchResult[]): Array<{
  type: string;
  title: string;
  snippet?: string;
}> {
  const typeLabels: Record<string, string> = {
    csta: 'CSTA Standard',
    state_policy: 'State Policy',
    curriculum: 'Curriculum',
    scope_sequence: 'Scope & Sequence',
  };

  return results.slice(0, 5).map(result => ({
    type: typeLabels[result.docType] || result.docType,
    title: (result.metadata?.code as string) ||
           (result.metadata?.name as string) ||
           (result.metadata?.state as string) ||
           result.id,
    snippet: result.content.slice(0, 150) + (result.content.length > 150 ? '...' : ''),
  }));
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimitResult = RateLimiters.aiChat(clientId);
    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult);
    }

    // Parse and validate input
    const body = await request.json();
    const validationResult = validateChatMessage(body);
    if (!validationResult.valid) {
      return createValidationErrorResponse(validationResult.errors || []);
    }

    const { message, districtProfile, locale = 'en' } = validationResult.data!;
    const supportedLocale = locale as SupportedLocale;
    const messages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];

    // Get RAG context for the question
    let ragContext = '';
    let ragResults: RAGSearchResult[] = [];

    try {
      ragContext = await getContextForQuestion(message, districtProfile?.state);
      // Also get the raw results for source citations
      ragResults = await searchDocuments(message, { limit: 5, minSimilarity: 0.4 });
    } catch (ragError) {
      console.warn('RAG search failed, continuing without context:', ragError);
    }

    // Build system prompt with RAG context
    const systemPrompt = buildSystemPrompt(
      districtProfile || null,
      supportedLocale,
      ragContext
    );

    // Build conversation history for Claude
    const conversationHistory = messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    // Add the current message
    conversationHistory.push({
      role: 'user' as const,
      content: message,
    });

    // Get Anthropic client
    const client = getAnthropicClient();

    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send sources first if available
          if (ragResults.length > 0) {
            const sources = formatSources(ragResults);
            const sourcesEvent = `data: ${JSON.stringify({ type: 'sources', sources })}\n\n`;
            controller.enqueue(encoder.encode(sourcesEvent));
          }

          // Create streaming message
          const messageStream = await client.messages.stream({
            model: MODELS.PLANNING,
            max_tokens: 4096,
            system: systemPrompt,
            messages: conversationHistory,
          });

          // Stream the response
          for await (const event of messageStream) {
            if (event.type === 'content_block_delta') {
              const delta = event.delta;
              if ('text' in delta) {
                const contentEvent = `data: ${JSON.stringify({ type: 'content', content: delta.text })}\n\n`;
                controller.enqueue(encoder.encode(contentEvent));
              }
            }
          }

          // Signal completion
          const doneEvent = `data: ${JSON.stringify({ type: 'done' })}\n\n`;
          controller.enqueue(encoder.encode(doneEvent));
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } catch (error) {
          console.error('Streaming error:', error);
          const errorEvent = `data: ${JSON.stringify({
            type: 'error',
            error: error instanceof Error ? error.message : 'An error occurred',
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
    console.error('Chat API error:', error);
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
