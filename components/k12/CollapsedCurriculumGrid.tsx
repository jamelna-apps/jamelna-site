'use client';

import React, { useState } from 'react';
import { Curriculum, GradeLevel, Topic } from '@/data/curricula';
import CurriculumCard from './CurriculumCard';

interface CollapsedCurriculumGridProps {
  curricula: Curriculum[];
  gradeLevelLabels: Record<GradeLevel, string>;
  topicLabels: Record<Topic, string>;
}

interface GradeGroup {
  key: GradeLevel;
  label: string;
  icon: React.ReactNode;
  curricula: Curriculum[];
  color: string;
}

const CollapsedCurriculumGrid: React.FC<CollapsedCurriculumGridProps> = ({
  curricula,
  gradeLevelLabels,
  topicLabels,
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<GradeLevel>>(new Set());

  const toggleGroup = (gradeLevel: GradeLevel) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(gradeLevel)) {
      newExpanded.delete(gradeLevel);
    } else {
      newExpanded.add(gradeLevel);
    }
    setExpandedGroups(newExpanded);
  };

  const gradeGroups: GradeGroup[] = [
    {
      key: 'elementary',
      label: gradeLevelLabels.elementary,
      color: 'orange',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      curricula: curricula.filter(c => c.grades.includes('elementary') && !c.grades.includes('middle') && !c.grades.includes('high')),
    },
    {
      key: 'middle',
      label: gradeLevelLabels.middle,
      color: 'blue',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      curricula: curricula.filter(c => c.grades.includes('middle') && !c.grades.includes('elementary') && !c.grades.includes('high')),
    },
    {
      key: 'high',
      label: gradeLevelLabels.high,
      color: 'violet',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      curricula: curricula.filter(c => c.grades.includes('high') && !c.grades.includes('elementary') && !c.grades.includes('middle')),
    },
    {
      key: 'all',
      label: gradeLevelLabels.all || 'Multi-Grade',
      color: 'emerald',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      curricula: curricula.filter(c =>
        c.grades.includes('all') ||
        (c.grades.includes('elementary') && c.grades.includes('middle')) ||
        (c.grades.includes('middle') && c.grades.includes('high')) ||
        (c.grades.includes('elementary') && c.grades.includes('high'))
      ),
    },
  ];

  const getColorClasses = (color: string, isExpanded: boolean) => {
    const colorMap: Record<string, { border: string; bg: string; text: string; hoverBorder: string }> = {
      orange: {
        border: isExpanded ? 'border-orange-500/60' : 'border-orange-500/30',
        bg: 'bg-orange-500/20',
        text: 'text-orange-400',
        hoverBorder: 'hover:border-orange-500/60',
      },
      blue: {
        border: isExpanded ? 'border-blue-500/60' : 'border-blue-500/30',
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        hoverBorder: 'hover:border-blue-500/60',
      },
      violet: {
        border: isExpanded ? 'border-violet-500/60' : 'border-violet-500/30',
        bg: 'bg-violet-500/20',
        text: 'text-violet-400',
        hoverBorder: 'hover:border-violet-500/60',
      },
      emerald: {
        border: isExpanded ? 'border-emerald-500/60' : 'border-emerald-500/30',
        bg: 'bg-emerald-500/20',
        text: 'text-emerald-400',
        hoverBorder: 'hover:border-emerald-500/60',
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="space-y-4">
      {gradeGroups.map((group) => {
        if (group.curricula.length === 0) return null;

        const isExpanded = expandedGroups.has(group.key);
        const colors = getColorClasses(group.color, isExpanded);

        return (
          <div
            key={group.key}
            className={`bg-zinc-800 border ${colors.border} rounded-xl overflow-hidden transition-all ${colors.hoverBorder}`}
          >
            <button
              onClick={() => toggleGroup(group.key)}
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-zinc-700/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center ${colors.text}`}>
                  {group.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">
                    {group.label}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {group.curricula.length} {group.curricula.length === 1 ? 'curriculum' : 'curricula'}
                  </p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-zinc-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isExpanded && (
              <div className="px-6 pb-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.curricula.map((curriculum) => (
                    <CurriculumCard
                      key={curriculum.id}
                      curriculum={curriculum}
                      topicLabels={topicLabels}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CollapsedCurriculumGrid;
