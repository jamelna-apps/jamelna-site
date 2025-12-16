'use client';

import { EnhancedDistrictProfile } from '@/lib/export/templates';

interface EnhancedProfileReviewStepProps {
  profile: EnhancedDistrictProfile;
  onConfirm: () => void;
  onEdit?: () => void;
}

// Section component for consistent styling - defined outside to avoid recreation
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
        {title}
      </h4>
      {children}
    </div>
  );
}

// Tag component for displaying arrays - defined outside to avoid recreation
function Tag({ children, color = 'gray' }: { children: React.ReactNode; color?: string }) {
  const colorClasses: Record<string, string> = {
    gray: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {children}
    </span>
  );
}

// Label mappings for display
const GRADE_LEVEL_LABELS: Record<string, string> = {
  elementary: 'Elementary (K-5)',
  middle: 'Middle School (6-8)',
  high: 'High School (9-12)',
};

const TIMELINE_LABELS: Record<string, string> = {
  exploring: 'Exploring Options',
  pilot: 'Pilot This Year',
  '1-2years': 'Full Implementation (1-2 Years)',
  '3-5years': 'Full Implementation (3-5 Years)',
};

const CS_STATUS_LABELS: Record<string, string> = {
  none: 'No Formal CS Instruction',
  informal: 'Some Informal Integration',
  someLevels: 'CS at Some Grade Levels',
  comprehensive: 'Comprehensive K-12 Program',
};

const DEVICE_LABELS: Record<string, string> = {
  veryLimited: 'Very Limited',
  limited: 'Limited',
  moderate: 'Moderate',
  strong: 'Strong (1:1)',
};

const BUDGET_LABELS: Record<string, string> = {
  none: 'No Dedicated Budget',
  minimal: '$0-$1,000/year',
  moderate: '$1,000-$10,000/year',
  significant: '$10,000+/year',
};

const PATHWAY_LABELS: Record<string, string> = {
  robotics: 'Robotics & Engineering',
  cybersecurity: 'Cybersecurity',
  ai: 'AI & Machine Learning',
  dataScience: 'Data Science',
  webDev: 'Web Development',
  gameDev: 'Game Development',
  itSupport: 'IT Support',
  digitalMedia: 'Digital Media',
};

const SUBJECT_LABELS: Record<string, string> = {
  mathematics: 'Mathematics',
  science: 'Science',
  ela: 'ELA',
  socialStudies: 'Social Studies',
  art: 'Art',
  music: 'Music',
  pe: 'PE',
  worldLanguages: 'World Languages',
  cte: 'CTE',
  specialEd: 'Special Ed',
  library: 'Library/Media',
};

const INITIATIVE_LABELS: Record<string, string> = {
  stemSteam: 'STEM/STEAM',
  pbl: 'Project-Based Learning',
  makerEd: 'Maker Education',
  designThinking: 'Design Thinking',
  sel: 'Social-Emotional Learning',
  culturallyResponsive: 'Culturally Responsive',
  giftedTalented: 'Gifted & Talented',
  specialEdInclusion: 'Special Ed Inclusion',
  ellSupport: 'ELL Support',
  cte: 'Career Readiness/CTE',
  serviceLearning: 'Service Learning',
  industryMentorship: 'Industry Mentorship',
};

const GOAL_LABELS: Record<string, string> = {
  meetStateRequirements: 'Meet State Requirements',
  prepareForCareers: 'Prepare for Tech Careers',
  computationalThinking: 'Computational Thinking',
  increaseEquity: 'Increase Equity',
  stemPathway: 'STEM Pathway Development',
  enhanceCurriculum: 'Enhance Curriculum',
  competitions: 'Competitions',
};

const GRANT_LABELS: Record<string, string> = {
  nsf: 'NSF',
  doe: 'Dept. of Education',
  googleOrg: 'Google.org',
  amazonFuture: 'Amazon Future Engineer',
  microsoftPhilanthropies: 'Microsoft Philanthropies',
  codeOrg: 'Code.org',
  stateSTEM: 'State STEM Grants',
  localFoundations: 'Local Foundations',
};

