'use client';

import React from 'react';
import {
  EnhancedDistrictProfile,
  BudgetRange,
  CSGoal,
  Challenge,
} from '@/lib/export/templates';

const BUDGET_OPTIONS: { value: BudgetRange; label: string; description: string }[] = [
  {
    value: 'none',
    label: 'No Dedicated Budget',
    description: 'Will need to use existing resources or free materials',
  },
  {
    value: 'minimal',
    label: 'Minimal ($0-$1,000/year)',
    description: 'Small allocation for materials or subscriptions',
  },
  {
    value: 'moderate',
    label: 'Moderate ($1,000-$10,000/year)',
    description: 'Can fund curriculum licenses and some PD',
  },
  {
    value: 'significant',
    label: 'Significant ($10,000+/year)',
    description: 'Can support comprehensive program implementation',
  },
];

const CS_GOALS: { value: CSGoal; label: string; description: string }[] = [
  {
    value: 'meetStateRequirements',
    label: 'Meet State Requirements',
    description: 'Comply with state CS education mandates',
  },
  {
    value: 'prepareForCareers',
    label: 'Prepare Students for Tech Careers',
    description: 'Build workforce-ready skills',
  },
  {
    value: 'computationalThinking',
    label: 'Develop Computational Thinking',
    description: 'Integrate problem-solving across subjects',
  },
  {
    value: 'increaseEquity',
    label: 'Increase Equity in CS Access',
    description: 'Ensure all students have CS opportunities',
  },
  {
    value: 'stemPathway',
    label: 'Support STEM Pathway Development',
    description: 'Build K-12 progression to STEM careers',
  },
  {
    value: 'enhanceCurriculum',
    label: 'Enhance Curriculum with CS Concepts',
    description: 'Integrate CS across existing subjects',
  },
  {
    value: 'competitions',
    label: 'Compete in Robotics/Programming',
    description: 'Participate in competitions and events',
  },
];

const CHALLENGES: { value: Challenge; label: string }[] = [
  { value: 'lackTrainedTeachers', label: 'Lack of trained teachers' },
  { value: 'noScheduleTime', label: 'No dedicated time in schedule' },
  { value: 'limitedTechnology', label: 'Limited technology access' },
  { value: 'noCurriculumGuidance', label: 'No curriculum guidance' },
  { value: 'budgetConstraints', label: 'Budget constraints' },
  { value: 'adminBuyIn', label: 'Need administrator buy-in' },
  { value: 'parentUnderstanding', label: 'Parent/community understanding' },
];

interface Step6GoalsProps {
  profile: Partial<EnhancedDistrictProfile>;
  updateProfile: (updates: Partial<EnhancedDistrictProfile>) => void;
}

export default function Step6Goals({ profile, updateProfile }: Step6GoalsProps) {
  const toggleGoal = (goal: CSGoal) => {
    const current = profile.primaryGoals || [];
    if (current.includes(goal)) {
      updateProfile({ primaryGoals: current.filter((g) => g !== goal) });
    } else if (current.length < 3) {
      // Limit to 3 goals
      updateProfile({ primaryGoals: [...current, goal] });
    }
  };

  const toggleChallenge = (challenge: Challenge) => {
    const current = profile.challenges || [];
    const updated = current.includes(challenge)
      ? current.filter((c) => c !== challenge)
      : [...current, challenge];
    updateProfile({ challenges: updated });
  };

  const selectedGoals = profile.primaryGoals || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Goals & Constraints
        </h2>
        <p className="text-gray-600">
          Help us understand what you&apos;re trying to achieve and what challenges you face.
        </p>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Budget for CS Education
        </label>
        <div className="space-y-2">
          {BUDGET_OPTIONS.map((option) => {
            const isSelected = profile.budget === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => updateProfile({ budget: option.value })}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
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

      {/* Primary Goals - Select up to 3 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Goals <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Select your top 3 priorities. We&apos;ll optimize recommendations for these.
        </p>
        <div className="space-y-2">
          {CS_GOALS.map((goal, index) => {
            const isSelected = selectedGoals.includes(goal.value);
            const position = selectedGoals.indexOf(goal.value);
            const isDisabled = !isSelected && selectedGoals.length >= 3;

            return (
              <button
                key={goal.value}
                type="button"
                onClick={() => toggleGoal(goal.value)}
                disabled={isDisabled}
                className={`w-full p-3 rounded-lg border transition-all text-left ${
                  isDisabled
                    ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                    : isSelected
                      ? 'border-slate-600 bg-slate-50'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-sm font-medium ${
                      isSelected
                        ? 'border-slate-600 bg-slate-600 text-white'
                        : 'border-gray-300 text-gray-400'
                    }`}
                  >
                    {isSelected ? position + 1 : index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{goal.label}</div>
                    <div className="text-sm text-gray-500">{goal.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {selectedGoals.length > 0 && selectedGoals.length < 3 && (
          <p className="text-xs text-gray-500 mt-2">
            Select {3 - selectedGoals.length} more goal{3 - selectedGoals.length > 1 ? 's' : ''} (optional)
          </p>
        )}
      </div>

      {/* Challenges */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Biggest Challenges
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Select the obstacles you&apos;re facing. We&apos;ll address these in your plan.
        </p>
        <div className="flex flex-wrap gap-2">
          {CHALLENGES.map((challenge) => {
            const isSelected = profile.challenges?.includes(challenge.value);
            return (
              <button
                key={challenge.value}
                type="button"
                onClick={() => toggleChallenge(challenge.value)}
                className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                  isSelected
                    ? 'border-red-300 bg-red-50 text-red-800'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {challenge.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Context based on budget */}
      {profile.budget && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              {profile.budget === 'none' && (
                <p>
                  <strong>Budget-friendly focus:</strong> We&apos;ll prioritize free, open-source curricula like Code.org,
                  CS Unplugged, and Scratch. Many excellent CS programs cost nothing!
                </p>
              )}
              {profile.budget === 'minimal' && (
                <p>
                  <strong>Maximizing value:</strong> We&apos;ll recommend mostly free curricula with strategic paid
                  resources where they add the most value (like certain PD programs).
                </p>
              )}
              {profile.budget === 'moderate' && (
                <p>
                  <strong>Good flexibility:</strong> This budget allows for curriculum licenses, teacher training,
                  and some equipment purchases to build a solid program.
                </p>
              )}
              {profile.budget === 'significant' && (
                <p>
                  <strong>Full program potential:</strong> You can implement comprehensive solutions including
                  premium curricula, extensive PD, robotics equipment, and dedicated CS positions.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
