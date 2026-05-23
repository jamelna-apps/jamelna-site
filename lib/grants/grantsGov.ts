import type { OrgProfile, RawOpportunity } from './types';
import {
  GRANTS_GOV_ELIGIBILITY_CODES,
  GRANTS_GOV_FUNDING_CATEGORIES,
  supportsGrantsGov,
} from './eligibilityMap';

const SEARCH_ENDPOINT = 'https://api.grants.gov/v1/api/search2';
const DETAIL_ENDPOINT = 'https://api.grants.gov/v1/api/fetchOpportunity';
const LIST_CACHE_SECONDS = 6 * 60 * 60;
const DETAIL_CACHE_SECONDS = 60 * 60;

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'for', 'to', 'of', 'in', 'on',
  'at', 'by', 'with', 'from', 'as', 'is', 'are', 'was', 'were', 'be',
  'been', 'being', 'this', 'that', 'these', 'those', 'we', 'our', 'us',
  'they', 'them', 'their', 'it', 'its', 'our', 'will', 'would', 'can',
  'could', 'should', 'may', 'might', 'must', 'shall', 'have', 'has',
  'had', 'do', 'does', 'did', 'not',
]);

function keywordsFromSummary(summary: string, max = 5): string {
  const words = summary
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const w of words) {
    if (!seen.has(w)) {
      seen.add(w);
      ordered.push(w);
    }
    if (ordered.length >= max) break;
  }
  return ordered.join(' ');
}

interface GrantsGovSearchBody {
  rows: number;
  keyword?: string;
  oppStatuses: string;
  fundingCategories?: string;
  eligibilities?: string;
  sortBy?: string;
}

interface GrantsGovOpportunityHit {
  id?: string | number;
  number?: string;
  title?: string;
  agencyCode?: string;
  agencyName?: string;
  openDate?: string;
  closeDate?: string;
  oppStatus?: string;
  docType?: string;
  cfdaList?: string[];
  synopsis?: string;
  description?: string;
  awardCeiling?: string | number;
  awardFloor?: string | number;
}

interface GrantsGovSearchResponse {
  errorcode?: number;
  msg?: string;
  data?: {
    hitCount?: number;
    oppHits?: GrantsGovOpportunityHit[];
    searchParams?: unknown;
  };
}

function toNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const n = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function formatYyyymmdd(value: string | undefined | null): string | null {
  if (!value) return null;
  // Grants.gov returns "MM/DD/YYYY"; normalize to ISO YYYY-MM-DD.
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (m) return `${m[3]}-${m[1]}-${m[2]}`;
  const iso = new Date(value);
  if (!isNaN(iso.getTime())) return iso.toISOString().slice(0, 10);
  return value;
}

function normalizeHit(hit: GrantsGovOpportunityHit, profile: OrgProfile): RawOpportunity {
  const id = String(hit.id ?? hit.number ?? crypto.randomUUID());
  return {
    id,
    source: 'grants_gov',
    title: hit.title ?? 'Untitled opportunity',
    agency: hit.agencyName ?? hit.agencyCode ?? 'Unknown agency',
    description: hit.synopsis ?? hit.description ?? '',
    url: `https://www.grants.gov/search-results-detail/${encodeURIComponent(id)}`,
    closeDate: formatYyyymmdd(hit.closeDate),
    postedDate: formatYyyymmdd(hit.openDate),
    awardCeiling: toNumberOrNull(hit.awardCeiling),
    awardFloor: toNumberOrNull(hit.awardFloor),
    eligibilityCodes: GRANTS_GOV_ELIGIBILITY_CODES[profile.orgType],
    fundingCategories: Array.from(
      new Set(
        profile.focusAreas.flatMap((f) => GRANTS_GOV_FUNDING_CATEGORIES[f] ?? []),
      ),
    ),
    cfdaList: Array.isArray(hit.cfdaList) ? hit.cfdaList : [],
    raw: hit,
  };
}

