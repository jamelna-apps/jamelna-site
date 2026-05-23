/**
 * Curated list of US foundations that fund education and non-profit work.
 *
 * HOW TO ADD A NEW FUNDER:
 * 1. Append a `const NEW_ENTRY: CuratedFunder = { ... }` below, or add directly
 *    to the CURATED_FUNDERS array (keep alphabetical by name).
 * 2. Fill every field. The matcher in `lib/grants/curated.ts` uses these to
 *    surface the funder when a user's search overlaps.
 *
 * Field guidance:
 * - id: kebab-case slug, unique.
 * - url: the funder's grants / applications / RFP page when one exists,
 *   otherwise their main giving page. Never link to their homepage if a
 *   clearer grants page is available.
 * - focusAreas: the set of focus areas they fund, OR 'all' if they fund
 *   broadly across education/community causes.
 * - states: two-letter US state codes they fund in, OR 'all' for nationwide.
 * - orgTypes: the org profiles that are typically eligible. Most national
 *   foundations do not fund individual teachers; keep that list narrow.
 * - giving: optional short phrase to display next to the name
 *   (e.g. "~$500M/yr").
 * - tags: freeform keywords for future search improvements.
 *
 * This list is intentionally static and typed — no scraping, no auth, no
 * runtime fetch. Grows by editing this file.
 */

import type { CuratedFunder } from '../types';

