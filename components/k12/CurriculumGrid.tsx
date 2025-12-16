'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Curriculum, GradeLevel, Topic } from '@/data/curricula';
import CurriculumCard from './CurriculumCard';

interface CurriculumGridProps {
  curricula: Curriculum[];
  gradeLevelLabels: Record<GradeLevel, string>;
  topicLabels: Record<Topic, string>;
  filterLabel: string;
  allGradesLabel: string;
  allTopicsLabel: string;
  gradeLevelFilterLabel: string;
  topicFilterLabel: string;
}

interface MultiSelectDropdownProps {
  id: string;
  label: string;
  allLabel: string;
  options: { value: string; label: string }[];
  selected: Set<string>;
  onChange: (selected: Set<string>) => void;
  chipColor: 'slate' | 'blue';
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  id,
  label,
  allLabel,
  options,
  selected,
  onChange,
  chipColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(value)) {
      newSelected.delete(value);
    } else {
      newSelected.add(value);
    }
    onChange(newSelected);
  };

  const displayText = selected.size === 0
    ? allLabel
    : selected.size === 1
      ? options.find(o => o.value === Array.from(selected)[0])?.label || allLabel
      : `${selected.size} selected`;

  return (
    <div className="flex-1 relative" ref={dropdownRef}>
      <label htmlFor={id} className="block text-xs font-medium text-text-muted mb-1">
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 bg-deep-card border border-deep-border rounded-lg text-sm font-medium text-text-secondary focus:ring-2 focus:ring-warm/50 focus:border-transparent cursor-pointer hover:border-warm/30 transition-colors text-left flex items-center justify-between"
      >
        <span className={selected.size === 0 ? 'text-text-muted' : 'text-text-primary'}>
          {displayText}
        </span>
        <svg
          className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-deep-card border border-deep-border rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center px-4 py-2.5 hover:bg-deep-alt cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.has(option.value)}
                onChange={() => toggleOption(option.value)}
                className={`w-4 h-4 rounded border-deep-border bg-deep ${chipColor === 'slate' ? 'text-primary focus:ring-primary/50' : 'text-warm focus:ring-warm/50'}`}
              />
              <span className="ml-3 text-sm text-text-secondary">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const CurriculumGrid: React.FC<CurriculumGridProps> = ({
  curricula,
  gradeLevelLabels,
  topicLabels,
  filterLabel,
  allGradesLabel,
  allTopicsLabel,
  gradeLevelFilterLabel,
  topicFilterLabel,
}) => {
  const [selectedGrades, setSelectedGrades] = useState<Set<GradeLevel>>(new Set());
  const [selectedTopics, setSelectedTopics] = useState<Set<Topic>>(new Set());

  const filteredCurricula = curricula.filter((c) => {
    const gradeMatch = selectedGrades.size === 0 || c.grades.some(g => selectedGrades.has(g));
    const topicMatch = selectedTopics.size === 0 || c.topics.some(t => selectedTopics.has(t));
    return gradeMatch && topicMatch;
  });

  const gradeLevels: GradeLevel[] = ['elementary', 'middle', 'high'];
  const topics: Topic[] = ['cs', 'ct', 'ai', 'cybersecurity', 'robotics', 'data', 'web'];

  const gradeOptions = gradeLevels.map(g => ({ value: g, label: gradeLevelLabels[g] }));
  const topicOptions = topics.map(t => ({ value: t, label: topicLabels[t] }));

  const removeGrade = (grade: GradeLevel) => {
    const newSelected = new Set(selectedGrades);
    newSelected.delete(grade);
    setSelectedGrades(newSelected);
  };

  const removeTopic = (topic: Topic) => {
    const newSelected = new Set(selectedTopics);
    newSelected.delete(topic);
    setSelectedTopics(newSelected);
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 p-4 bg-deep-card rounded-lg border border-deep-border">
        <p className="text-sm font-medium text-text-secondary mb-4">{filterLabel}</p>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Grade Level Multi-Select */}
          <MultiSelectDropdown
            id="grade-filter"
            label={gradeLevelFilterLabel}
            allLabel={allGradesLabel}
            options={gradeOptions}
            selected={selectedGrades as Set<string>}
            onChange={(s) => setSelectedGrades(s as Set<GradeLevel>)}
            chipColor="slate"
          />

          {/* Topic Multi-Select */}
          <MultiSelectDropdown
            id="topic-filter"
            label={topicFilterLabel}
            allLabel={allTopicsLabel}
            options={topicOptions}
            selected={selectedTopics as Set<string>}
            onChange={(s) => setSelectedTopics(s as Set<Topic>)}
            chipColor="blue"
          />
        </div>

        {/* Active filters display */}
        {(selectedGrades.size > 0 || selectedTopics.size > 0) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-text-muted">Active filters:</span>
            {Array.from(selectedGrades).map((grade) => (
              <span key={grade} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary-light rounded-full text-xs">
                {gradeLevelLabels[grade]}
                <button
                  onClick={() => removeGrade(grade)}
                  className="ml-1 hover:text-white"
                  aria-label={`Remove ${gradeLevelLabels[grade]} filter`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            {Array.from(selectedTopics).map((topic) => (
              <span key={topic} className="inline-flex items-center gap-1 px-2 py-1 bg-warm/20 text-warm-light rounded-full text-xs">
                {topicLabels[topic]}
                <button
                  onClick={() => removeTopic(topic)}
                  className="ml-1 hover:text-white"
                  aria-label={`Remove ${topicLabels[topic]} filter`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            <button
              onClick={() => {
                setSelectedGrades(new Set());
                setSelectedTopics(new Set());
              }}
              className="text-xs text-text-muted hover:text-text-primary underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <p className="text-sm text-text-secondary mb-6">
        {filteredCurricula.length} {filteredCurricula.length === 1 ? 'curriculum' : 'curricula'} found
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCurricula.map((curriculum) => (
          <CurriculumCard
            key={curriculum.id}
            curriculum={curriculum}
            topicLabels={topicLabels}
          />
        ))}
      </div>

      {filteredCurricula.length === 0 && (
        <div className="text-center py-12 text-text-muted">
          No curricula match your current filters. Try adjusting your selection.
        </div>
      )}
    </div>
  );
};

export default CurriculumGrid;
