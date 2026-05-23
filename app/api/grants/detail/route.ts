import { NextRequest } from 'next/server';
import { RateLimiters, getClientIdentifier, createRateLimitResponse } from '@/lib/ai/rateLimiter';
import { fetchGrantsGovDetail } from '@/lib/grants/grantsGov';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const clientId = getClientIdentifier(request);
  const rateLimit = RateLimiters.grantsDetail(clientId);
  if (!rateLimit.success) return createRateLimitResponse(rateLimit);

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const source = searchParams.get('source') ?? 'grants_gov';

  if (!id) {
    return Response.json({ error: 'id is required' }, { status: 400 });
  }
  if (source !== 'grants_gov') {
    return Response.json({ error: 'Unsupported source' }, { status: 400 });
  }

  const detail = await fetchGrantsGovDetail(id);
  if (!detail) {
    return Response.json({ error: 'Opportunity not found' }, { status: 404 });
  }

  return Response.json({ opportunity: detail });
}
