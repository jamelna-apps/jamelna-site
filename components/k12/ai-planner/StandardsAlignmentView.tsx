'use client';

import { useState } from 'react';

interface StandardMapping {
  code: string;
  description: string;
  gradeBand: string;
  concept: string;
  practice?: string;
  alignedCurricula?: string[];
}

interface StandardsAlignmentViewProps {
  standards: StandardMapping[];
  onStandardSelect?: (standard: StandardMapping) => void;
}

// CSTA Grade Bands
const GRADE_BANDS = ['K-2', '3-5', '6-8', '9-12'];

// CSTA Concepts
const CONCEPTS = [
  { id: 'CS', name: 'Computing Systems', color: 'blue' },
  { id: 'NI', name: 'Networks & the Internet', color: 'purple' },
  { id: 'DA', name: 'Data & Analysis', color: 'green' },
  { id: 'AP', name: 'Algorithms & Programming', color: 'orange' },
  { id: 'IC', name: 'Impacts of Computing', color: 'red' },
];

// CSTA Practices
const PRACTICES = [
  'Fostering an Inclusive Computing Culture',
  'Collaborating Around Computing',
  'Recognizing and Defining Computational Problems',
  'Developing and Using Abstractions',
  'Creating Computational Artifacts',
  'Testing and Refining Computational Artifacts',
  'Communicating About Computing',
];

export function StandardsAlignmentView({ standards, onStandardSelect }: StandardsAlignmentViewProps) {
  const [selectedGradeBand, setSelectedGradeBand] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter standards based on selection
  const filteredStandards = standards.filter((std) => {
    if (selectedGradeBand && std.gradeBand !== selectedGradeBand) return false;
    if (selectedConcept && std.concept !== selectedConcept) return false;
    return true;
  });

  // Group standards by grade band and concept for grid view
  const standardsGrid: Record<string, Record<string, StandardMapping[]>> = {};

  for (const gradeBand of GRADE_BANDS) {
    standardsGrid[gradeBand] = {};
    for (const concept of CONCEPTS) {
      standardsGrid[gradeBand][concept.id] = standards.filter(
        (s) => s.gradeBand === gradeBand && s.concept === concept.id
      );
    }
  }

  const getConceptColor = (conceptId: string): string => {
    const concept = CONCEPTS.find((c) => c.id === conceptId);
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
      orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
      red: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    };
    return colors[concept?.color || 'blue'];
  };

  if (standards.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>No standards alignment data available.</p>
        <p className="text-sm mt-2">
          Standards will appear here once a plan has been generated with CSTA alignment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        {/* Grade Band Filter */}
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400 mr-2">Grade Band:</label>
          <select
            value={selectedGradeBand || ''}
            onChange={(e) => setSelectedGradeBand(e.target.value || null)}
            className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">All Grades</option>
            {GRADE_BANDS.map((band) => (
              <option key={band} value={band}>
                {band}
              </option>
            ))}
          </select>
        </div>

        {/* Concept Filter */}
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400 mr-2">Concept:</label>
          <select
            value={selectedConcept || ''}
            onChange={(e) => setSelectedConcept(e.target.value || null)}
            className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">All Concepts</option>
            {CONCEPTS.map((concept) => (
              <option key={concept.id} value={concept.id}>
                {concept.name}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="ml-auto flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 text-sm rounded ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 text-sm rounded ${
              viewMode === 'list'
                ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 p-2 border-b border-gray-200 dark:border-gray-700">
                  Grade
                </th>
                {CONCEPTS.map((concept) => (
                  <th
                    key={concept.id}
                    className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 p-2 border-b border-gray-200 dark:border-gray-700"
                  >
                    <span className="truncate block max-w-[120px]" title={concept.name}>
                      {concept.id}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRADE_BANDS.filter((band) => !selectedGradeBand || band === selectedGradeBand).map(
                (gradeBand) => (
                  <tr key={gradeBand}>
                    <td className="p-2 border-b border-gray-100 dark:border-gray-800 font-medium text-gray-900 dark:text-white">
                      {gradeBand}
                    </td>
                    {CONCEPTS.filter((c) => !selectedConcept || c.id === selectedConcept).map(
                      (concept) => {
                        const cellStandards = standardsGrid[gradeBand][concept.id];
                        return (
                          <td
                            key={concept.id}
                            className="p-2 border-b border-gray-100 dark:border-gray-800"
                          >
                            <div className="flex flex-wrap gap-1">
                              {cellStandards.map((std) => (
                                <button
                                  key={std.code}
                                  onClick={() => onStandardSelect?.(std)}
                                  className={`text-xs px-2 py-1 rounded border ${getConceptColor(
                                    concept.id
                                  )} hover:opacity-80 transition-opacity`}
                                  title={std.description}
                                >
                                  {std.code}
                                </button>
                              ))}
                            </div>
                          </td>
                        );
                      }
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredStandards.map((std) => (
            <div
              key={std.code}
              onClick={() => onStandardSelect?.(std)}
              className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${getConceptColor(
                std.concept
              )}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-mono font-medium">{std.code}</span>
                  <span className="text-sm ml-2 opacity-75">({std.gradeBand})</span>
                </div>
                <span className="text-xs opacity-75">
                  {CONCEPTS.find((c) => c.id === std.concept)?.name}
                </span>
              </div>
              <p className="text-sm">{std.description}</p>
              {std.alignedCurricula && std.alignedCurricula.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {std.alignedCurricula.map((curr, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded"
                    >
                      {curr}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          CSTA Concepts Legend
        </h4>
        <div className="flex flex-wrap gap-2">
          {CONCEPTS.map((concept) => (
            <div
              key={concept.id}
              className={`text-xs px-2 py-1 rounded border ${getConceptColor(concept.id)}`}
            >
              <span className="font-medium">{concept.id}</span>: {concept.name}
            </div>
          ))}
        </div>
      </div>

      {/* Practices Reference */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          CSTA Practices
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {PRACTICES.map((practice, i) => (
            <div
              key={i}
              className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
            >
              <span className="font-medium text-gray-900 dark:text-white">{i + 1}.</span>
              {practice}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
