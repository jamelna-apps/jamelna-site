import { CURATED_FUNDERS } from './data/curatedFunders';
import type { CuratedFunder, OrgProfile } from './types';

function matchesFocus(funder: CuratedFunder, profile: OrgProfile): boolean {
  if (funder.focusAreas === 'all') return true;
  return profile.focusAreas.some((f) => (funder.focusAreas as readonly string[]).includes(f));
}

function matchesState(funder: CuratedFunder, profile: OrgProfile): boolean {
  if (funder.states === 'all') return true;
  return funder.states.includes(profile.stateCode);
}

function matchesOrgType(funder: CuratedFunder, profile: OrgProfile): boolean {
  return funder.orgTypes.includes(profile.orgType);
}

export function selectCuratedFunders(
  profile: OrgProfile,
  max = 8,
): CuratedFunder[] {
  const candidates = CURATED_FUNDERS.filter(
    (f) =>
      matchesOrgType(f, profile) &&
      matchesFocus(f, profile) &&
      matchesState(f, profile),
  );

  // Prefer state-specific funders (they're more likely actionable), then
  // focus-specific, then general.
  const score = (f: CuratedFunder): number => {
    const stateSpecific = f.states !== 'all' ? 2 : 0;
    const focusSpecific = f.focusAreas !== 'all' ? 1 : 0;
    return stateSpecific + focusSpecific;
  };

  return [...candidates]
    .sort((a, b) => score(b) - score(a) || a.name.localeCompare(b.name))
    .slice(0, max);
}
