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
    <div className="bg-deep-card border border-deep-border rounded-lg overflow-hidden hover:border-warm/50 hover:shadow-lg hover:shadow-warm/10 transition-all">
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-text-heading mb-1">
            {curriculum.name}
          </h3>
          <p className="text-sm text-text-secondary">
            {curriculum.organization}
          </p>
        </div>

        {/* Grade Range Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary-light">
            {curriculum.gradeRange}
          </span>
          {curriculum.isFree && (
            <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-highlight-green/20 text-highlight-green">
              Free
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          {curriculum.description}
        </p>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {curriculum.topics.map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-warm/20 text-warm-light"
            >
              {getLabel(topic)}
            </span>
          ))}
        </div>

        {/* Standards Alignment */}
        {curriculum.hasStandardsAlignment && curriculum.standardsNotes && (
          <p className="text-xs text-text-muted mb-4">
            {curriculum.standardsNotes}
          </p>
        )}

        {/* Link */}
        <a
          href={curriculum.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-warm hover:text-warm-light font-medium text-sm transition-colors"
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
