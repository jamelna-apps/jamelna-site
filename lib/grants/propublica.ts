import type { FocusArea, FoundationLead } from './types';
import { NTEE_CODES_BY_FOCUS } from './nteeMap';

function unionNteeCodes(focusAreas: FocusArea[]): number[] {
  const set = new Set<number>();
  for (const f of focusAreas) {
    for (const code of NTEE_CODES_BY_FOCUS[f] ?? []) set.add(code);
  }
  return Array.from(set);
}

const SEARCH_ENDPOINT = 'https://projects.propublica.org/nonprofits/api/v2/search.json';
const LIST_CACHE_SECONDS = 6 * 60 * 60;

interface ProPublicaHit {
  ein?: number;
  name?: string;
  state?: string;
  ntee_code?: string | null;
  strein?: string;
  sub_name?: string;
}

interface ProPublicaSearchResponse {
  total_results?: number;
  organizations?: ProPublicaHit[];
}

async function searchByNtee(
  nteeMajor: number,
  stateCode: string,
): Promise<ProPublicaHit[]> {
  const url = new URL(SEARCH_ENDPOINT);
  url.searchParams.set('ntee[id]', String(nteeMajor));
  url.searchParams.set('state[id]', stateCode);
  // Prioritize private foundations (subsection 4 = 501(c)(3) private foundations).
  url.searchParams.set('c_code[id]', '3');

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: LIST_CACHE_SECONDS, tags: ['propublica'] },
    });
    if (!response.ok) return [];
    const payload = (await response.json()) as ProPublicaSearchResponse;
    return payload.organizations ?? [];
  } catch (err) {
    console.error('[propublica] fetch failed:', err);
    return [];
  }
}

export async function searchFoundationLeads(
  focusAreas: FocusArea[],
  stateCode: string,
  max = 6,
): Promise<FoundationLead[]> {
  const nteeMajors = unionNteeCodes(focusAreas);
  const codes = nteeMajors.length > 0 ? nteeMajors : [5, 20];
  const hits = (
    await Promise.all(codes.map((code) => searchByNtee(code, stateCode)))
  ).flat();

  const seen = new Set<string>();
  const leads: FoundationLead[] = [];
  for (const h of hits) {
    const ein = h.ein ? String(h.ein) : '';
    if (!ein || seen.has(ein)) continue;
    seen.add(ein);
    leads.push({
      ein,
      name: h.name ?? 'Unnamed foundation',
      state: h.state ?? stateCode,
      ntee: h.ntee_code ?? null,
      grantsPaid: null,
      url: `https://projects.propublica.org/nonprofits/organizations/${ein}`,
    });
    if (leads.length >= max) break;
  }
  return leads;
}
