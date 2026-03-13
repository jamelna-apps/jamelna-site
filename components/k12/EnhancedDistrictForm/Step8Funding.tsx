'use client';

import React from 'react';
import {
  EnhancedDistrictProfile,
  FundingSource,
  GrantInterest,
  PartnershipType,
  PartnershipGoal,
} from '@/lib/export/templates';

const FUNDING_SOURCES: { value: FundingSource; label: string }[] = [
  { value: 'districtBudget', label: 'District Budget' },
  { value: 'ptoFundraising', label: 'PTO/PTA Fundraising' },
  { value: 'localBusinessSponsors', label: 'Local Business Sponsors' },
  { value: 'corporateGrants', label: 'Corporate Grants' },
  { value: 'federalGrants', label: 'Federal Grants' },
  { value: 'stateGrants', label: 'State Grants' },
  { value: 'foundationGrants', label: 'Foundation Grants' },
  { value: 'crowdfunding', label: 'Crowdfunding (DonorsChoose, etc.)' },
];

const GRANT_INTERESTS: { value: GrantInterest; label: string; description: string }[] = [
  {
    value: 'nsf',
    label: 'NSF (National Science Foundation)',
    description: 'Federal grants for STEM/CS education innovation',
  },
  {
    value: 'doe',
    label: 'Dept. of Education',
    description: 'Federal Title funds, ESSER, and education grants',
  },
  {
    value: 'googleOrg',
    label: 'Google.org / CS Education Grants',
    description: 'Google CS education initiatives and funding',
  },
  {
    value: 'amazonFuture',
    label: 'Amazon Future Engineer',
    description: 'CS education resources and scholarships',
  },
  {
    value: 'microsoftPhilanthropies',
    label: 'Microsoft Philanthropies',
    description: 'TEALS program and CS education support',
  },
  {
    value: 'codeOrg',
    label: 'Code.org District Partnership',
    description: 'Free curricula, PD, and regional partner support',
  },
  {
    value: 'stateSTEM',
    label: 'State STEM Grants',
    description: 'State-level STEM education funding',
  },
  {
    value: 'localFoundations',
    label: 'Local Community Foundations',
    description: 'Regional and community-based funding',
  },
];

const PARTNERSHIP_TYPES: { value: PartnershipType; label: string }[] = [
  { value: 'localUniversities', label: 'Local Universities' },
  { value: 'communityColleges', label: 'Community Colleges' },
  { value: 'techCompanies', label: 'Tech Companies' },
  { value: 'localBusinesses', label: 'Local Businesses' },
  { value: 'nonprofits', label: 'Nonprofits (CS orgs, education)' },
  { value: 'libraries', label: 'Public Libraries' },
  { value: 'museums', label: 'Science/Tech Museums' },
  { value: 'governmentAgencies', label: 'Government Agencies' },
  { value: 'communityOrganizations', label: 'Community Organizations' },
];

const PARTNERSHIP_GOALS: { value: PartnershipGoal; label: string; icon: string }[] = [
  { value: 'mentorship', label: 'Student Mentorship', icon: '👥' },
  { value: 'internships', label: 'Internship Opportunities', icon: '💼' },
  { value: 'guestSpeakers', label: 'Guest Speakers', icon: '🎤' },
  { value: 'equipmentDonations', label: 'Equipment Donations', icon: '🖥️' },
  { value: 'funding', label: 'Financial Support', icon: '💵' },
  { value: 'curriculum', label: 'Curriculum Development', icon: '📚' },
  { value: 'facilitiesAccess', label: 'Facilities/Lab Access', icon: '🏢' },
  { value: 'afterSchoolPrograms', label: 'After-School Programs', icon: '🏫' },
];

interface Step8FundingProps {
  profile: Partial<EnhancedDistrictProfile>;
  updateProfile: (updates: Partial<EnhancedDistrictProfile>) => void;
}

