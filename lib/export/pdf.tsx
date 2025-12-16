/**
 * PDF generator for K-12 CS Education scope & sequence plans
 * Uses @react-pdf/renderer for server-side PDF generation
 */

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer';
import {
  Plan,
  ScopeSequenceEntry,
  CurriculumRecommendation,
  ImplementationPhase,
  CSTA_CONCEPTS,
  CSTA_PRACTICES,
} from './templates';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333333',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingBottom: 5,
  },
  subsectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#444444',
  },
  paragraph: {
    marginBottom: 10,
    textAlign: 'justify',
  },
  listItem: {
    marginBottom: 4,
    marginLeft: 15,
  },
  bullet: {
    width: 10,
  },
  table: {
    display: 'flex',
    width: '100%',
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 2,
    borderBottomColor: '#999999',
  },
  tableCell: {
    flex: 1,
    padding: 6,
    fontSize: 9,
  },
  tableCellHeader: {
    flex: 1,
    padding: 6,
    fontSize: 9,
    fontWeight: 'bold',
  },
  curriculumCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderRadius: 4,
  },
  curriculumName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  curriculumDetail: {
    fontSize: 10,
    marginBottom: 3,
    color: '#555555',
  },
  phaseContainer: {
    marginBottom: 12,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#4A90A4',
  },
  phaseTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  checklistItem: {
    flexDirection: 'row',
    marginBottom: 3,
    marginLeft: 10,
  },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#999999',
    marginRight: 8,
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#888888',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    paddingTop: 10,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 9,
    color: '#888888',
  },
});

