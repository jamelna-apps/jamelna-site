'use client';

import React from 'react';
import {
  EnhancedDistrictProfile,
  Initiative,
  CultureTrait,
} from '@/lib/export/templates';

const INITIATIVES: { value: Initiative; label: string; description: string }[] = [
  { value: 'stemSteam', label: 'STEM/STEAM Program', description: 'Integrated science, tech, engineering, arts, math' },
  { value: 'pbl', label: 'Project-Based Learning', description: 'Student-driven projects and inquiry' },
  { value: 'makerEd', label: 'Maker Education', description: 'Makerspaces, hands-on creation, tinkering' },
  { value: 'designThinking', label: 'Design Thinking', description: 'Human-centered problem solving curriculum' },
  { value: 'sel', label: 'Social-Emotional Learning', description: 'SEL integration and character education' },
  { value: 'culturallyResponsive', label: 'Culturally Responsive Teaching', description: 'Equity-focused, inclusive pedagogy' },
  { value: 'giftedTalented', label: 'Gifted & Talented', description: 'Advanced learner programs' },
  { value: 'specialEdInclusion', label: 'Special Ed Inclusion', description: 'Inclusive classrooms and support' },
  { value: 'ellSupport', label: 'ELL Support', description: 'English Language Learner programs' },
  { value: 'cte', label: 'Career Readiness / CTE', description: 'Career technical education pathways' },
  { value: 'serviceLearning', label: 'Service Learning', description: 'Community engagement and service projects' },
  { value: 'industryMentorship', label: 'Industry Mentorship', description: 'Business partnerships and mentors' },
];

const CULTURE_TRAITS: { value: CultureTrait; label: string }[] = [
  { value: 'teacherCollaboration', label: 'Strong teacher collaboration' },
  { value: 'innovationFriendly', label: 'Innovation-friendly administration' },
  { value: 'parentInvolvement', label: 'Active parent involvement' },
  { value: 'communityPartnerships', label: 'Strong community partnerships' },
  { value: 'equityFocus', label: 'Focus on equity and inclusion' },
  { value: 'dataDriven', label: 'Data-driven decision making' },
  { value: 'teacherAutonomy', label: 'Teacher autonomy encouraged' },
];

interface Step5CultureProps {
  profile: Partial<EnhancedDistrictProfile>;
  updateProfile: (updates: Partial<EnhancedDistrictProfile>) => void;
}

export default function Step5Culture({ profile, updateProfile }: Step5CultureProps) {
  const toggleInitiative = (initiative: Initiative) => {
    const current = profile.existingInitiatives || [];
    const updated = current.includes(initiative)
      ? current.filter((i) => i !== initiative)
      : [...current, initiative];
    updateProfile({ existingInitiatives: updated });
  };

  const toggleCultureTrait = (trait: CultureTrait) => {
    const current = profile.cultureCharacteristics || [];
    const updated = current.includes(trait)
      ? current.filter((t) => t !== trait)
      : [...current, trait];
    updateProfile({ cultureCharacteristics: updated });
  };

  const selectedInitiatives = profile.existingInitiatives || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          School Culture & Initiatives
        </h2>
        <p className="text-gray-600">
          Existing programs and culture can be leveraged to support CS integration. Tell us what&apos;s already working.
        </p>
      </div>

      {/* Existing Initiatives */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Existing Initiatives to Build On
        </label>
        <p className="text-xs text-gray-500 mb-3">
          We&apos;ll show how CS can enhance these programs and vice versa.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {INITIATIVES.map((initiative) => {
            const isSelected = selectedInitiatives.includes(initiative.value);
            return (
              <button
                key={initiative.value}
                type="button"
                onClick={() => toggleInitiative(initiative.value)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-slate-600 bg-slate-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected ? 'border-slate-600 bg-slate-600' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{initiative.label}</div>
                    <div className="text-xs text-gray-500">{initiative.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Culture Characteristics */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          School Culture Characteristics
        </label>
        <p className="text-xs text-gray-500 mb-3">
          What&apos;s true about your school environment?
        </p>
        <div className="flex flex-wrap gap-2">
          {CULTURE_TRAITS.map((trait) => {
            const isSelected = profile.cultureCharacteristics?.includes(trait.value);
            return (
              <button
                key={trait.value}
                type="button"
                onClick={() => toggleCultureTrait(trait.value)}
                className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                  isSelected
                    ? 'border-slate-600 bg-slate-600 text-white'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {trait.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Existing Partnerships */}
      <div>
        <label htmlFor="partnerships" className="block text-sm font-medium text-gray-700 mb-1">
          Existing Community Partnerships (Optional)
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Local businesses, universities, or organizations that might support CS education.
        </p>
        <textarea
          id="partnerships"
          value={profile.existingPartnerships || ''}
          onChange={(e) => updateProfile({ existingPartnerships: e.target.value })}
          placeholder="e.g., Local tech company mentorship program, University of X partnership, Boys & Girls Club..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        />
      </div>

      {/* Dynamic suggestions based on selections */}
      {selectedInitiatives.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-green-800">
              <strong>Great foundations!</strong> Your existing initiatives create natural entry points for CS:
              <ul className="mt-2 space-y-1 ml-4 list-disc">
                {selectedInitiatives.includes('stemSteam') && (
                  <li>STEM/STEAM: CS is a natural fit - integrate coding into existing projects</li>
                )}
                {selectedInitiatives.includes('pbl') && (
                  <li>PBL: Students can code solutions to real-world problems</li>
                )}
                {selectedInitiatives.includes('makerEd') && (
                  <li>Maker Ed: Add physical computing and robotics to makerspace</li>
                )}
                {selectedInitiatives.includes('sel') && (
                  <li>SEL: Pair programming builds collaboration skills</li>
                )}
                {selectedInitiatives.includes('cte') && (
                  <li>CTE: CS pathways lead directly to careers</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
