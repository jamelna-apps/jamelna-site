import { NextRequest } from 'next/server';
import { RateLimiters, getClientIdentifier, createRateLimitResponse } from '@/lib/ai/rateLimiter';
import { validateGrantSearch, createValidationErrorResponse } from '@/lib/ai/validation';
import { searchGrantsGov } from '@/lib/grants/grantsGov';
import { searchFoundationLeads } from '@/lib/grants/propublica';
import { searchClassroomProjects } from '@/lib/grants/donorsChoose';
import { selectCuratedFunders } from '@/lib/grants/curated';
import { rankCandidatesStream } from '@/lib/grants/rank';
import type {
  OrgProfile,
  SearchMeta,
  FoundationLead,
  ClassroomProject,
  RankedGrant,
} from '@/lib/grants/types';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const clientId = getClientIdentifier(request);
  const rateLimit = RateLimiters.grantsSearch(clientId);
  if (!rateLimit.success) return createRateLimitResponse(rateLimit);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return createValidationErrorResponse([{ field: 'body', message: 'Invalid JSON' }]);
  }

  const validation = validateGrantSearch(body);
  if (!validation.valid) {
    return createValidationErrorResponse(validation.errors ?? []);
  }
  const input = validation.data!;
  const profile: OrgProfile = {
    orgType: input.orgType as OrgProfile['orgType'],
    focusAreas: input.focusAreas as OrgProfile['focusAreas'],
    stateCode: input.stateCode,
    budgetRange: input.budgetRange as OrgProfile['budgetRange'],
    projectSummary: input.projectSummary,
    includeForecasted: input.includeForecasted,
  };

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (payload: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      };

      try {
        send({ type: 'status', message: 'Searching Grants.gov…' });
        const [rawGrantsGov, foundationLeads, classroomProjects] = await Promise.all([
          searchGrantsGov(profile),
          searchFoundationLeads(profile.focusAreas, profile.stateCode).catch(() => [] as FoundationLead[]),
          searchClassroomProjects(profile).catch(() => [] as ClassroomProject[]),
        ]);

        send({
          type: 'status',
          message: `Found ${rawGrantsGov.length} federal opportunities. Ranking…`,
          candidateCount: rawGrantsGov.length,
        });

        let results: RankedGrant[] = [];
        let unrankedFallback = false;
        let candidateCount = rawGrantsGov.length;

        for await (const event of rankCandidatesStream(profile, rawGrantsGov)) {
          if (event.type === 'status') {
            send({ type: 'status', message: event.message, candidateCount: event.candidateCount });
          } else if (event.type === 'content') {
            send({ type: 'content', content: event.content });
          } else if (event.type === 'complete') {
            results = event.results ?? [];
            unrankedFallback = Boolean(event.unrankedFallback);
            candidateCount = event.candidateCount ?? candidateCount;
          }
        }

        const meta: SearchMeta = {
          requestedAt: new Date().toISOString(),
          candidateCount,
          rankedCount: results.length,
          sources: {
            grantsGov: rawGrantsGov.length > 0,
            propublica: foundationLeads.length > 0,
            donorsChoose: classroomProjects.length > 0,
          },
          notes: unrankedFallback
            ? 'AI ranking unavailable — results shown unranked.'
            : undefined,
        };

        const curatedFunders = selectCuratedFunders(profile);

        send({
          type: 'complete',
          meta,
          profile,
          results,
          curatedFunders,
          foundationLeads,
          classroomProjects,
          unrankedFallback,
        });
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      } catch (err) {
        console.error('[api/grants/search] error:', err);
        send({
          type: 'error',
          error: err instanceof Error ? err.message : 'Search failed',
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
