'use client';

import { useState } from 'react';
import { ScopeSequenceTable } from './ScopeSequenceTable';
import ReactMarkdown from 'react-markdown';
import { CURRICULUM_URLS } from '@/lib/ai/prompts';

interface ScopeSequenceEntry {
  gradeLevel: string;
  competencies: string[];
  instructionTime: string;
  curricula: string[];
  standards: string[];
}

interface CurriculumRecommendation {
  name: string;
  provider: string;
  gradeLevels: string[];
  features: string[];
  resources: string;
  rationale: string;
  url?: string;
}

interface ImplementationPhase {
  phase: string;
  title: string;
  priorities: string[];
}

interface ProfessionalDevelopment {
  essential?: string[];
  certifications?: string[];
  support?: string[];
}

interface SuccessMetrics {
  measurements?: string[];
  milestones?: string[];
}

interface Plan {
  id: string;
  title: string;
  version?: number;
  executiveSummary?: string;
  rawContent?: string;
  scopeSequence?: ScopeSequenceEntry[];
  curriculumRecommendations?: CurriculumRecommendation[];
  implementationRoadmap?: ImplementationPhase[];
  professionalDevelopment?: ProfessionalDevelopment;
  successMetrics?: SuccessMetrics;
  createdAt?: string;
  updatedAt?: string;
}

interface PlanViewerProps {
  plan: Plan;
  showRawContent?: boolean;
  onEdit?: (plan: Plan) => void;
  onExport?: (format: 'pdf' | 'markdown') => void;
}

type TabId = 'overview' | 'scope' | 'curricula' | 'implementation' | 'raw';

export function PlanViewer({ plan, showRawContent = false, onEdit, onExport }: PlanViewerProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const tabs: { id: TabId; label: string; available: boolean }[] = [
    { id: 'overview', label: 'Overview', available: true },
    { id: 'scope', label: 'Scope & Sequence', available: (plan.scopeSequence?.length ?? 0) > 0 },
    { id: 'curricula', label: 'Curricula', available: (plan.curriculumRecommendations?.length ?? 0) > 0 },
    { id: 'implementation', label: 'Implementation', available: (plan.implementationRoadmap?.length ?? 0) > 0 },
    { id: 'raw', label: 'Full Plan', available: showRawContent && !!plan.rawContent },
  ];

  const availableTabs = tabs.filter(t => t.available);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {plan.title}
            </h2>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
              {plan.version && (
                <span>Version {plan.version}</span>
              )}
              {plan.createdAt && (
                <span>Created {new Date(plan.createdAt).toLocaleDateString()}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(plan)}
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Edit
              </button>
            )}
            {onExport && (
              <div className="relative group">
                <button className="px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </button>
                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <button
                    onClick={() => onExport('pdf')}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
                  >
                    Export as PDF
                  </button>
                  <button
                    onClick={() => onExport('markdown')}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
                  >
                    Export as Markdown
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px overflow-x-auto">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Executive Summary */}
            {plan.executiveSummary && (
              <section>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Executive Summary
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {plan.executiveSummary}
                </p>
              </section>
            )}

            {/* Quick Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {plan.scopeSequence?.length || 0}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Grade Bands</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {plan.curriculumRecommendations?.length || 0}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Curricula</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {plan.implementationRoadmap?.length || 0}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Phases</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {plan.professionalDevelopment?.essential?.length || 0}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">PD Items</div>
              </div>
            </section>

            {/* Professional Development Preview */}
            {plan.professionalDevelopment && (
              <section>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Professional Development
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {plan.professionalDevelopment.essential && plan.professionalDevelopment.essential.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Essential Training</h4>
                      <ul className="space-y-1">
                        {plan.professionalDevelopment.essential.slice(0, 3).map((item, i) => (
                          <li key={i} className="text-sm text-blue-700 dark:text-blue-400 flex items-start gap-2">
                            <span>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {plan.professionalDevelopment.certifications && plan.professionalDevelopment.certifications.length > 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Certifications</h4>
                      <ul className="space-y-1">
                        {plan.professionalDevelopment.certifications.slice(0, 3).map((item, i) => (
                          <li key={i} className="text-sm text-green-700 dark:text-green-400 flex items-start gap-2">
                            <span>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Success Metrics Preview */}
            {plan.successMetrics && (plan.successMetrics.measurements?.length || plan.successMetrics.milestones?.length) && (
              <section>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Success Metrics
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {plan.successMetrics.measurements && plan.successMetrics.measurements.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Measurements</h4>
                      <ul className="space-y-1">
                        {plan.successMetrics.measurements.map((item, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <span>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {plan.successMetrics.milestones && plan.successMetrics.milestones.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Milestones</h4>
                      <ul className="space-y-1">
                        {plan.successMetrics.milestones.map((item, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <span>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'scope' && plan.scopeSequence && (
          <ScopeSequenceTable entries={plan.scopeSequence} />
        )}

        {activeTab === 'curricula' && plan.curriculumRecommendations && (
          <div className="space-y-4">
            {plan.curriculumRecommendations.map((rec, index) => {
              // Try to get URL from the recommendation, or look it up by name
              const curriculumUrl = rec.url || CURRICULUM_URLS[rec.name] ||
                Object.entries(CURRICULUM_URLS).find(([key]) =>
                  rec.name.toLowerCase().includes(key.toLowerCase()) ||
                  key.toLowerCase().includes(rec.name.toLowerCase())
                )?.[1];

              return (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      {curriculumUrl ? (
                        <a
                          href={curriculumUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline inline-flex items-center gap-1"
                        >
                          {rec.name}
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {rec.name}
                        </h4>
                      )}
                      {rec.provider && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          by {rec.provider}
                        </p>
                      )}
                    </div>
                    {rec.gradeLevels && rec.gradeLevels.length > 0 && (
                      <div className="flex gap-1">
                        {rec.gradeLevels.map((level, i) => (
                          <span
                            key={i}
                            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded"
                          >
                            {level}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {rec.rationale && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {rec.rationale}
                    </p>
                  )}

                  {rec.features && rec.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {rec.features.map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Visit Website button if URL exists */}
                  {curriculumUrl && (
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                      <a
                        href={curriculumUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Visit curriculum website
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'implementation' && plan.implementationRoadmap && (
          <div className="space-y-4">
            {plan.implementationRoadmap.map((phase, index) => (
              <div
                key={index}
                className="relative pl-8 pb-8 last:pb-0"
              >
                {/* Timeline connector */}
                {index < plan.implementationRoadmap!.length - 1 && (
                  <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                )}

                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {phase.title || `Phase ${phase.phase}`}
                  </h4>
                  {phase.priorities && phase.priorities.length > 0 && (
                    <ul className="space-y-1">
                      {phase.priorities.map((priority, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">→</span>
                          <span>{priority}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'raw' && plan.rawContent && (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{plan.rawContent}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
