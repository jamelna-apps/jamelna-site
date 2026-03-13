'use client';

import React, { useState } from 'react';
import { samplePlans, SamplePlan } from '@/data/samplePlans';
import { CURRICULUM_URLS, FUNDING_URLS } from '@/lib/ai/prompts';

// Helper function to find curriculum URL with fuzzy matching
function getCurriculumUrl(curriculumName: string): string | null {
  // Direct match first
  if (CURRICULUM_URLS[curriculumName]) {
    return CURRICULUM_URLS[curriculumName];
  }

  // Try partial matching
  const lowerName = curriculumName.toLowerCase();
  for (const [key, url] of Object.entries(CURRICULUM_URLS)) {
    const lowerKey = key.toLowerCase();
    if (lowerName.includes(lowerKey) || lowerKey.includes(lowerName)) {
      return url;
    }
  }

  // Handle common variations
  const variations: Record<string, string> = {
    'cs fundamentals': CURRICULUM_URLS['Code.org'],
    'code.org cs fundamentals': CURRICULUM_URLS['Code.org'],
    'code.org cs discoveries': CURRICULUM_URLS['Code.org'],
    'cs discoveries': CURRICULUM_URLS['Code.org'],
    'ap cs principles': CURRICULUM_URLS['AP Computer Science Principles'],
    'ap cs a': CURRICULUM_URLS['AP Computer Science A'],
    'app inventor': CURRICULUM_URLS['MIT App Inventor'],
    'microbit': CURRICULUM_URLS['micro:bit'],
    'micro:bit': CURRICULUM_URLS['micro:bit'],
  };

  if (variations[lowerName]) {
    return variations[lowerName];
  }

  return null;
}

// Helper function to find funding URLs in recommendation text
function parseFundingRecommendation(text: string): { beforeLink: string; linkText: string; url: string; afterLink: string } | null {
  // Check each funding source
  for (const [name, url] of Object.entries(FUNDING_URLS)) {
    const lowerText = text.toLowerCase();
    const lowerName = name.toLowerCase();

    // Check if the funding source is mentioned
    if (lowerText.includes(lowerName)) {
      const index = lowerText.indexOf(lowerName);
      const actualName = text.slice(index, index + name.length);
      return {
        beforeLink: text.slice(0, index),
        linkText: actualName,
        url,
        afterLink: text.slice(index + name.length),
      };
    }
  }

  // Check for common variations and additional funding mentions
  const variations: { search: string; url: string }[] = [
    // Federal grants
    { search: 'nsf csforall', url: FUNDING_URLS['NSF'] },
    { search: 'nsf ', url: FUNDING_URLS['NSF'] },
    { search: 'esser', url: FUNDING_URLS['ESSER'] },
    { search: 'title iv', url: FUNDING_URLS['Title IV-A'] },
    { search: 'title i', url: FUNDING_URLS['Department of Education'] },
    { search: 'title ii', url: FUNDING_URLS['Department of Education'] },
    { search: 'perkins', url: FUNDING_URLS['Department of Education'] },
    { search: 'usda rural', url: 'https://www.rd.usda.gov/programs-services' },
    // Corporate/Foundation grants
    { search: 'google.org', url: FUNDING_URLS['Google.org'] },
    { search: 'amazon', url: FUNDING_URLS['Amazon Future Engineer'] },
    { search: 'code.org', url: FUNDING_URLS['Code.org funding'] },
    { search: 'csforall script', url: 'https://csforall.org/script' },
    { search: 'donorschoose', url: 'https://www.donorschoose.org/' },
    { search: 'black girls code', url: 'https://www.wearebgc.org/' },
    { search: 'micro:bit educational', url: 'https://microbit.org/get-started/give-away-micro-bit/' },
  ];

  const lowerText = text.toLowerCase();
  for (const { search, url } of variations) {
    if (lowerText.includes(search)) {
      const index = lowerText.indexOf(search);
      // Find the end of the funding source name (usually until punctuation or end)
      let endIndex = index + search.length;
      // Extend to include following words that are part of the name
      const remainingText = text.slice(endIndex);
      const match = remainingText.match(/^[A-Za-z\s-]+/);
      if (match) {
        endIndex += match[0].trimEnd().length;
      }

      return {
        beforeLink: text.slice(0, index),
        linkText: text.slice(index, endIndex),
        url,
        afterLink: text.slice(endIndex),
      };
    }
  }

  return null;
}

const TYPE_COLORS = {
  urban: 'bg-purple-900/30 text-purple-300',
  suburban: 'bg-primary/20 text-primary-light',
  rural: 'bg-highlight-green/20 text-highlight-green',
};

