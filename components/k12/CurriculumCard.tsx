'use client';

import React from 'react';
import { Curriculum, Topic, getTopicLabel } from '@/data/curricula';

interface CurriculumCardProps {
  curriculum: Curriculum;
  topicLabels?: Record<string, string>;
}

const CurriculumCard: React.FC<CurriculumCardProps> = ({ curriculum, topicLabels }) => {
  const getLabel = (topic: string) => {
    return topicLabels?.[topic] || getTopicLabel(topic as Topic);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all">
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white mb-1">
            {curriculum.name}
          </h3>
          <p className="text-sm text-zinc-400">
            {curriculum.organization}
          </p>
        </div>

        {/* Grade Range Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300">
            {curriculum.gradeRange}
          </span>
          {curriculum.isFree && (
            <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400">
              Free
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
          {curriculum.description}
        </p>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {curriculum.topics.map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-500/20 text-orange-300"
            >
              {getLabel(topic)}
            </span>
          ))}
        </div>

        {/* Standards Alignment */}
        {curriculum.hasStandardsAlignment && curriculum.standardsNotes && (
          <p className="text-xs text-zinc-500 mb-4">
            {curriculum.standardsNotes}
          </p>
        )}

        {/* Link */}
        <a
          href={curriculum.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors"
        >
          Visit Resource
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default CurriculumCard;
