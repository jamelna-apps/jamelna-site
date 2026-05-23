import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type {
  ClassroomProject,
  CuratedFunder,
  FoundationLead,
  OrgProfile,
  RankedGrant,
} from '../types';
import { GRANT_DISCLAIMER } from './markdown';

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 11,
    lineHeight: 1.45,
    color: '#1a1a1a',
    fontFamily: 'Helvetica',
  },
  h1: { fontSize: 22, marginBottom: 4, color: '#0b0b0b' },
  subtle: { fontSize: 10, color: '#555', marginBottom: 16 },
  h2: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 8,
    color: '#0b0b0b',
    borderBottom: '1px solid #e5e5e5',
    paddingBottom: 4,
  },
  h3: { fontSize: 12, marginBottom: 4, color: '#0b0b0b' },
  row: { flexDirection: 'row', marginBottom: 2 },
  label: { width: 96, color: '#666' },
  value: { flex: 1 },
  grantCard: {
    marginBottom: 14,
    padding: 10,
    border: '1px solid #e5e5e5',
    borderRadius: 4,
  },
  fitBadge: {
    fontSize: 10,
    color: '#0b4d26',
    backgroundColor: '#e8f5ee',
    padding: 3,
    borderRadius: 2,
    marginLeft: 4,
  },
  rationale: { marginTop: 6, fontStyle: 'italic', color: '#444' },
  redFlag: { color: '#8a1b1b' },
  link: { color: '#0f4c81', textDecoration: 'underline' },
  disclaimer: {
    marginTop: 24,
    padding: 10,
    backgroundColor: '#fafafa',
    borderRadius: 4,
    fontSize: 9,
    color: '#555',
  },
});

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

export interface GrantFindingsPdfProps {
  profile: OrgProfile;
  results: RankedGrant[];
  curatedFunders?: CuratedFunder[];
  foundationLeads?: FoundationLead[];
  classroomProjects?: ClassroomProject[];
}

export function GrantFindingsPDF({
  profile,
  results,
  curatedFunders,
  foundationLeads,
  classroomProjects,
}: GrantFindingsPdfProps) {
  const generated = new Date().toISOString().slice(0, 10);
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.h1}>Jamelna Grant Findings</Text>
        <Text style={styles.subtle}>Generated {generated} · jamelna.com/resources/grants</Text>

        <Text style={styles.h2}>Organization profile</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Type</Text>
          <Text style={styles.value}>{ORG_TYPE_LABELS[profile.orgType] ?? profile.orgType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Focus areas</Text>
          <Text style={styles.value}>
            {profile.focusAreas.map((f) => FOCUS_LABELS[f] ?? f).join(', ')}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>State</Text>
          <Text style={styles.value}>{profile.stateCode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Budget range</Text>
          <Text style={styles.value}>{BUDGET_LABELS[profile.budgetRange] ?? profile.budgetRange}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Project</Text>
          <Text style={styles.value}>{profile.projectSummary}</Text>
        </View>

        <Text style={styles.h2}>Ranked opportunities</Text>
        {results.length === 0 && <Text>No opportunities found.</Text>}
        {results.map((grant, idx) => (
          <View key={grant.opportunityId} style={styles.grantCard} wrap={false}>
            <Text style={styles.h3}>
              {idx + 1}. {grant.title}{' '}
              <Text style={styles.fitBadge}>AI match {grant.fitScore}/100</Text>
            </Text>
            <View style={styles.row}>
              <Text style={styles.label}>Agency</Text>
              <Text style={styles.value}>{grant.agency}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Deadline</Text>
              <Text style={styles.value}>{grant.closeDate ?? grant.keyDeadline}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Award range</Text>
              <Text style={styles.value}>
                {formatCurrency(grant.awardFloor)} – {formatCurrency(grant.awardCeiling)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Link</Text>
              <Text style={[styles.value, styles.link]}>{grant.url}</Text>
            </View>
            {grant.fitRationale ? (
              <Text style={styles.rationale}>{grant.fitRationale}</Text>
            ) : null}
            {grant.eligibilityNotes ? (
              <Text style={{ marginTop: 4 }}>Eligibility: {grant.eligibilityNotes}</Text>
            ) : null}
            {grant.redFlags.length > 0 ? (
              <Text style={[styles.redFlag, { marginTop: 4 }]}>
                Red flags: {grant.redFlags.join('; ')}
              </Text>
            ) : null}
          </View>
        ))}

        {curatedFunders && curatedFunders.length > 0 && (
          <>
            <Text style={styles.h2}>Major foundations likely to fund this work</Text>
            {curatedFunders.map((f) => (
              <View key={f.id} style={{ marginBottom: 8 }} wrap={false}>
                <Text style={styles.h3}>{f.name}</Text>
                <Text style={{ fontSize: 10, color: '#555' }}>
                  {f.states === 'all' ? 'Nationwide' : f.states.join(', ')}
                  {f.giving ? ` · ${f.giving}` : ''}
                </Text>
                <Text style={{ marginTop: 2 }}>{f.description}</Text>
                <Text style={styles.link}>{f.url}</Text>
              </View>
            ))}
          </>
        )}

        {foundationLeads && foundationLeads.length > 0 && (
          <>
            <Text style={styles.h2}>Additional foundations from IRS filings</Text>
            {foundationLeads.map((f) => (
              <Text key={f.ein}>
                {f.name} ({f.state}){f.ntee ? ` — NTEE ${f.ntee}` : ''} — {f.url}
              </Text>
            ))}
          </>
        )}

        {classroomProjects && classroomProjects.length > 0 && (
          <>
            <Text style={styles.h2}>Classroom projects (DonorsChoose)</Text>
            {classroomProjects.map((p) => (
              <Text key={p.id}>
                {p.title} — {p.subject} — {formatCurrency(p.costToComplete)} — {p.url}
              </Text>
            ))}
          </>
        )}

        <View style={styles.disclaimer}>
          <Text>{GRANT_DISCLAIMER}</Text>
        </View>
      </Page>
    </Document>
  );
}
