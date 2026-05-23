import type { ClassroomProject, OrgProfile } from './types';

const ENDPOINT = 'https://api.donorschoose.org/common/json-feed.html';
const LIST_CACHE_SECONDS = 6 * 60 * 60;

interface DonorsChooseProposal {
  id?: string;
  title?: string;
  subject?: { name?: string };
  proposalURL?: string;
  costToComplete?: string | number;
}

interface DonorsChooseResponse {
  proposals?: DonorsChooseProposal[];
}

export async function searchClassroomProjects(
  profile: OrgProfile,
  max = 6,
): Promise<ClassroomProject[]> {
  const apiKey = process.env.DONORSCHOOSE_API_KEY;
  if (!apiKey) return [];
  if (profile.orgType !== 'individual_teacher' && profile.orgType !== 'individual_school') {
    return [];
  }

  const url = new URL(ENDPOINT);
  url.searchParams.set('APIKey', apiKey);
  url.searchParams.set('state', profile.stateCode);
  url.searchParams.set('max', String(max));
  url.searchParams.set('keywords', profile.projectSummary.slice(0, 120));

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: LIST_CACHE_SECONDS, tags: ['donors-choose'] },
    });
    if (!response.ok) return [];
    const payload = (await response.json()) as DonorsChooseResponse;
    return (payload.proposals ?? []).slice(0, max).map((p) => ({
      id: String(p.id ?? crypto.randomUUID()),
      title: p.title ?? 'Classroom project',
      subject: p.subject?.name ?? 'General',
      url: p.proposalURL ?? 'https://www.donorschoose.org/',
      costToComplete: Number(p.costToComplete ?? 0),
    }));
  } catch (err) {
    console.error('[donorschoose] fetch failed:', err);
    return [];
  }
}
