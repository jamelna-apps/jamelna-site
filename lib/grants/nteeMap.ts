import type { FocusArea } from './types';

// NTEE major codes most relevant to education/non-profit grantmakers.
// Used to query ProPublica Nonprofit Explorer for private foundations likely
// to fund a given focus area.
// Reference: https://projects.propublica.org/nonprofits/api
export const NTEE_CODES_BY_FOCUS: Record<FocusArea, number[]> = {
  // 1 = Arts/Culture/Humanities, 4 = Environment, 5 = Education,
  // 6 = Health, 7 = Public/Societal Benefit, 9 = Employment, 20 = Philanthropy
  stem: [5, 20],
  cs: [5, 20],
  ai_emerging: [5, 20],
  cte: [5, 9, 20],
  cyber: [5, 20],
  arts: [1, 20],
  literacy: [5, 20],
  health: [6, 20],
  workforce: [9, 20],
  early_childhood: [5, 20],
  special_ed: [5, 20],
  civics: [7, 20],
  environment: [4, 20],
  media: [1, 7, 20],
  general: [5, 20],
};
