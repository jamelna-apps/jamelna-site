'use client';

interface DistrictProfile {
  id?: string;
  schoolName: string;
  city: string;
  state: string;
  gradeLevels: string[];
  currentOfferings?: string;
  pathways?: string[];
  resources?: string;
}

interface ProfileReviewStepProps {
  profile: DistrictProfile;
  onConfirm: () => void;
  onEdit?: () => void;
  labels?: {
    title?: string;
    description?: string;
    schoolName?: string;
    city?: string;
    state?: string;
    gradeLevels?: string;
    currentOfferings?: string;
    pathways?: string;
    resources?: string;
    edit?: string;
    confirm?: string;
    confirmingNote?: string;
  };
}

const GRADE_LEVEL_LABELS: Record<string, string> = {
  elementary: 'Elementary (K-5)',
  middle: 'Middle School (6-8)',
  high: 'High School (9-12)',
};

const PATHWAY_LABELS: Record<string, string> = {
  'software-development': 'Software Development',
  'data-science': 'Data Science',
  cybersecurity: 'Cybersecurity',
  'ai-ml': 'AI & Machine Learning',
  'web-development': 'Web Development',
  'game-development': 'Game Development',
  robotics: 'Robotics',
  'computational-thinking': 'Computational Thinking',
};

export function ProfileReviewStep({
  profile,
  onConfirm,
  onEdit,
  labels = {},
}: ProfileReviewStepProps) {
  const defaultLabels = {
    title: 'Review Your District Profile',
    description: 'Please confirm your information before we generate your plan.',
    schoolName: 'School/District Name',
    city: 'City',
    state: 'State',
    gradeLevels: 'Grade Levels',
    currentOfferings: 'Current CS Offerings',
    pathways: 'Pathways of Interest',
    resources: 'Available Resources',
    edit: 'Edit Profile',
    confirm: 'Generate Plan',
    confirmingNote: 'Click "Generate Plan" to have our AI create a comprehensive K-12 CS education plan tailored to your district.',
    ...labels,
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {defaultLabels.title}
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {defaultLabels.description}
          </p>
        </div>

        {/* Profile Details */}
        <div className="px-6 py-6 space-y-6">
          {/* School Name */}
          <div className="flex items-start justify-between">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {defaultLabels.schoolName}
              </dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {profile.schoolName}
              </dd>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>

          {/* City & State */}
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {defaultLabels.city} / {defaultLabels.state}
            </dt>
            <dd className="mt-1 text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {profile.city}, {profile.state}
            </dd>
          </div>

          {/* Grade Levels */}
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {defaultLabels.gradeLevels}
            </dt>
            <dd className="flex flex-wrap gap-2">
              {profile.gradeLevels.map((level) => (
                <span
                  key={level}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                >
                  {GRADE_LEVEL_LABELS[level] || level}
                </span>
              ))}
              {profile.gradeLevels.length === 0 && (
                <span className="text-gray-400 italic">Not specified</span>
              )}
            </dd>
          </div>

          {/* Current Offerings */}
          {profile.currentOfferings && (
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {defaultLabels.currentOfferings}
              </dt>
              <dd className="mt-1 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-sm">
                {profile.currentOfferings}
              </dd>
            </div>
          )}

          {/* Pathways */}
          {profile.pathways && profile.pathways.length > 0 && (
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {defaultLabels.pathways}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {profile.pathways.map((pathway) => (
                  <span
                    key={pathway}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                  >
                    {PATHWAY_LABELS[pathway] || pathway}
                  </span>
                ))}
              </dd>
            </div>
          )}

          {/* Resources */}
          {profile.resources && (
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {defaultLabels.resources}
              </dt>
              <dd className="mt-1 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-sm">
                {profile.resources}
              </dd>
            </div>
          )}
        </div>

        {/* Note */}
        <div className="px-6 py-4 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {defaultLabels.confirmingNote}
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              {defaultLabels.edit}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {defaultLabels.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}
