// Shared types for the grant-discovery tool at /resources/grants.

export type OrgType =
  | 'school_district'
  | 'individual_school'
  | 'nonprofit_501c3'
  | 'nonprofit_other'
  | 'individual_teacher';

export type FocusArea =
  | 'stem'
  | 'cs'
  | 'ai_emerging'
  | 'cte'
  | 'cyber'
  | 'arts'
  | 'literacy'
  | 'health'
  | 'workforce'
  | 'early_childhood'
  | 'special_ed'
  | 'civics'
  | 'environment'
  | 'media'
  | 'general';

export type BudgetRange =
  | 'lt_10k'
  | '10k_50k'
  | '50k_250k'
  | '250k_1m'
  | 'gt_1m';

export interface OrgProfile {
  orgType: OrgType;
  focusAreas: FocusArea[];
  stateCode: string;
  budgetRange: BudgetRange;
  projectSummary: string;
  includeForecasted: boolean;
}

export type GrantSource = 'grants_gov' | 'propublica' | 'donors_choose';

export interface RawOpportunity {
  id: string;
  source: GrantSource;
  title: string;
  agency: string;
  description: string;
  url: string;
  closeDate: string | null;
  postedDate: string | null;
  awardCeiling: number | null;
  awardFloor: number | null;
  eligibilityCodes: string[];
  fundingCategories: string[];
  cfdaList: string[];
  raw: unknown;
}

export interface RankedGrant {
  opportunityId: string;
  source: GrantSource;
  title: string;
  agency: string;
  url: string;
  closeDate: string | null;
  awardCeiling: number | null;
  awardFloor: number | null;
  fitScore: number;
  fitRationale: string;
  eligibilityNotes: string;
  keyDeadline: string;
  redFlags: string[];
}

export interface SearchMeta {
  requestedAt: string;
  candidateCount: number;
  rankedCount: number;
  sources: {
    grantsGov: boolean;
    propublica: boolean;
    donorsChoose: boolean;
  };
  notes?: string;
}

export interface SearchResponse {
  meta: SearchMeta;
  profile: OrgProfile;
  results: RankedGrant[];
  curatedFunders?: CuratedFunder[];
  foundationLeads?: FoundationLead[];
  classroomProjects?: ClassroomProject[];
  unrankedFallback?: boolean;
}

export interface CuratedFunder {
  id: string;
  name: string;
  url: string;
  description: string;
  focusAreas: FocusArea[] | 'all';
  states: string[] | 'all';
  orgTypes: OrgType[];
  giving?: string;
  tags?: string[];
}

export interface FoundationLead {
  ein: string;
  name: string;
  state: string;
  ntee: string | null;
  grantsPaid: number | null;
  url: string;
}

export interface ClassroomProject {
  id: string;
  title: string;
  subject: string;
  url: string;
  costToComplete: number;
}
