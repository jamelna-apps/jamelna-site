'use client';

import React from 'react';
import {
  EnhancedDistrictProfile,
  CSStatus,
  CSActivity,
  PDExperience,
} from '@/lib/export/templates';

const CS_STATUS_OPTIONS: { value: CSStatus; label: string; description: string }[] = [
  {
    value: 'none',
    label: 'No Formal CS Instruction',
    description: 'CS is not currently taught in any structured way',
  },
  {
    value: 'informal',
    label: 'Informal Integration',
    description: 'Some teachers incorporate CS concepts informally',
  },
  {
    value: 'someLevels',
    label: 'Dedicated CS at Some Levels',
    description: 'Formal CS classes exist at certain grade levels',
  },
  {
    value: 'comprehensive',
    label: 'Comprehensive K-12 Program',
    description: 'Structured CS curriculum across all grade bands',
  },
];

const CS_ACTIVITIES: { value: CSActivity; label: string }[] = [
  { value: 'hourOfCode', label: 'Hour of Code' },
  { value: 'codingClubs', label: 'Coding Clubs' },
  { value: 'roboticsTeams', label: 'Robotics Teams' },
  { value: 'techIntegration', label: 'Tech Integration in Other Subjects' },
  { value: 'computerLab', label: 'Computer Lab Time' },
  { value: 'oneToOne', label: '1:1 Device Program' },
  { value: 'makerspace', label: 'Makerspace' },
];

const PD_EXPERIENCES: { value: PDExperience; label: string }[] = [
  { value: 'none', label: 'No CS-specific PD' },
  { value: 'hourOfCodeFacilitation', label: 'Hour of Code Facilitation' },
  { value: 'codeOrgTraining', label: 'Code.org Training' },
  { value: 'scratchTraining', label: 'Scratch Training' },
  { value: 'stateCertification', label: 'State CS Certification' },
  { value: 'graduateCoursework', label: 'Graduate Coursework in CS Education' },
  { value: 'otherWorkshops', label: 'Other CS Workshops' },
];

interface Step3CurrentStateProps {
  profile: Partial<EnhancedDistrictProfile>;
  updateProfile: (updates: Partial<EnhancedDistrictProfile>) => void;
}

export default function Step3CurrentState({ profile, updateProfile }: Step3CurrentStateProps) {
  const toggleActivity = (activity: CSActivity) => {
    const current = profile.existingActivities || [];
    const updated = current.includes(activity)
      ? current.filter((a) => a !== activity)
      : [...current, activity];
    updateProfile({ existingActivities: updated });
  };

  const togglePD = (pd: PDExperience) => {
    const current = profile.previousPD || [];
    // Handle "none" specially - if selecting none, clear others
    if (pd === 'none') {
      updateProfile({ previousPD: current.includes('none') ? [] : ['none'] });
      return;
    }
    // If selecting other options, remove "none"
    const withoutNone = current.filter((p) => p !== 'none');
    const updated = withoutNone.includes(pd)
      ? withoutNone.filter((p) => p !== pd)
      : [...withoutNone, pd];
    updateProfile({ previousPD: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Current CS Landscape
        </h2>
        <p className="text-gray-600">
          Tell us about any existing CS activities and professional development at your school.
        </p>
      </div>

      {/* Current CS Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current CS Status <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {CS_STATUS_OPTIONS.map((option) => {
            const isSelected = profile.currentCSStatus === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => updateProfile({ currentCSStatus: option.value })}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-slate-600 bg-slate-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected ? 'border-slate-600' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Existing CS Activities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Existing CS-Related Activities
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Select any activities currently happening at your school.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {CS_ACTIVITIES.map((activity) => {
            const isSelected = profile.existingActivities?.includes(activity.value);
            return (
              <button
                key={activity.value}
                type="button"
                onClick={() => toggleActivity(activity.value)}
                className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                  isSelected
                    ? 'border-slate-600 bg-slate-50 text-slate-800'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      isSelected ? 'border-slate-600 bg-slate-600' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{activity.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Previous Professional Development */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Previous CS Professional Development
        </label>
        <p className="text-xs text-gray-500 mb-3">
          What CS-related training have teachers received? This helps us avoid redundant recommendations.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {PD_EXPERIENCES.map((pd) => {
            const isSelected = profile.previousPD?.includes(pd.value);
            const isDisabled = pd.value !== 'none' && profile.previousPD?.includes('none');
            return (
              <button
                key={pd.value}
                type="button"
                onClick={() => togglePD(pd.value)}
                disabled={isDisabled}
                className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                  isDisabled
                    ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                    : isSelected
                      ? 'border-slate-600 bg-slate-50 text-slate-800'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      isSelected ? 'border-slate-600 bg-slate-600' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{pd.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Help text based on status */}
      {profile.currentCSStatus && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              {profile.currentCSStatus === 'none' && (
                <p>
                  Starting from scratch gives you flexibility! We&apos;ll recommend beginner-friendly curricula
                  and low-barrier entry points for all teachers.
                </p>
              )}
              {profile.currentCSStatus === 'informal' && (
                <p>
                  Great foundation! We&apos;ll help formalize these efforts and provide structure while building
                  on existing teacher interest.
                </p>
              )}
              {profile.currentCSStatus === 'someLevels' && (
                <p>
                  We&apos;ll help you expand to all grade levels with a coherent K-12 scope and sequence that
                  builds on your existing program.
                </p>
              )}
              {profile.currentCSStatus === 'comprehensive' && (
                <p>
                  Excellent! We&apos;ll focus on optimization, deeper integration across subjects, and advanced
                  pathways for your mature program.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
