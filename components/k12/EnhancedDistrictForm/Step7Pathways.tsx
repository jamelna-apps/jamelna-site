'use client';

import React from 'react';
import {
  EnhancedDistrictProfile,
  Pathway,
  StateRequirementStatus,
} from '@/lib/export/templates';

const PATHWAYS: { value: Pathway; label: string; description: string; icon: string }[] = [
  {
    value: 'robotics',
    label: 'Robotics & Engineering',
    description: 'Physical computing, mechanical design, competition teams',
    icon: '🤖',
  },
  {
    value: 'cybersecurity',
    label: 'Cybersecurity',
    description: 'Network security, ethical hacking, privacy',
    icon: '🔐',
  },
  {
    value: 'ai',
    label: 'AI & Machine Learning',
    description: 'Data science, neural networks, automation',
    icon: '🧠',
  },
  {
    value: 'dataScience',
    label: 'Data Science & Analytics',
    description: 'Statistics, visualization, data-driven decisions',
    icon: '📊',
  },
  {
    value: 'webDev',
    label: 'Web Development',
    description: 'Frontend, backend, full-stack development',
    icon: '🌐',
  },
  {
    value: 'gameDev',
    label: 'Game Development',
    description: 'Game design, programming, interactive media',
    icon: '🎮',
  },
  {
    value: 'itSupport',
    label: 'IT Support & Networking',
    description: 'Hardware, troubleshooting, system administration',
    icon: '💻',
  },
  {
    value: 'digitalMedia',
    label: 'Digital Media & Design',
    description: 'Graphic design, video production, UX/UI',
    icon: '🎨',
  },
];

const STATE_REQUIREMENT_OPTIONS: { value: StateRequirementStatus; label: string; description: string }[] = [
  {
    value: 'notSure',
    label: "I'm Not Sure",
    description: "We'll look up your state's requirements",
  },
  {
    value: 'none',
    label: 'No Requirements',
    description: 'CS is not mandated in my state',
  },
  {
    value: 'recommended',
    label: 'Recommended/Encouraged',
    description: 'State encourages but doesn\'t require CS',
  },
  {
    value: 'required',
    label: 'Required',
    description: 'State mandates CS education',
  },
];

interface Step7PathwaysProps {
  profile: Partial<EnhancedDistrictProfile>;
  updateProfile: (updates: Partial<EnhancedDistrictProfile>) => void;
}

export default function Step7Pathways({ profile, updateProfile }: Step7PathwaysProps) {
  const togglePathway = (pathway: Pathway) => {
    const current = profile.pathways || [];
    const updated = current.includes(pathway)
      ? current.filter((p) => p !== pathway)
      : [...current, pathway];
    updateProfile({ pathways: updated });
  };

  const selectedPathways = profile.pathways || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          CS Pathways & Standards
        </h2>
        <p className="text-gray-600">
          Select the career pathways you&apos;d like to develop, and tell us about your state&apos;s requirements.
        </p>
      </div>

      {/* CS Pathways */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Career Pathways of Interest <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Select pathways to build K-12 progressions toward. We&apos;ll recommend curricula that feed into these tracks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PATHWAYS.map((pathway) => {
            const isSelected = selectedPathways.includes(pathway.value);
            return (
              <button
                key={pathway.value}
                type="button"
                onClick={() => togglePathway(pathway.value)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-slate-600 bg-slate-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{pathway.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{pathway.label}</span>
                      {isSelected && (
                        <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{pathway.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feeder Pathways */}
      {profile.gradeLevels?.includes('high') && (
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={profile.wantFeederPathways || false}
              onChange={(e) => updateProfile({ wantFeederPathways: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500"
            />
            <div>
              <span className="font-medium text-gray-900">Create K-8 feeder pathways</span>
              <p className="text-sm text-gray-500">
                Include recommendations for elementary and middle school activities that prepare students for these high school tracks
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Industry Partners */}
      <div>
        <label htmlFor="industryPartners" className="block text-sm font-medium text-gray-700 mb-1">
          Industry Partners (Optional)
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Local tech companies or organizations that could support these pathways.
        </p>
        <textarea
          id="industryPartners"
          value={profile.industryPartners || ''}
          onChange={(e) => updateProfile({ industryPartners: e.target.value })}
          placeholder="e.g., Local tech company for internships, University CS department, Regional robotics club..."
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        />
      </div>

      {/* State Requirements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          State CS Requirements
        </label>
        <div className="grid grid-cols-2 gap-2">
          {STATE_REQUIREMENT_OPTIONS.map((option) => {
            const isSelected = profile.stateRequirements === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => updateProfile({ stateRequirements: option.value })}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-slate-600 bg-slate-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900 text-sm">{option.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Align to State Standards */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={profile.alignToStateStandards ?? true}
            onChange={(e) => updateProfile({ alignToStateStandards: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500"
          />
          <div>
            <span className="font-medium text-gray-900">Align to state CS standards</span>
            <p className="text-sm text-gray-500">
              Include state-specific standards mapping in your plan (CSTA alignment is always included)
            </p>
          </div>
        </label>
      </div>

      {/* Pathway preview */}
      {selectedPathways.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <div className="text-sm text-purple-800">
              <strong>Selected Pathways:</strong> {selectedPathways.map(p => PATHWAYS.find(pw => pw.value === p)?.label).join(', ')}
              <p className="mt-1">
                Your plan will include K-12 progression recommendations for each pathway, with specific curricula,
                activities, and courses at each grade band.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
