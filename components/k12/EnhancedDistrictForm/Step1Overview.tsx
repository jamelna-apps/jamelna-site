'use client';

import React from 'react';
import {
  EnhancedDistrictProfile,
  GradeLevel,
  TimelineGoal,
} from '@/lib/export/templates';

// US States for dropdown
const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'Washington D.C.' },
  { value: 'PR', label: 'Puerto Rico' },
];

const GRADE_LEVELS: { value: GradeLevel; label: string; description: string }[] = [
  { value: 'elementary', label: 'Elementary', description: 'K-5' },
  { value: 'middle', label: 'Middle School', description: '6-8' },
  { value: 'high', label: 'High School', description: '9-12' },
];

const TIMELINE_OPTIONS: { value: TimelineGoal; label: string; description: string }[] = [
  { value: 'exploring', label: 'Exploring Options', description: 'Just learning about possibilities' },
  { value: 'pilotThisYear', label: 'Pilot This Year', description: 'Ready to start small this school year' },
  { value: 'fullIn1to2Years', label: 'Full Implementation (1-2 Years)', description: 'Planning comprehensive rollout soon' },
  { value: 'fullIn3to5Years', label: 'Full Implementation (3-5 Years)', description: 'Long-term strategic planning' },
];

interface Step1OverviewProps {
  profile: Partial<EnhancedDistrictProfile>;
  updateProfile: (updates: Partial<EnhancedDistrictProfile>) => void;
}

export default function Step1Overview({ profile, updateProfile }: Step1OverviewProps) {
  const toggleGradeLevel = (level: GradeLevel) => {
    const current = profile.gradeLevels || [];
    const updated = current.includes(level)
      ? current.filter((l) => l !== level)
      : [...current, level];
    updateProfile({ gradeLevels: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Tell us about your school or district
        </h2>
        <p className="text-gray-600">
          This information helps us customize your CS integration plan.
        </p>
      </div>

      {/* School/District Name */}
      <div>
        <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
          School or District Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="schoolName"
          value={profile.schoolName || ''}
          onChange={(e) => updateProfile({ schoolName: e.target.value })}
          placeholder="e.g., Lincoln Elementary School or Springfield Unified School District"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        />
      </div>

      {/* City and State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            value={profile.city || ''}
            onChange={(e) => updateProfile({ city: e.target.value })}
            placeholder="e.g., Springfield"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State <span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            value={profile.state || ''}
            onChange={(e) => updateProfile({ state: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          >
            <option value="">Select a state</option>
            {US_STATES.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            We&apos;ll include state-specific CS standards and requirements
          </p>
        </div>
      </div>

      {/* Grade Levels */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grade Levels Served <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Select all that apply. This determines which curricula and standards we recommend.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {GRADE_LEVELS.map((level) => {
            const isSelected = profile.gradeLevels?.includes(level.value);
            return (
              <button
                key={level.value}
                type="button"
                onClick={() => toggleGradeLevel(level.value)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-slate-600 bg-slate-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected ? 'border-slate-600 bg-slate-600' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">{level.label}</span>
                </div>
                <span className="text-sm text-gray-500 ml-7">{level.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Implementation Timeline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Implementation Timeline
        </label>
        <p className="text-xs text-gray-500 mb-3">
          This helps us prioritize recommendations for your situation.
        </p>
        <div className="space-y-2">
          {TIMELINE_OPTIONS.map((option) => {
            const isSelected = profile.implementationTimeline === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => updateProfile({ implementationTimeline: option.value })}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-slate-600 bg-slate-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-slate-600' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />}
                  </div>
                  <div>
                    <span className="font-medium">{option.label}</span>
                    <span className="text-sm text-gray-500 ml-2">{option.description}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