function buildSearchBody(profile: OrgProfile): GrantsGovSearchBody | null {
  if (!supportsGrantsGov(profile.orgType)) return null;
  const eligibilities = GRANTS_GOV_ELIGIBILITY_CODES[profile.orgType].join('|');
  const unionCategories = new Set<string>();
  for (const focus of profile.focusAreas) {
    for (const c of GRANTS_GOV_FUNDING_CATEGORIES[focus] ?? []) {
      unionCategories.add(c);
    }
  }
  const categories = Array.from(unionCategories).join('|');
  const keyword = keywordsFromSummary(profile.projectSummary);
  const oppStatuses = profile.includeForecasted ? 'forecasted|posted' : 'posted';

  return {
    rows: 100,
    keyword: keyword || undefined,
    oppStatuses,
    fundingCategories: categories || undefined,
    eligibilities: eligibilities || undefined,
    sortBy: 'closeDate:asc',
  };
}

function withinDeadlineWindow(
  opp: RawOpportunity,
  includeForecasted: boolean,
  windowDays = 180,
): boolean {
  if (!opp.closeDate) return includeForecasted;
  const close = new Date(opp.closeDate);
  if (isNaN(close.getTime())) return true;
  const now = Date.now();
  const diffDays = (close.getTime() - now) / (1000 * 60 * 60 * 24);
  if (diffDays < 0) return false;
  if (includeForecasted) return true;
  return diffDays <= windowDays;
}

export async function searchGrantsGov(profile: OrgProfile): Promise<RawOpportunity[]> {
  const body = buildSearchBody(profile);
  if (!body) return [];

  let response: Response;
  try {
    response = await fetch(SEARCH_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      next: { revalidate: LIST_CACHE_SECONDS, tags: ['grants-gov'] },
    });
  } catch (err) {
    console.error('[grants.gov] fetch failed:', err);
    return [];
  }

  if (!response.ok) {
    console.error('[grants.gov] non-OK response:', response.status);
    return [];
  }

  const payload = (await response.json()) as GrantsGovSearchResponse;
  if (payload.errorcode && payload.errorcode !== 0) {
    console.error('[grants.gov] error payload:', payload.msg);
    return [];
  }
  const hits = payload.data?.oppHits ?? [];
  const normalized = hits.map((h) => normalizeHit(h, profile));
  return normalized.filter((opp) => withinDeadlineWindow(opp, profile.includeForecasted));
}

interface GrantsGovDetailResponse {
  data?: {
    id?: string | number;
    opportunityTitle?: string;
    synopsis?: { synopsisDesc?: string };
    agencyName?: string;
    closeDate?: string;
    openDate?: string;
    awardCeiling?: string | number;
    awardFloor?: string | number;
    cfdaList?: string[];
  };
  errorcode?: number;
  msg?: string;
}

export async function fetchGrantsGovDetail(id: string): Promise<RawOpportunity | null> {
  let response: Response;
  try {
    response = await fetch(DETAIL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ opportunityId: id }),
      next: { revalidate: DETAIL_CACHE_SECONDS, tags: ['grants-gov-detail'] },
    });
  } catch (err) {
    console.error('[grants.gov] detail fetch failed:', err);
    return null;
  }
  if (!response.ok) return null;
  const payload = (await response.json()) as GrantsGovDetailResponse;
  const data = payload.data;
  if (!data) return null;

  return {
    id: String(data.id ?? id),
    source: 'grants_gov',
    title: data.opportunityTitle ?? 'Untitled opportunity',
    agency: data.agencyName ?? 'Unknown agency',
    description: data.synopsis?.synopsisDesc ?? '',
    url: `https://www.grants.gov/search-results-detail/${encodeURIComponent(id)}`,
    closeDate: formatYyyymmdd(data.closeDate),
    postedDate: formatYyyymmdd(data.openDate),
    awardCeiling: toNumberOrNull(data.awardCeiling),
    awardFloor: toNumberOrNull(data.awardFloor),
    eligibilityCodes: [],
    fundingCategories: [],
    cfdaList: Array.isArray(data.cfdaList) ? data.cfdaList : [],
    raw: data,
  };
}