export default function Step8Funding({ profile, updateProfile }: Step8FundingProps) {
  const toggleFundingSource = (source: FundingSource) => {
    const current = profile.currentFundingSources || [];
    const updated = current.includes(source)
      ? current.filter((s) => s !== source)
      : [...current, source];
    updateProfile({ currentFundingSources: updated });
  };

  const toggleGrantInterest = (grant: GrantInterest) => {
    const current = profile.grantInterest || [];
    const updated = current.includes(grant)
      ? current.filter((g) => g !== grant)
      : [...current, grant];
    updateProfile({ grantInterest: updated });
  };

  const togglePartnershipType = (type: PartnershipType) => {
    const current = profile.partnershipTypes || [];
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    updateProfile({ partnershipTypes: updated });
  };

  const togglePartnershipGoal = (goal: PartnershipGoal) => {
    const current = profile.partnershipGoals || [];
    const updated = current.includes(goal)
      ? current.filter((g) => g !== goal)
      : [...current, goal];
    updateProfile({ partnershipGoals: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Funding & Partnerships
        </h2>
        <p className="text-gray-600">
          Tell us about funding interests and partnership goals. We&apos;ll include relevant opportunities and connection strategies in your plan.
        </p>
      </div>

      {/* Current Funding Sources */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Funding Sources
        </label>
        <p className="text-xs text-gray-500 mb-3">
          How is your school currently funded? Select all that apply.
        </p>
        <div className="flex flex-wrap gap-2">
          {FUNDING_SOURCES.map((source) => {
            const isSelected = profile.currentFundingSources?.includes(source.value);
            return (
              <button
                key={source.value}
                type="button"
                onClick={() => toggleFundingSource(source.value)}
                className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                  isSelected
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {source.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grant Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grant & Funding Opportunities of Interest
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Select funding sources you&apos;d like guidance on applying for.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {GRANT_INTERESTS.map((grant) => {
            const isSelected = profile.grantInterest?.includes(grant.value);
            return (
              <button
                key={grant.value}
                type="button"
                onClick={() => toggleGrantInterest(grant.value)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected ? 'border-green-500 bg-green-500' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{grant.label}</div>
                    <div className="text-xs text-gray-500">{grant.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Partnership Interest Toggle */}
      <div className="bg-gray-50 rounded-lg p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={profile.seekingPartnerships || false}
            onChange={(e) => updateProfile({ seekingPartnerships: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500"
          />
          <div>
            <span className="font-medium text-gray-900">Include partnership recommendations</span>
            <p className="text-sm text-gray-500">
              Get guidance on building partnerships with local organizations to support your CS program
            </p>
          </div>
        </label>
      </div>

      {/* Partnership Details - only show if seeking partnerships */}
      {profile.seekingPartnerships && (
        <>
          {/* Partnership Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Types of Partners You&apos;re Seeking
            </label>
            <div className="flex flex-wrap gap-2">
              {PARTNERSHIP_TYPES.map((type) => {
                const isSelected = profile.partnershipTypes?.includes(type.value);
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => togglePartnershipType(type.value)}
                    className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Partnership Goals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What You&apos;re Looking For From Partners
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {PARTNERSHIP_GOALS.map((goal) => {
                const isSelected = profile.partnershipGoals?.includes(goal.value);
                return (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => togglePartnershipGoal(goal.value)}
                    className={`p-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl">{goal.icon}</span>
                      <div className="text-sm font-medium text-gray-900 mt-1">{goal.label}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Existing Community Connections */}
          <div>
            <label htmlFor="communityConnections" className="block text-sm font-medium text-gray-700 mb-1">
              Existing Community Connections (Optional)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Any organizations you already have relationships with that could support CS.
            </p>
            <textarea
              id="communityConnections"
              value={profile.existingCommunityConnections || ''}
              onChange={(e) => updateProfile({ existingCommunityConnections: e.target.value })}
              placeholder="e.g., Local tech meetup group, University alumni network, Chamber of Commerce, Rotary Club..."
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>
        </>
      )}

      {/* Summary of what they'll receive */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-emerald-800">
            <strong>Your plan will include:</strong>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              {(profile.grantInterest?.length ?? 0) > 0 && (
                <li>Grant application guidance and deadlines for {profile.grantInterest?.length} funding sources</li>
              )}
              {profile.seekingPartnerships && (
                <li>Partnership development strategies and outreach templates</li>
              )}
              <li>Budget planning recommendations based on your funding situation</li>
              <li>Sustainability strategies for long-term program funding</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
