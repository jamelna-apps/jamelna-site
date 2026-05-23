import type {
  ClassroomProject,
  CuratedFunder,
  FoundationLead,
  OrgProfile,
  RankedGrant,
} from '../types';

export const GRANT_DISCLAIMER = `Grant information is sourced from public APIs (Grants.gov, ProPublica Nonprofit Explorer, DonorsChoose.org) and may be out of date. Always verify eligibility, deadlines, and requirements directly with the awarding agency before applying. Jamelna is not affiliated with these agencies and does not guarantee award outcomes. AI-generated fit scores are suggestions only.`;

const ORG_TYPE_LABELS: Record<string, string> = {
  school_district: 'School district',
  individual_school: 'Individual school',
  nonprofit_501c3: '501(c)(3) non-profit',
  nonprofit_other: 'Non-profit (non-501(c)(3))',
  individual_teacher: 'Individual teacher',
};

const FOCUS_LABELS: Record<string, string> = {
  stem: 'STEM',
  cs: 'Computer science',
  ai_emerging: 'AI / emerging tech',
  cte: 'Career & technical education',
  cyber: 'Cybersecurity',
  arts: 'Arts / Humanities',
  literacy: 'Literacy',
  health: 'Health / Wellness',
  workforce: 'Workforce development',
  early_childhood: 'Early childhood',
  special_ed: 'Special education',
  civics: 'Civics / democracy',
  environment: 'Environmental / sustainability',
  media: 'Media / journalism literacy',
  general: 'General education',
};

const BUDGET_LABELS: Record<string, string> = {
  lt_10k: 'Under $10K',
  '10k_50k': '$10K – $50K',
  '50k_250k': '$50K – $250K',
  '250k_1m': '$250K – $1M',
  gt_1m: 'Over $1M',
};

function formatCurrency(value: number | null): string {
  if (value === null || value === undefined) return '—';
  return `$${value.toLocaleString('en-US')}`;
}

function formatDate(value: string | null): string {
  if (!value) return 'No deadline listed';
  return value;
}

export function todayFilenameStamp(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

export interface MarkdownExportInput {
  profile: OrgProfile;
  results: RankedGrant[];
  curatedFunders?: CuratedFunder[];
  foundationLeads?: FoundationLead[];
  classroomProjects?: ClassroomProject[];
}

export function toMarkdown(input: MarkdownExportInput): string {
  const { profile, results, curatedFunders, foundationLeads, classroomProjects } = input;
  const lines: string[] = [];
  lines.push('# Jamelna Grant Findings');
  lines.push('');
  lines.push(`Generated ${new Date().toISOString().slice(0, 10)}.`);
  lines.push('');
  lines.push('## Organization profile');
  lines.push(`- Organization type: ${ORG_TYPE_LABELS[profile.orgType] ?? profile.orgType}`);
  lines.push(
    `- Focus areas: ${profile.focusAreas.map((f) => FOCUS_LABELS[f] ?? f).join(', ')}`,
  );
  lines.push(`- State: ${profile.stateCode}`);
  lines.push(`- Budget range: ${BUDGET_LABELS[profile.budgetRange] ?? profile.budgetRange}`);
  lines.push(`- Project summary: ${profile.projectSummary}`);
  lines.push('');
  lines.push('## Disclaimer');
  lines.push('');
  lines.push(`> ${GRANT_DISCLAIMER}`);
  lines.push('');

  lines.push('## Ranked opportunities');
  lines.push('');
  if (results.length === 0) {
    lines.push('_No opportunities found._');
    lines.push('');
  } else {
    results.forEach((grant, idx) => {
      lines.push(`### ${idx + 1}. ${grant.title}`);
      lines.push('');
      lines.push(`- **Agency:** ${grant.agency}`);
      lines.push(`- **AI-estimated match:** ${grant.fitScore} / 100`);
      lines.push(`- **Deadline:** ${formatDate(grant.closeDate ?? grant.keyDeadline)}`);
      lines.push(`- **Award range:** ${formatCurrency(grant.awardFloor)} – ${formatCurrency(grant.awardCeiling)}`);
      lines.push(`- **Source:** ${grant.source.replace('_', '.')}`);
      lines.push(`- **Link:** ${grant.url}`);
      if (grant.fitRationale) {
        lines.push('');
        lines.push(`> ${grant.fitRationale}`);
      }
      if (grant.eligibilityNotes) {
        lines.push('');
        lines.push(`**Eligibility notes:** ${grant.eligibilityNotes}`);
      }
      if (grant.redFlags.length > 0) {
        lines.push('');
        lines.push('**Red flags:**');
        for (const f of grant.redFlags) lines.push(`- ${f}`);
      }
      lines.push('');
    });
  }

  if (curatedFunders && curatedFunders.length > 0) {
    lines.push('## Major foundations likely to fund this work');
    lines.push('');
    lines.push('_Curated US foundations whose published priorities overlap with your profile. Visit each page to confirm current priorities and application process._');
    lines.push('');
    curatedFunders.forEach((f) => {
      const scope = f.states === 'all' ? 'Nationwide' : f.states.join(', ');
      lines.push(`### [${f.name}](${f.url})`);
      lines.push(`${scope}${f.giving ? ` · ${f.giving}` : ''}`);
      lines.push('');
      lines.push(f.description);
      lines.push('');
    });
  }

  if (foundationLeads && foundationLeads.length > 0) {
    lines.push('## Additional foundations from IRS filings');
    lines.push('');
    lines.push('_Private foundations active in your state and focus area, surfaced from ProPublica Nonprofit Explorer (IRS 990 data). These are leads, not open grants._');
    lines.push('');
    foundationLeads.forEach((f) => {
      lines.push(`- [${f.name}](${f.url}) — ${f.state}${f.ntee ? ` · NTEE ${f.ntee}` : ''}`);
    });
    lines.push('');
  }

  if (classroomProjects && classroomProjects.length > 0) {
    lines.push('## Classroom crowdfunding (DonorsChoose)');
    lines.push('');
    classroomProjects.forEach((p) => {
      lines.push(`- [${p.title}](${p.url}) — ${p.subject}, ${formatCurrency(p.costToComplete)}`);
    });
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push(`Generated by jamelna.com/resources/grants. ${GRANT_DISCLAIMER}`);
  return lines.join('\n');
}