export const CURATED_FUNDERS: CuratedFunder[] = [
  {
    id: 'bill-melinda-gates',
    name: 'Bill & Melinda Gates Foundation',
    url: 'https://www.gatesfoundation.org/about/how-we-work/grant-opportunities',
    description:
      'K-12 and post-secondary education, global health. US education focus includes math/ELA curriculum, teaching, and student supports.',
    focusAreas: ['stem', 'cs', 'literacy', 'workforce', 'cte', 'early_childhood', 'general'],
    states: 'all',
    orgTypes: ['school_district', 'individual_school', 'nonprofit_501c3'],
    giving: '~$6B/yr global',
  },
  {
    id: 'california-endowment',
    name: 'The California Endowment',
    url: 'https://www.calendow.org/grants/',
    description:
      'Health and community wellness in California. Funds schools and community-based orgs for youth health, mental health, and equity programs.',
    focusAreas: ['health', 'early_childhood', 'general'],
    states: ['CA'],
    orgTypes: ['school_district', 'individual_school', 'nonprofit_501c3', 'nonprofit_other'],
  },
  {
    id: 'carnegie-corporation-ny',
    name: 'Carnegie Corporation of New York',
    url: 'https://www.carnegie.org/grants/',
    description:
      'Democracy, education, and international peace. Education focus includes teacher preparation, immigrant integration, and higher education.',
    focusAreas: ['literacy', 'workforce', 'cte', 'civics', 'general'],
    states: 'all',
    orgTypes: ['nonprofit_501c3', 'school_district', 'individual_school'],
    giving: '~$150M/yr',
  },
  {
    id: 'chan-zuckerberg',
    name: 'Chan Zuckerberg Initiative',
    url: 'https://chanzuckerberg.com/grants-ventures/',
    description:
      'Personalized learning, educator supports, science research, and community work. Invests in schools, tools, and research orgs.',
    focusAreas: ['stem', 'cs', 'ai_emerging', 'literacy', 'general', 'special_ed'],
    states: 'all',
    orgTypes: ['school_district', 'individual_school', 'nonprofit_501c3'],
  },
  {
    id: 'ford-foundation',
    name: 'Ford Foundation',
    url: 'https://www.fordfoundation.org/work/our-grants/',
    description:
      'Social justice, inequality, civic engagement. Education grants prioritize equity, immigrant rights, and community-led initiatives.',
    focusAreas: 'all',
    states: 'all',
    orgTypes: ['nonprofit_501c3'],
    giving: '~$700M/yr',
  },
  {
    id: 'heinz-endowments',
    name: 'The Heinz Endowments',
    url: 'https://www.heinz.org/grants',
    description:
      'Southwestern Pennsylvania focus. Funds education, arts, environment, and community and economic development in the Pittsburgh region.',
    focusAreas: ['arts', 'stem', 'cs', 'literacy', 'workforce', 'cte', 'environment', 'civics', 'general'],
    states: ['PA'],
    orgTypes: ['school_district', 'individual_school', 'nonprofit_501c3'],
  },
  {
    id: 'hewlett-foundation',
    name: 'William and Flora Hewlett Foundation',
    url: 'https://hewlett.org/grants/',
    description:
      'Open education resources, K-12 math, performing arts, environment, and US democracy. Predominantly invitation-driven but publishes priorities.',
    focusAreas: ['stem', 'cs', 'arts', 'environment', 'civics', 'general'],
    states: 'all',
    orgTypes: ['nonprofit_501c3', 'school_district'],
  },
  {
    id: 'irvine-foundation',
    name: 'The James Irvine Foundation',
    url: 'https://www.irvine.org/',
    description:
      'California workforce and opportunity. Funds workforce development, community colleges, and earnings-focused programs for low-wage workers.',
    focusAreas: ['workforce', 'cte', 'general'],
    states: ['CA'],
    orgTypes: ['nonprofit_501c3', 'individual_school'],
  },
  {
    id: 'kapor-foundation',
    name: 'Kapor Foundation',
    url: 'https://kaporfoundation.org/grantees-and-partners/',
    description:
      'Gap-closing in tech, with a focus on Black, Latinx, and Indigenous communities. Funds computer science education, research, and community orgs.',
    focusAreas: ['stem', 'cs', 'ai_emerging', 'cyber', 'workforce', 'cte'],
    states: 'all',
    orgTypes: ['nonprofit_501c3', 'school_district', 'individual_school'],
    tags: ['computer-science', 'equity', 'oakland'],
  },
  {
    id: 'kellogg-foundation',
    name: 'W.K. Kellogg Foundation',
    url: 'https://www.wkkf.org/grantseekers',
    description:
      'Early childhood, families, and communities with priority geographies (MI, MS, NM, and New Orleans). Funds schools and non-profits.',
    focusAreas: ['early_childhood', 'literacy', 'health', 'civics', 'general'],
    states: 'all',
    orgTypes: ['school_district', 'individual_school', 'nonprofit_501c3', 'nonprofit_other'],
    giving: '~$350M/yr',
  },
  {
    id: 'knight-foundation',
    name: 'John S. and James L. Knight Foundation',
    url: 'https://knightfoundation.org/',
    description:
      'Community journalism, arts, and civic engagement in 26 resident communities. Funds non-profits and creative organizations.',
    focusAreas: ['arts', 'media', 'civics', 'general'],
    states: 'all',
    orgTypes: ['nonprofit_501c3'],
  },
  {
    id: 'lumina-foundation',
    name: 'Lumina Foundation',
    url: 'https://www.luminafoundation.org/our-work/',
    description:
      'Post-secondary credential attainment and equitable access for adults and working learners. Funds systems change, not individuals.',
    focusAreas: ['workforce', 'cte', 'general'],
    states: 'all',
    orgTypes: ['nonprofit_501c3'],
  },
  {
    id: 'macarthur-foundation',
    name: 'John D. and Catherine T. MacArthur Foundation',
    url: 'https://www.macfound.org/grants/',
    description:
      'Criminal justice, climate, local (Chicago and Nigeria), and journalism. Much grantmaking is invitation-only but priorities are published.',
    focusAreas: 'all',
    states: 'all',
    orgTypes: ['nonprofit_501c3'],
  },
  {
    id: 'novo-foundation',
    name: 'NoVo Foundation',
    url: 'https://novofoundation.org/',
    description:
      'Adolescent girls of color, Indigenous communities, local (Kingston NY) initiatives, and social-emotional learning in schools.',
    focusAreas: ['general', 'early_childhood', 'arts'],
    states: 'all',
    orgTypes: ['nonprofit_501c3', 'school_district', 'individual_school'],
  },
  {
    id: 'overdeck-family',
    name: 'Overdeck Family Foundation',
    url: 'https://overdeck.org/grantmaking/funding-approach/',
    description:
      'K-12 STEM and math. Funds in four portfolios: Early Impact, Inspired Minds, Innovative Schools, and Exceptional Educators.',
    focusAreas: ['stem', 'cs', 'early_childhood', 'general'],
    states: 'all',
    orgTypes: ['nonprofit_501c3', 'school_district', 'individual_school'],
  },
  {
    id: 'robin-hood',
    name: 'Robin Hood Foundation',
    url: 'https://www.robinhood.org/our-work/programs/',
    description:
      'Fighting poverty in New York City. Funds education, workforce, mobility, early childhood, health, and housing for NYC non-profits.',
    focusAreas: ['workforce', 'cte', 'early_childhood', 'health', 'literacy', 'general'],
    states: ['NY'],
    orgTypes: ['nonprofit_501c3'],
    giving: '~$200M/yr',
  },
  {
    id: 'schusterman',
    name: 'Charles and Lynn Schusterman Family Philanthropies',
    url: 'https://schusterman.org/',
    description:
      'Education, gender and racial equity, and Jewish community. Funds US schools and non-profit organizations.',
    focusAreas: ['literacy', 'workforce', 'general'],
    states: 'all',
    orgTypes: ['nonprofit_501c3', 'school_district'],
  },
  {
    id: 'siegel-family',
    name: 'Siegel Family Endowment',
    url: 'https://www.siegelendowment.org/what-we-fund/',
    description:
      'Impact of technology on society. Funds research, learning, and workforce programs shaping how tech affects work and community.',
    focusAreas: ['stem', 'cs', 'ai_emerging', 'cyber', 'workforce', 'cte', 'general'],
    states: 'all',
    orgTypes: ['nonprofit_501c3'],
  },
  {
    id: 'spencer-foundation',
    name: 'Spencer Foundation',
    url: 'https://www.spencer.org/why-we-grant',
    description:
      'Education research. Funds investigators (via institutions), not schools directly — ideal for research non-profits and university-affiliated orgs.',
    focusAreas: ['general', 'stem', 'cs', 'literacy', 'workforce', 'cte', 'civics', 'special_ed'],
    states: 'all',
    orgTypes: ['nonprofit_501c3'],
  },
  {
    id: 'stuart-foundation',
    name: 'Stuart Foundation',
    url: 'https://www.stuartfoundation.org/',
    description:
      'Public education in California and Washington State. Funds systems, leadership, and research that improves student learning.',
    focusAreas: ['general', 'literacy', 'workforce', 'cte'],
    states: ['CA', 'WA'],
    orgTypes: ['school_district', 'individual_school', 'nonprofit_501c3'],
  },
  {
    id: 'surdna-foundation',
    name: 'Surdna Foundation',
    url: 'https://surdna.org/',
    description:
      'Sustainable, just, and equitable communities. Funds inclusive economies, sustainable environments, and thriving cultures.',
    focusAreas: ['arts', 'workforce', 'environment', 'general'],
    states: 'all',
    orgTypes: ['nonprofit_501c3'],
  },
  {
    id: 'wallace-foundation',
    name: 'The Wallace Foundation',
    url: 'https://wallacefoundation.org/',
    description:
      'Education leadership, out-of-school learning, and arts participation. Funds school districts, cities, and non-profit intermediaries.',
    focusAreas: ['arts', 'literacy', 'general'],
    states: 'all',
    orgTypes: ['school_district', 'nonprofit_501c3'],
  },
  {
    id: 'walton-family',
    name: 'Walton Family Foundation',
    url: 'https://www.waltonfamilyfoundation.org/grants',
    description:
      'K-12 education (expanding quality schooling and building talent), environment (fisheries/rivers), and home region grantmaking.',
    focusAreas: ['general', 'literacy', 'workforce', 'cte', 'environment'],
    states: 'all',
    orgTypes: ['school_district', 'individual_school', 'nonprofit_501c3'],
    giving: '~$700M/yr',
  },
  {
    id: 'william-t-grant',
    name: 'William T. Grant Foundation',
    url: 'https://wtgrantfoundation.org/',
    description:
      'Research on reducing inequality and improving use of research evidence in youth-serving policy and practice. Applicant institutions only.',
    focusAreas: ['general', 'workforce'],
    states: 'all',
    orgTypes: ['nonprofit_501c3'],
  },
];
