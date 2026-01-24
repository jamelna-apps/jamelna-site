'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { k12Pathways, gradeBandLabels, type GradeBand, type PathwayIcon, type K12Pathway } from '@/data/k12-pathways';
import { curricula, type Curriculum } from '@/data/curricula';

interface ScopeSequenceBuilderProps {
  className?: string;
}

// SVG icons as components
const PathwayIcons: Record<PathwayIcon, React.FC<{ className?: string }>> = {
  brain: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  shield: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  bot: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  chart: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  globe: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
};

const ExternalLinkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const ScopeSequenceBuilder: React.FC<ScopeSequenceBuilderProps> = ({ className = '' }) => {
  const t = useTranslations('k12CSEducation');
  const [selectedPathway, setSelectedPathway] = useState<string>('ai');

  const currentPathway = useMemo(() => {
    return k12Pathways.find(p => p.id === selectedPathway) || k12Pathways[0];
  }, [selectedPathway]);

  // Get curriculum details by ID
  const getCurriculum = (id: string): Curriculum | undefined => {
    return curricula.find(c => c.id === id);
  };

  // Color classes for each pathway
  const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string; activeBg: string }> = {
    violet: { bg: 'bg-violet-500/20', border: 'border-violet-500/50', text: 'text-violet-400', badge: 'bg-violet-500/20 text-violet-300', activeBg: 'bg-violet-500/10' },
    emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/50', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300', activeBg: 'bg-emerald-500/10' },
    orange: { bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-300', activeBg: 'bg-orange-500/10' },
    blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300', activeBg: 'bg-blue-500/10' },
    cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300', activeBg: 'bg-cyan-500/10' },
  };

  const getColors = (color: string) => colorClasses[color] || colorClasses.orange;

  const getIcon = (icon: PathwayIcon) => PathwayIcons[icon];

  const renderCurriculumList = (curriculumIds: string[], isPathway: boolean = false) => {
    const validCurricula = curriculumIds.map(getCurriculum).filter((c): c is Curriculum => c !== undefined);

    if (validCurricula.length === 0) return null;

    return (
      <div className="space-y-2">
        {validCurricula.map((curriculum) => (
          <a
            key={curriculum.id}
            href={curriculum.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-3 rounded-lg transition-all group ${
              isPathway
                ? `${getColors(currentPathway.color).activeBg} hover:${getColors(currentPathway.color).bg}`
                : 'bg-zinc-800/50 hover:bg-zinc-700/50'
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm truncate">{curriculum.name}</span>
                {curriculum.isFree && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Free</span>
                )}
              </div>
              <span className="text-xs text-zinc-500">{curriculum.organization}</span>
            </div>
            <ExternalLinkIcon className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors flex-shrink-0 ml-2" />
          </a>
        ))}
      </div>
    );
  };

  const renderGradeBand = (gradeBand: GradeBand) => {
    const gradeData = currentPathway.grades[gradeBand];
    const colors = getColors(currentPathway.color);

    return (
      <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700 hover:border-zinc-600 transition-colors">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${colors.bg}`} />
          {gradeBandLabels[gradeBand]}
        </h4>

        <div className="space-y-5">
          {/* Core Curricula */}
          <div>
            <h5 className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-zinc-600 rounded" />
              {t('scopeSequence.coreCurricula')}
            </h5>
            {renderCurriculumList(gradeData.core)}
          </div>

          {/* Pathway-Specific Curricula */}
          <div>
            <h5 className={`text-sm font-medium mb-2 flex items-center gap-2 ${colors.text}`}>
              <span className={`w-4 h-0.5 ${colors.bg} rounded`} />
              {t('scopeSequence.pathwayCurricula')}
            </h5>
            {renderCurriculumList(gradeData.pathway, true)}
          </div>

          {/* Key Skills */}
          <div>
            <h5 className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
              <LightbulbIcon className="w-4 h-4" />
              {t('scopeSequence.skills')}
            </h5>
            <div className="flex flex-wrap gap-2">
              {gradeData.skills.map((skill, idx) => (
                <span key={idx} className={`text-xs px-2 py-1 rounded ${colors.badge}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t('scopeSequence.title')}
        </h2>
        <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
          {t('scopeSequence.subtitle')}
        </p>
      </div>

      {/* Foundation Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/30 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <LightbulbIcon className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-amber-300 mb-2">
              {t('scopeSequence.foundation')}
            </h3>
            <p className="text-sm text-zinc-300">
              {t('scopeSequence.foundationDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Pathway Selector */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-zinc-400 mb-4">{t('scopeSequence.selectPathway')}</h3>
        <div className="flex flex-wrap gap-3">
          {k12Pathways.map((pathway) => {
            const colors = getColors(pathway.color);
            const isSelected = selectedPathway === pathway.id;
            const IconComponent = getIcon(pathway.icon);

            return (
              <button
                key={pathway.id}
                onClick={() => setSelectedPathway(pathway.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  isSelected
                    ? `${colors.bg} ${colors.border} border-2 ${colors.text}`
                    : 'bg-zinc-800 border-2 border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{pathway.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Pathway Description */}
      {(() => {
        const IconComponent = getIcon(currentPathway.icon);
        return (
          <div className={`${getColors(currentPathway.color).bg} rounded-xl p-4 mb-8 border ${getColors(currentPathway.color).border}`}>
            <div className="flex items-center gap-3">
              <IconComponent className={`w-6 h-6 ${getColors(currentPathway.color).text}`} />
              <div>
                <h3 className="font-semibold text-white">{currentPathway.name}</h3>
                <p className="text-sm text-zinc-300">{currentPathway.description}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Grade Band Columns */}
      <div className="grid md:grid-cols-3 gap-6">
        {(['elementary', 'middle', 'high'] as GradeBand[]).map((gradeBand) => (
          <div key={gradeBand}>
            {renderGradeBand(gradeBand)}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-zinc-700">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-zinc-700" />
            <span>{t('scopeSequence.coreCurricula')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded ${getColors(currentPathway.color).bg}`} />
            <span>{t('scopeSequence.pathwayCurricula')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs">Free</span>
            <span>Free resources</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScopeSequenceBuilder;
