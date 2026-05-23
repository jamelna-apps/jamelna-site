import { getAnthropicClient, MODELS } from '@/lib/ai/client';
import {
  GRANTS_SYSTEM_PROMPT,
  buildGrantRankingPrompt,
  type GrantRankingCandidate,
} from '@/lib/ai/prompts';
import type { OrgProfile, RankedGrant, RawOpportunity } from './types';

const MAX_CANDIDATES_FOR_RANKING = 40;

interface AIRankedEntry {
  opportunityId?: string;
  fitScore?: number;
  fitRationale?: string;
  eligibilityNotes?: string;
  keyDeadline?: string;
  redFlags?: unknown;
}

interface AIRankingResponse {
  results?: AIRankedEntry[];
}

function selectCandidates(pool: RawOpportunity[]): RawOpportunity[] {
  // Prefer opportunities with a close date soonest; stable sort.
  const sorted = [...pool].sort((a, b) => {
    if (!a.closeDate && !b.closeDate) return 0;
    if (!a.closeDate) return 1;
    if (!b.closeDate) return -1;
    return a.closeDate.localeCompare(b.closeDate);
  });
  return sorted.slice(0, MAX_CANDIDATES_FOR_RANKING);
}

function toRankingCandidate(o: RawOpportunity): GrantRankingCandidate {
  return {
    opportunityId: o.id,
    source: o.source,
    title: o.title,
    agency: o.agency,
    description: o.description,
    closeDate: o.closeDate,
    awardCeiling: o.awardCeiling,
    awardFloor: o.awardFloor,
  };
}

function extractJsonBlock(text: string): string | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1);
  }
  return null;
}

function parseAIRanking(text: string): AIRankingResponse | null {
  const block = extractJsonBlock(text);
  if (!block) return null;
  try {
    return JSON.parse(block) as AIRankingResponse;
  } catch {
    return null;
  }
}

function normalizeRedFlags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is string => typeof v === 'string')
    .map((v) => v.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function mergeRanking(
  source: RawOpportunity[],
  aiResults: AIRankedEntry[] | undefined,
): RankedGrant[] {
  const byId = new Map<string, RawOpportunity>();
  for (const o of source) byId.set(o.id, o);

  const rankings = new Map<string, AIRankedEntry>();
  for (const r of aiResults ?? []) {
    if (typeof r.opportunityId === 'string') rankings.set(r.opportunityId, r);
  }

  const merged: RankedGrant[] = [];
  for (const opp of source) {
    const r = rankings.get(opp.id);
    const fitScore = Math.max(0, Math.min(100, Math.round(r?.fitScore ?? 0)));
    merged.push({
      opportunityId: opp.id,
      source: opp.source,
      title: opp.title,
      agency: opp.agency,
      url: opp.url,
      closeDate: opp.closeDate,
      awardCeiling: opp.awardCeiling,
      awardFloor: opp.awardFloor,
      fitScore,
      fitRationale: (r?.fitRationale ?? '').slice(0, 600),
      eligibilityNotes: (r?.eligibilityNotes ?? '').slice(0, 600),
      keyDeadline: r?.keyDeadline ?? opp.closeDate ?? 'No deadline listed',
      redFlags: normalizeRedFlags(r?.redFlags),
    });
  }

  merged.sort((a, b) => b.fitScore - a.fitScore);
  return merged;
}

function unrankedFallback(source: RawOpportunity[]): RankedGrant[] {
  return source.map((opp) => ({
    opportunityId: opp.id,
    source: opp.source,
    title: opp.title,
    agency: opp.agency,
    url: opp.url,
    closeDate: opp.closeDate,
    awardCeiling: opp.awardCeiling,
    awardFloor: opp.awardFloor,
    fitScore: 0,
    fitRationale: 'AI ranking unavailable. Review the opportunity details directly on the source website.',
    eligibilityNotes: '',
    keyDeadline: opp.closeDate ?? 'No deadline listed',
    redFlags: [],
  }));
}

export interface RankStreamEvent {
  type: 'status' | 'content' | 'complete' | 'error';
  message?: string;
  content?: string;
  results?: RankedGrant[];
  unrankedFallback?: boolean;
  candidateCount?: number;
  error?: string;
}

export async function* rankCandidatesStream(
  profile: OrgProfile,
  pool: RawOpportunity[],
): AsyncGenerator<RankStreamEvent> {
  const candidates = selectCandidates(pool);
  if (candidates.length === 0) {
    yield {
      type: 'complete',
      results: [],
      candidateCount: 0,
      unrankedFallback: false,
    };
    return;
  }

  yield {
    type: 'status',
    message: `Ranking ${candidates.length} candidates with Claude…`,
    candidateCount: candidates.length,
  };

  const client = getAnthropicClient();
  const userPrompt = buildGrantRankingPrompt(
    {
      orgType: profile.orgType,
      focusAreas: profile.focusAreas,
      stateCode: profile.stateCode,
      budgetRange: profile.budgetRange,
      projectSummary: profile.projectSummary,
    },
    candidates.map(toRankingCandidate),
  );

  let fullContent = '';
  try {
    const stream = await client.messages.stream({
      model: MODELS.PLANNING,
      max_tokens: 4096,
      system: GRANTS_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && 'text' in event.delta) {
        const chunk = event.delta.text;
        fullContent += chunk;
        yield { type: 'content', content: chunk };
      }
    }
  } catch (err) {
    console.error('[grants.rank] Claude error:', err);
    yield {
      type: 'complete',
      results: unrankedFallback(candidates),
      candidateCount: candidates.length,
      unrankedFallback: true,
    };
    return;
  }

  const parsed = parseAIRanking(fullContent);
  if (!parsed?.results) {
    console.error('[grants.rank] JSON parse failure');
    yield {
      type: 'complete',
      results: unrankedFallback(candidates),
      candidateCount: candidates.length,
      unrankedFallback: true,
    };
    return;
  }

  const merged = mergeRanking(candidates, parsed.results);
  yield {
    type: 'complete',
    results: merged,
    candidateCount: candidates.length,
    unrankedFallback: false,
  };
}
