import type { OrgType, FocusArea } from './types';

// Grants.gov eligibility codes:
// 00 State governments
// 01 County governments
// 02 City or township governments
// 04 Special district governments
// 05 Independent school district
// 06 Public and state-controlled institutions of higher education
// 07 Native American tribal governments (federally recognized)
// 08 Public housing authorities / Indian housing authorities
// 11 Native American tribal organizations (other than federally recognized)
// 12 Nonprofits having a 501(c)(3) status with the IRS
// 13 Nonprofits that do not have a 501(c)(3) status with the IRS
// 20 Private institutions of higher education
// 21 Individuals
// 22 For-profit organizations other than small businesses
// 23 Small businesses
// 25 Others
// 99 Unrestricted

export const GRANTS_GOV_ELIGIBILITY_CODES: Record<OrgType, string[]> = {
  school_district: ['05', '00', '25', '99'],
  individual_school: ['05', '25', '99'],
  nonprofit_501c3: ['12', '25', '99'],
  nonprofit_other: ['13', '25', '99'],
  individual_teacher: [],
};

// Grants.gov funding category codes. Education-focused set.
// Reference: https://www.grants.gov/grants/categories
export const GRANTS_GOV_FUNDING_CATEGORIES: Record<FocusArea, string[]> = {
  stem: ['ED', 'ST'],
  cs: ['ED', 'ST'],
  ai_emerging: ['ED', 'ST'],
  cte: ['ED', 'ELT'],
  cyber: ['ED', 'ST'],
  arts: ['ED', 'HU'],
  literacy: ['ED'],
  health: ['ED', 'HL'],
  workforce: ['ED', 'ELT'],
  early_childhood: ['ED', 'CD'],
  special_ed: ['ED', 'DPR'],
  civics: ['ED', 'ISS'],
  environment: ['ED', 'ENV', 'NR'],
  media: ['ED', 'HU', 'ISS'],
  general: ['ED'],
};

export function supportsGrantsGov(orgType: OrgType): boolean {
  return GRANTS_GOV_ELIGIBILITY_CODES[orgType].length > 0;
}
