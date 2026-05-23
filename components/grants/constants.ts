import type { BudgetRange, FocusArea, OrgType } from '@/lib/grants/types';

export const ORG_TYPE_OPTIONS: { value: OrgType; label: string; description: string }[] = [
  {
    value: 'school_district',
    label: 'School district',
    description: 'Public K-12 school district or local education agency.',
  },
  {
    value: 'individual_school',
    label: 'Individual school',
    description: 'A single public or charter school applying on its own.',
  },
  {
    value: 'nonprofit_501c3',
    label: '501(c)(3) non-profit',
    description: 'IRS-recognized 501(c)(3) tax-exempt organization.',
  },
  {
    value: 'nonprofit_other',
    label: 'Non-profit (non-501(c)(3))',
    description: 'Non-profit that is not a 501(c)(3) — e.g. fiscally sponsored or 501(c)(6).',
  },
  {
    value: 'individual_teacher',
    label: 'Individual teacher',
    description: 'A teacher seeking classroom-level funding in your own name.',
  },
];

export const FOCUS_OPTIONS: { value: FocusArea; label: string }[] = [
  { value: 'stem', label: 'STEM (science, technology, engineering, math)' },
  { value: 'cs', label: 'Computer science / coding' },
  { value: 'ai_emerging', label: 'AI / emerging technology' },
  { value: 'cte', label: 'Career & technical education (CTE)' },
  { value: 'cyber', label: 'Cybersecurity' },
  { value: 'arts', label: 'Arts, humanities, creative' },
  { value: 'literacy', label: 'Literacy / reading' },
  { value: 'health', label: 'Health, wellness, mental health' },
  { value: 'workforce', label: 'Workforce / career pathways' },
  { value: 'early_childhood', label: 'Early childhood' },
  { value: 'special_ed', label: 'Special education / disability services' },
  { value: 'civics', label: 'Civics / social studies / democracy' },
  { value: 'environment', label: 'Environmental / sustainability' },
  { value: 'media', label: 'Media / journalism literacy' },
  { value: 'general', label: 'General education / other' },
];

export const BUDGET_OPTIONS: { value: BudgetRange; label: string }[] = [
  { value: 'lt_10k', label: 'Under $10,000' },
  { value: '10k_50k', label: '$10,000 – $50,000' },
  { value: '50k_250k', label: '$50,000 – $250,000' },
  { value: '250k_1m', label: '$250,000 – $1 million' },
  { value: 'gt_1m', label: 'Over $1 million' },
];

export const US_STATES: { code: string; name: string }[] = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
  { code: 'DC', name: 'District of Columbia' }, { code: 'PR', name: 'Puerto Rico' },
];

export const ORG_TYPE_LABELS: Record<OrgType, string> = Object.fromEntries(
  ORG_TYPE_OPTIONS.map((o) => [o.value, o.label]),
) as Record<OrgType, string>;

export const FOCUS_LABELS: Record<FocusArea, string> = Object.fromEntries(
  FOCUS_OPTIONS.map((o) => [o.value, o.label]),
) as Record<FocusArea, string>;

export const BUDGET_LABELS: Record<BudgetRange, string> = Object.fromEntries(
  BUDGET_OPTIONS.map((o) => [o.value, o.label]),
) as Record<BudgetRange, string>;