const RESOURCE_COLORS = {
  high: 'bg-highlight-green/20 text-highlight-green',
  moderate: 'bg-warm/20 text-warm-light',
  limited: 'bg-highlight-red/20 text-highlight-red',
};

const TYPE_ICONS = {
  urban: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  suburban: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  rural: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

interface PlanDetailSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function PlanDetailSection({ title, children, defaultOpen = false }: PlanDetailSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-deep-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-4 flex items-center justify-between text-left hover:bg-deep-alt transition-colors"
      >
        <span className="font-medium text-text-heading">{title}</span>
        <svg
          className={`w-5 h-5 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

interface PlanCardProps {
  plan: SamplePlan;
  isExpanded: boolean;
  onToggle: () => void;
}

function PlanCard({ plan, isExpanded, onToggle }: PlanCardProps) {
  const { profile } = plan;

  return (
    <div className="bg-deep-card rounded-xl shadow-md overflow-hidden border border-deep-border hover:border-warm/30 transition-colors">
      {/* Card Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 hover:bg-deep-alt transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-text-muted">{TYPE_ICONS[profile.type]}</span>
              <h3 className="text-lg font-semibold text-text-heading">
                {profile.schoolName}
              </h3>
            </div>
            <p className="text-sm text-text-secondary mb-3">
              {profile.location} | {profile.studentCount}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${TYPE_COLORS[profile.type]}`}>
                {profile.type.charAt(0).toUpperCase() + profile.type.slice(1)}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${RESOURCE_COLORS[profile.resources]}`}>
                {profile.resources === 'high' ? 'High Resources' : profile.resources === 'moderate' ? 'Moderate Resources' : 'Limited Resources'}
              </span>
              {profile.gradeLevels.map((level) => (
                <span key={level} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-deep-alt text-text-secondary">
                  {level}
                </span>
              ))}
            </div>
          </div>
          <svg
            className={`w-6 h-6 text-text-muted transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Highlights */}
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.highlights.map((highlight, idx) => (
            <span key={idx} className="inline-flex items-center text-xs text-text-muted">
              <svg className="w-3 h-3 mr-1 text-highlight-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {highlight}
            </span>
          ))}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-deep-border">
          {/* Executive Summary */}
          <div className="p-5 bg-deep-alt">
            <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">
              Executive Summary
            </h4>
            <p className="text-text-secondary">{plan.plan.executiveSummary}</p>
          </div>

          <div className="divide-y divide-deep-border">
            {/* Scope & Sequence */}
            <PlanDetailSection title="Scope & Sequence" defaultOpen>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-deep-alt">
                      <th className="px-3 py-2 text-left font-medium text-text-heading">Grade</th>
                      <th className="px-3 py-2 text-left font-medium text-text-heading">Focus</th>
                      <th className="px-3 py-2 text-left font-medium text-text-heading">Curricula</th>
                      <th className="px-3 py-2 text-left font-medium text-text-heading">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-deep-border">
                    {plan.plan.scopeSequence.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2 font-medium text-text-heading whitespace-nowrap">{item.gradeLevel}</td>
                        <td className="px-3 py-2 text-text-secondary">{item.focus}</td>
                        <td className="px-3 py-2 text-text-secondary">
                          <div className="flex flex-wrap gap-1">
                            {item.curricula.map((c, i) => {
                              const url = getCurriculumUrl(c);
                              return url ? (
                                <a
                                  key={i}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 text-primary-light rounded text-xs hover:bg-primary/30 transition-colors"
                                >
                                  {c}
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              ) : (
                                <span key={i} className="inline-block px-2 py-0.5 bg-primary/20 text-primary-light rounded text-xs">
                                  {c}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td className="px-3 py-2 text-text-secondary text-xs">{item.timeAllocation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PlanDetailSection>

            {/* Subject Integration */}
            <PlanDetailSection title="Subject Integration">
              <div className="space-y-4">
                {plan.plan.subjectIntegration.map((subject, idx) => (
                  <div key={idx} className="bg-deep-alt rounded-lg p-3">
                    <h5 className="font-medium text-text-heading mb-2">{subject.subject}</h5>
                    <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                      {subject.activities.map((activity, i) => (
                        <li key={i}>{activity}</li>
                      ))}
                    </ul>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {subject.standards.map((std, i) => (
                        <span key={i} className="text-xs text-text-muted font-mono">{std}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </PlanDetailSection>

            {/* Staff Guidance */}
            <PlanDetailSection title="Staff Guidance">
              <div className="space-y-4">
                {plan.plan.staffGuidance.map((staff, idx) => (
                  <div key={idx}>
                    <h5 className="font-medium text-text-heading mb-2">{staff.role}</h5>
                    <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                      {staff.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </PlanDetailSection>

            {/* Career Pathways */}
            <PlanDetailSection title="Career Pathways">
              <div className="space-y-4">
                {plan.plan.pathways.map((pathway, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-purple-900/20 to-primary/20 rounded-lg p-3">
                    <h5 className="font-medium text-text-heading mb-2">{pathway.name}</h5>
                    <div className="space-y-1">
                      {pathway.progression.map((step, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="w-5 h-5 rounded-full bg-purple-800 flex items-center justify-center flex-shrink-0 text-xs font-medium text-purple-200">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </PlanDetailSection>

            {/* Implementation Roadmap */}
            <PlanDetailSection title="Implementation Roadmap">
              <div className="space-y-4">
                {plan.plan.implementation.map((phase, idx) => (
                  <div key={idx} className="border-l-4 border-warm pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-medium text-text-heading">{phase.phase}</h5>
                      <span className="text-xs bg-deep-alt text-text-secondary px-2 py-0.5 rounded">
                        {phase.timeline}
                      </span>
                    </div>
                    <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                      {phase.actions.map((action, i) => (
                        <li key={i}>{action}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </PlanDetailSection>

            {/* Funding Recommendations */}
            <PlanDetailSection title="Funding Recommendations">
              <ul className="space-y-2">
                {plan.plan.fundingRecommendations.map((rec, idx) => {
                  const parsed = parseFundingRecommendation(rec);
                  return (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                      <svg className="w-5 h-5 text-highlight-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {parsed ? (
                        <span>
                          {parsed.beforeLink}
                          <a
                            href={parsed.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-light hover:underline inline-flex items-center gap-1"
                          >
                            {parsed.linkText}
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                          {parsed.afterLink}
                        </span>
                      ) : (
                        rec
                      )}
                    </li>
                  );
                })}
              </ul>
            </PlanDetailSection>

            {/* Success Metrics */}
            <PlanDetailSection title="Success Metrics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {plan.plan.successMetrics.map((metric, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-highlight-green/10 rounded-lg p-3">
                    <svg className="w-5 h-5 text-highlight-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-text-secondary">{metric}</span>
                  </div>
                ))}
              </div>
            </PlanDetailSection>
          </div>
        </div>
      )}
    </div>
  );
}

type FilterType = 'all' | 'urban' | 'suburban' | 'rural';
type ResourceFilter = 'all' | 'high' | 'moderate' | 'limited';

export default function SamplePlans() {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [resourceFilter, setResourceFilter] = useState<ResourceFilter>('all');

  const filteredPlans = samplePlans.filter((plan) => {
    if (typeFilter !== 'all' && plan.profile.type !== typeFilter) return false;
    if (resourceFilter !== 'all' && plan.profile.resources !== resourceFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-heading mb-2">
          Sample Plans for Different School Contexts
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Browse example plans generated for various school types and resource levels.
          These samples demonstrate the comprehensive guidance our AI planner provides.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">School Type:</span>
          <div className="flex rounded-lg overflow-hidden border border-deep-border">
            {(['all', 'urban', 'suburban', 'rural'] as FilterType[]).map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  typeFilter === type
                    ? 'bg-warm text-white'
                    : 'bg-deep-card text-text-secondary hover:bg-deep-alt'
                }`}
              >
                {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">Resources:</span>
          <div className="flex rounded-lg overflow-hidden border border-deep-border">
            {(['all', 'high', 'moderate', 'limited'] as ResourceFilter[]).map((level) => (
              <button
                key={level}
                onClick={() => setResourceFilter(level)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  resourceFilter === level
                    ? 'bg-warm text-white'
                    : 'bg-deep-card text-text-secondary hover:bg-deep-alt'
                }`}
              >
                {level === 'all' ? 'All' : level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="space-y-4">
        {filteredPlans.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No plans match the selected filters.
          </div>
        ) : (
          filteredPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isExpanded={expandedPlan === plan.id}
              onToggle={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
            />
          ))
        )}
      </div>

      {/* CTA */}
      <div className="text-center py-8 bg-gradient-to-r from-deep-card to-primary/20 rounded-xl border border-deep-border">
        <h3 className="text-xl font-semibold text-text-heading mb-2">
          Ready to create your custom plan?
        </h3>
        <p className="text-text-secondary mb-4">
          Complete our questionnaire and get a personalized CS education plan for your school.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn-warm px-6 py-3 font-medium rounded-lg inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Start Building Your Plan
        </button>
      </div>
    </div>
  );
}
