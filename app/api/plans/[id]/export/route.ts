import { NextRequest } from 'next/server';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { RateLimiters, getClientIdentifier, createRateLimitResponse } from '@/lib/ai/rateLimiter';
import { generateMarkdown } from '@/lib/export/markdown';
import { generatePDF } from '@/lib/export/pdf';
import { Plan } from '@/lib/export/templates';

export const runtime = 'nodejs';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/plans/[id]/export - Export a plan as PDF or Markdown
 * Query params: format ('pdf' | 'markdown')
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Rate limiting - 10 exports per minute
    const clientId = getClientIdentifier(request);
    const rateLimitResult = RateLimiters.export(clientId);
    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult);
    }

    const { id } = await params;
    const format = request.nextUrl.searchParams.get('format') || 'markdown';

    const db = getAdminFirestore();
    const planDoc = await db.collection('plans').doc(id).get();

    if (!planDoc.exists) {
      return Response.json({ error: 'Plan not found' }, { status: 404 });
    }

    const data = planDoc.data();
    const plan: Plan = {
      id: planDoc.id,
      title: data?.title || 'K-12 CS Education Plan',
      version: data?.version,
      executiveSummary: data?.executiveSummary,
      rawContent: data?.rawContent,
      scopeSequence: data?.scopeSequence,
      curriculumRecommendations: data?.curriculumRecommendations,
      implementationRoadmap: data?.implementationRoadmap,
      professionalDevelopment: data?.professionalDevelopment,
      successMetrics: data?.successMetrics,
      createdAt: data?.createdAt?.toDate?.()?.toISOString(),
      updatedAt: data?.updatedAt?.toDate?.()?.toISOString(),
    };

    if (format === 'markdown') {
      const markdown = generateMarkdown(plan);
      const filename = `${plan.title.replace(/\s+/g, '-').toLowerCase()}.md`;

      return new Response(markdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    } else if (format === 'pdf') {
      // Generate actual PDF using @react-pdf/renderer
      const pdfBuffer = await generatePDF(plan);
      const filename = `${plan.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;

      // Convert Buffer to Uint8Array for Web API Response compatibility
      const uint8Array = new Uint8Array(pdfBuffer);

      return new Response(uint8Array, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    return Response.json({ error: 'Invalid format' }, { status: 400 });
  } catch (error) {
    console.error('Error exporting plan:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to export plan' },
      { status: 500 }
    );
  }
}
