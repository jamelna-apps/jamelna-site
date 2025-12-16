'use client';

import { useState } from 'react';

interface DistrictProfile {
  id?: string;
  schoolName: string;
  state: string;
  gradeLevels: string[];
  currentOfferings?: string;
  pathways?: string[];
  resources?: string;
}

interface Plan {
  id: string;
  title: string;
  version?: number;
  executiveSummary?: string;
  rawContent?: string;
  scopeSequence?: Array<{
    gradeLevel: string;
    competencies: string[];
    instructionTime: string;
    curricula: string[];
    standards: string[];
  }>;
  curriculumRecommendations?: Array<{
    name: string;
    provider: string;
    gradeLevels: string[];
    features: string[];
    resources: string;
    rationale: string;
  }>;
  implementationRoadmap?: Array<{
    phase: string;
    title: string;
    priorities: string[];
  }>;
  professionalDevelopment?: {
    essential?: string[];
    certifications?: string[];
    support?: string[];
  };
  successMetrics?: {
    measurements?: string[];
    milestones?: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

interface PlanExporterProps {
  plan: Plan;
  districtProfile?: DistrictProfile;
  onExport: (format: 'pdf' | 'markdown') => void;
  labels?: {
    title?: string;
    description?: string;
    exportPdf?: string;
    exportMarkdown?: string;
    pdfDescription?: string;
    markdownDescription?: string;
    preview?: string;
    planOverview?: string;
    generatedOn?: string;
    version?: string;
    gradeBands?: string;
    curricula?: string;
    phases?: string;
    downloading?: string;
  };
}

export function PlanExporter({
  plan,
  districtProfile,
  onExport,
  labels = {},
}: PlanExporterProps) {
  const [isExporting, setIsExporting] = useState<'pdf' | 'markdown' | null>(null);

  const defaultLabels = {
    title: 'Export Your Plan',
    description: 'Download your K-12 CS Education plan in your preferred format.',
    exportPdf: 'Export as PDF',
    exportMarkdown: 'Export as Markdown',
    pdfDescription: 'Best for sharing, printing, and presentations. Professionally formatted document.',
    markdownDescription: 'Best for editing and integration with documentation tools like Notion, Confluence, or GitHub.',
    preview: 'Plan Preview',
    planOverview: 'Plan Overview',
    generatedOn: 'Generated on',
    version: 'Version',
    gradeBands: 'Grade Bands',
    curricula: 'Curricula',
    phases: 'Implementation Phases',
    downloading: 'Downloading...',
    ...labels,
  };

  const handleExport = async (format: 'pdf' | 'markdown') => {
    setIsExporting(format);
    try {
      await onExport(format);
    } finally {
      setIsExporting(null);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {defaultLabels.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {defaultLabels.description}
        </p>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* PDF Export */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                PDF Document
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {defaultLabels.pdfDescription}
              </p>
              <button
                onClick={() => handleExport('pdf')}
                disabled={isExporting !== null}
                className={`w-full px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  isExporting === 'pdf'
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-wait'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isExporting === 'pdf' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {defaultLabels.downloading}
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {defaultLabels.exportPdf}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Markdown Export */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Markdown File
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {defaultLabels.markdownDescription}
              </p>
              <button
                onClick={() => handleExport('markdown')}
                disabled={isExporting !== null}
                className={`w-full px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  isExporting === 'markdown'
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-wait'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {isExporting === 'markdown' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {defaultLabels.downloading}
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {defaultLabels.exportMarkdown}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Preview Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {defaultLabels.planOverview}
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {/* Plan Title & Metadata */}
          <div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {plan.title}
            </h4>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              {plan.createdAt && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {defaultLabels.generatedOn} {formatDate(plan.createdAt)}
                </span>
              )}
              {plan.version && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {defaultLabels.version} {plan.version}
                </span>
              )}
            </div>
          </div>

          {/* District Info */}
          {districtProfile && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p className="font-medium text-blue-900 dark:text-blue-100">
                {districtProfile.schoolName}
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {districtProfile.state}
              </p>
            </div>
          )}

          {/* Executive Summary */}
          {plan.executiveSummary && (
            <div>
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Executive Summary
              </h5>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {plan.executiveSummary}
              </p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {plan.scopeSequence?.length || 0}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {defaultLabels.gradeBands}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {plan.curriculumRecommendations?.length || 0}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {defaultLabels.curricula}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {plan.implementationRoadmap?.length || 0}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {defaultLabels.phases}
              </div>
            </div>
          </div>

          {/* Scope & Sequence Preview */}
          {plan.scopeSequence && plan.scopeSequence.length > 0 && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                Grade Bands Included
              </h5>
              <div className="flex flex-wrap gap-2">
                {plan.scopeSequence.map((entry, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {entry.gradeLevel}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Curricula Preview */}
          {plan.curriculumRecommendations && plan.curriculumRecommendations.length > 0 && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                Recommended Curricula
              </h5>
              <div className="space-y-2">
                {plan.curriculumRecommendations.slice(0, 4).map((curr, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-gray-900 dark:text-white font-medium">
                      {curr.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {curr.provider}
                    </span>
                  </div>
                ))}
                {plan.curriculumRecommendations.length > 4 && (
                  <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                    +{plan.curriculumRecommendations.length - 4} more curricula
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