export function EnhancedProfileReviewStep({
  profile,
  onConfirm,
  onEdit,
}: EnhancedProfileReviewStepProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-600 to-slate-700 text-white">
          <h2 className="text-2xl font-bold">{profile.schoolName}</h2>
          <p className="text-slate-200 flex items-center gap-2 mt-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {profile.city && `${profile.city}, `}{profile.state}
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-2">
          {/* Basic Info */}
          <Section title="Overview">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Grade Levels</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {profile.gradeLevels.map((level) => (
                    <Tag key={level} color="green">{GRADE_LEVEL_LABELS[level] || level}</Tag>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Timeline</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {TIMELINE_LABELS[profile.implementationTimeline] || profile.implementationTimeline}
                </p>
              </div>
            </div>
          </Section>

          {/* School Structure */}
          <Section title="School Structure">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Subjects Taught</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {profile.subjectsTaught.map((subject) => (
                    <Tag key={subject}>{SUBJECT_LABELS[subject] || subject}</Tag>
                  ))}
                </div>
              </div>
              {profile.otherStaff && profile.otherStaff.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Staff to Include</p>
                  <p className="text-gray-900 dark:text-white">
                    {profile.otherStaff.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </Section>

          {/* Current CS Status */}
          <Section title="Current CS Status">
            <div className="space-y-3">
              <p className="text-gray-900 dark:text-white font-medium">
                {CS_STATUS_LABELS[profile.currentCSStatus] || profile.currentCSStatus}
              </p>
              {profile.existingActivities && profile.existingActivities.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Existing Activities</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.existingActivities.map((activity) => (
                      <Tag key={activity} color="blue">{activity}</Tag>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* Technology */}
          <Section title="Technology Infrastructure">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Device Availability</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {DEVICE_LABELS[profile.deviceAvailability] || profile.deviceAvailability}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Internet</p>
                <p className="text-gray-900 dark:text-white font-medium capitalize">
                  {profile.internetReliability}
                </p>
              </div>
            </div>
            {profile.deviceTypes && profile.deviceTypes.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {profile.deviceTypes.map((device) => (
                    <Tag key={device}>{device}</Tag>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* Initiatives */}
          {profile.existingInitiatives && profile.existingInitiatives.length > 0 && (
            <Section title="Existing Initiatives">
              <div className="flex flex-wrap gap-1">
                {profile.existingInitiatives.map((initiative) => (
                  <Tag key={initiative} color="amber">{INITIATIVE_LABELS[initiative] || initiative}</Tag>
                ))}
              </div>
            </Section>
          )}

          {/* Goals */}
          <Section title="Goals & Budget">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {BUDGET_LABELS[profile.budget] || profile.budget}
                  </p>
                </div>
              </div>
              {profile.primaryGoals && profile.primaryGoals.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Primary Goals</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.primaryGoals.map((goal) => (
                      <Tag key={goal} color="green">{GOAL_LABELS[goal] || goal}</Tag>
                    ))}
                  </div>
                </div>
              )}
              {profile.challenges && profile.challenges.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Challenges</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.challenges.map((challenge) => (
                      <Tag key={challenge}>{challenge}</Tag>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* Pathways */}
          {profile.pathways && profile.pathways.length > 0 && (
            <Section title="Career Pathways">
              <div className="flex flex-wrap gap-1">
                {profile.pathways.map((pathway) => (
                  <Tag key={pathway} color="purple">{PATHWAY_LABELS[pathway] || pathway}</Tag>
                ))}
              </div>
              {profile.wantFeederPathways && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Will include K-8 feeder pathways
                </p>
              )}
            </Section>
          )}

          {/* Funding Interests */}
          {((profile.grantInterest && profile.grantInterest.length > 0) || profile.seekingPartnerships) && (
            <Section title="Funding & Partnerships">
              {profile.grantInterest && profile.grantInterest.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Grant Interests</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.grantInterest.map((grant) => (
                      <Tag key={grant} color="blue">{GRANT_LABELS[grant] || grant}</Tag>
                    ))}
                  </div>
                </div>
              )}
              {profile.seekingPartnerships && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Will include partnership recommendations
                </p>
              )}
            </Section>
          )}
        </div>

        {/* Note */}
        <div className="px-6 py-4 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Click &quot;Generate Plan&quot; to create a comprehensive K-12 CS education plan with subject-specific integration guides, pathway progressions, and implementation recommendations tailored to your profile.
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
              Edit Profile
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Generate Plan
          </button>
        </div>
      </div>
    </div>
  );
}
