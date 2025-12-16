'use client';

interface ScopeSequenceEntry {
  gradeLevel: string;
  competencies: string[];
  instructionTime: string;
  curricula: string[];
  standards: string[];
}

interface ScopeSequenceTableProps {
  entries: ScopeSequenceEntry[];
  editable?: boolean;
  onUpdate?: (entries: ScopeSequenceEntry[]) => void;
}

const GRADE_LEVEL_COLORS: Record<string, string> = {
  'K-2': 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  'K-5': 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  '3-5': 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  '6-8': 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  '9-12': 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
  'Elementary': 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  'Middle': 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  'High': 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
};

const GRADE_LEVEL_LABELS: Record<string, string> = {
  'K-2': 'Early Elementary (K-2)',
  'K-5': 'Elementary (K-5)',
  '3-5': 'Upper Elementary (3-5)',
  '6-8': 'Middle School (6-8)',
  '9-12': 'High School (9-12)',
  'Elementary': 'Elementary',
  'Middle': 'Middle School',
  'High': 'High School',
};

export function ScopeSequenceTable({ entries, editable = false, onUpdate }: ScopeSequenceTableProps) {
  if (!entries || entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No scope and sequence data available yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map((entry, index) => {
        const colorClass = GRADE_LEVEL_COLORS[entry.gradeLevel] || 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
        const label = GRADE_LEVEL_LABELS[entry.gradeLevel] || entry.gradeLevel;

        return (
          <div
            key={index}
            className={`rounded-lg border-2 overflow-hidden ${colorClass}`}
          >
            {/* Grade Level Header */}
            <div className="px-4 py-3 border-b border-inherit">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {label}
                </h3>
                {entry.instructionTime && (
                  <span className="text-sm text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-gray-700/60 px-2 py-1 rounded">
                    {entry.instructionTime}
                  </span>
                )}
              </div>
            </div>

            {/* Content Grid */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Competencies */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Competencies
                </h4>
                {entry.competencies.length > 0 ? (
                  <ul className="space-y-1">
                    {entry.competencies.map((comp, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        {editable ? (
                          <input
                            type="text"
                            value={comp}
                            onChange={(e) => {
                              if (onUpdate) {
                                const newEntries = [...entries];
                                newEntries[index].competencies[i] = e.target.value;
                                onUpdate(newEntries);
                              }
                            }}
                            className="flex-1 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
                          />
                        ) : (
                          <span>{comp}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic">Not specified</p>
                )}
              </div>

              {/* Curricula */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Recommended Curricula
                </h4>
                {entry.curricula.length > 0 ? (
                  <ul className="space-y-1">
                    {entry.curricula.map((curr, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>{curr}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic">Not specified</p>
                )}
              </div>

              {/* Standards */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  CSTA Standards
                </h4>
                {entry.standards.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {entry.standards.map((std, i) => (
                      <span
                        key={i}
                        className="inline-block text-xs bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 px-2 py-1 rounded border border-gray-200 dark:border-gray-600"
                      >
                        {std}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">Not specified</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