// PDF Document Component
const PlanDocument: React.FC<{ plan: Plan }> = ({ plan }) => (
  <Document>
    {/* Page 1: Title and Executive Summary */}
    <Page size="LETTER" style={styles.page}>
      <Text style={styles.title}>{plan.title}</Text>
      {plan.createdAt && (
        <Text style={styles.subtitle}>
          Generated: {new Date(plan.createdAt).toLocaleDateString()}
        </Text>
      )}

      {plan.executiveSummary && (
        <View>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={styles.paragraph}>{plan.executiveSummary}</Text>
        </View>
      )}

      {/* Scope & Sequence Table */}
      {plan.scopeSequence && plan.scopeSequence.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Scope & Sequence by Grade Level</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCellHeader}>Grade</Text>
              <Text style={[styles.tableCellHeader, { flex: 2 }]}>Competencies</Text>
              <Text style={styles.tableCellHeader}>Time</Text>
              <Text style={[styles.tableCellHeader, { flex: 1.5 }]}>Curricula</Text>
            </View>
            {plan.scopeSequence.map((entry, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{entry.gradeLevel}</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {entry.competencies?.slice(0, 2).join(', ') || '-'}
                </Text>
                <Text style={styles.tableCell}>{entry.instructionTime || '-'}</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  {entry.curricula?.slice(0, 1).join(', ') || '-'}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <Text style={styles.footer}>
        Jamelna K-12 CS Education Planner | jamelna.com
      </Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>

    {/* Page 2: Curriculum Recommendations */}
    {plan.curriculumRecommendations && plan.curriculumRecommendations.length > 0 && (
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.sectionTitle}>Curriculum Recommendations</Text>
        {plan.curriculumRecommendations.map((rec, index) => (
          <View key={index} style={styles.curriculumCard}>
            <Text style={styles.curriculumName}>{rec.name}</Text>
            <Text style={styles.curriculumDetail}>Provider: {rec.provider}</Text>
            <Text style={styles.curriculumDetail}>
              Grade Levels: {rec.gradeLevels?.join(', ') || 'All'}
            </Text>
            {rec.features && rec.features.length > 0 && (
              <Text style={styles.curriculumDetail}>
                Features: {rec.features.slice(0, 3).join(', ')}
              </Text>
            )}
            {rec.rationale && (
              <Text style={[styles.curriculumDetail, { marginTop: 5 }]}>
                {rec.rationale}
              </Text>
            )}
          </View>
        ))}
        <Text style={styles.footer}>
          Jamelna K-12 CS Education Planner | jamelna.com
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    )}

    {/* Page 3: Implementation Roadmap */}
    {plan.implementationRoadmap && plan.implementationRoadmap.length > 0 && (
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.sectionTitle}>Implementation Roadmap</Text>
        {plan.implementationRoadmap.map((phase, index) => (
          <View key={index} style={styles.phaseContainer}>
            <Text style={styles.phaseTitle}>
              {phase.phase}: {phase.title}
            </Text>
            {phase.priorities?.map((priority, pIndex) => (
              <View key={pIndex} style={styles.checklistItem}>
                <View style={styles.checkbox} />
                <Text style={{ fontSize: 10, flex: 1 }}>{priority}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Professional Development */}
        {plan.professionalDevelopment && (
          <View>
            <Text style={styles.sectionTitle}>Professional Development</Text>
            {plan.professionalDevelopment.essential &&
              plan.professionalDevelopment.essential.length > 0 && (
                <View>
                  <Text style={styles.subsectionTitle}>Essential Training</Text>
                  {plan.professionalDevelopment.essential.map((item, index) => (
                    <Text key={index} style={styles.listItem}>
                      • {item}
                    </Text>
                  ))}
                </View>
              )}
            {plan.professionalDevelopment.certifications &&
              plan.professionalDevelopment.certifications.length > 0 && (
                <View>
                  <Text style={styles.subsectionTitle}>Certifications</Text>
                  {plan.professionalDevelopment.certifications.map((item, index) => (
                    <Text key={index} style={styles.listItem}>
                      • {item}
                    </Text>
                  ))}
                </View>
              )}
          </View>
        )}

        <Text style={styles.footer}>
          Jamelna K-12 CS Education Planner | jamelna.com
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    )}

    {/* Page 4: Standards Reference */}
    <Page size="LETTER" style={styles.page}>
      <Text style={styles.sectionTitle}>CSTA K-12 Standards Reference</Text>

      <Text style={styles.subsectionTitle}>Core Concepts</Text>
      {CSTA_CONCEPTS.map((concept, index) => (
        <Text key={index} style={styles.listItem}>
          • {concept}
        </Text>
      ))}

      <Text style={styles.subsectionTitle}>Core Practices</Text>
      {CSTA_PRACTICES.map((practice, index) => (
        <Text key={index} style={styles.listItem}>
          • {practice}
        </Text>
      ))}

      <Text style={styles.subsectionTitle}>Grade Band Standard Prefixes</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCellHeader}>Grade Band</Text>
          <Text style={styles.tableCellHeader}>CSTA Prefix</Text>
          <Text style={[styles.tableCellHeader, { flex: 2 }]}>Example Standards</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>K-2</Text>
          <Text style={styles.tableCell}>1A</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>1A-CS-01, 1A-AP-10</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>3-5</Text>
          <Text style={styles.tableCell}>1B</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>1B-CS-02, 1B-AP-08</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>6-8</Text>
          <Text style={styles.tableCell}>2</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>2-CS-01, 2-AP-13</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>9-12</Text>
          <Text style={styles.tableCell}>3A/3B</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>3A-CS-01, 3B-AP-10</Text>
        </View>
      </View>

      {/* Success Metrics */}
      {plan.successMetrics && (
        <View>
          <Text style={styles.sectionTitle}>Success Metrics</Text>
          {plan.successMetrics.measurements &&
            plan.successMetrics.measurements.length > 0 && (
              <View>
                <Text style={styles.subsectionTitle}>Key Measurements</Text>
                {plan.successMetrics.measurements.map((item, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {item}
                  </Text>
                ))}
              </View>
            )}
          {plan.successMetrics.milestones &&
            plan.successMetrics.milestones.length > 0 && (
              <View>
                <Text style={styles.subsectionTitle}>Milestones</Text>
                {plan.successMetrics.milestones.map((item, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {item}
                  </Text>
                ))}
              </View>
            )}
        </View>
      )}

      <Text style={styles.footer}>
        Jamelna K-12 CS Education Planner | jamelna.com
      </Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

/**
 * Generates a PDF buffer from a plan
 */
export async function generatePDF(plan: Plan): Promise<Buffer> {
  const buffer = await renderToBuffer(<PlanDocument plan={plan} />);
  return buffer as Buffer;
}

export default generatePDF;
