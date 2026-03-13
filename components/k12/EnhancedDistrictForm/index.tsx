'use client';

import React, { useState, useCallback } from 'react';
import { EnhancedDistrictProfile } from '@/lib/export/templates';
import Step1Overview from './Step1Overview';
import Step2Structure from './Step2Structure';
import Step3CurrentState from './Step3CurrentState';
import Step4Technology from './Step4Technology';
import Step5Culture from './Step5Culture';
import Step6Goals from './Step6Goals';
import Step7Pathways from './Step7Pathways';
import Step8Funding from './Step8Funding';

const TOTAL_STEPS = 8;

const STEP_TITLES = [
  'District Overview',
  'School Structure',
  'Current CS Landscape',
  'Technology',
  'Culture & Initiatives',
  'Goals & Constraints',
  'Pathways',
  'Funding & Partnerships',
];

interface EnhancedDistrictFormProps {
  initialProfile?: Partial<EnhancedDistrictProfile>;
  onComplete: (profile: EnhancedDistrictProfile) => void;
  onCancel?: () => void;
}

// Default values for a new profile
const getDefaultProfile = (): Partial<EnhancedDistrictProfile> => ({
  schoolName: '',
  city: '',
  state: '',
  gradeLevels: [],
  implementationTimeline: 'exploring',
  subjectsTaught: [],
  teacherCounts: {
    elementary: '0',
    middle: '0',
    high: '0',
  },
  otherStaff: [],
  currentCSStatus: 'none',
  existingActivities: [],
  previousPD: [],
  deviceAvailability: 'limited',
  deviceTypes: [],
  internetReliability: 'moderate',
  existingInitiatives: [],
  cultureCharacteristics: [],
  existingPartnerships: '',
  budget: 'none',
  primaryGoals: [],
  challenges: [],
  pathways: [],
  wantFeederPathways: false,
  industryPartners: '',
  stateRequirements: 'notSure',
  alignToStateStandards: true,
  currentFundingSources: [],
  grantInterest: [],
  seekingPartnerships: false,
  partnershipTypes: [],
  partnershipGoals: [],
  existingCommunityConnections: '',
});

export default function EnhancedDistrictForm({
  initialProfile,
  onComplete,
  onCancel,
}: EnhancedDistrictFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<Partial<EnhancedDistrictProfile>>({
    ...getDefaultProfile(),
    ...initialProfile,
  });

  // Update profile data from any step
  const updateProfile = useCallback(
    (updates: Partial<EnhancedDistrictProfile>) => {
      setProfile((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleComplete = useCallback(() => {
    // Generate an ID if not present
    const completeProfile: EnhancedDistrictProfile = {
      id: profile.id || crypto.randomUUID(),
      schoolName: profile.schoolName || '',
      city: profile.city || '',
      state: profile.state || '',
      gradeLevels: profile.gradeLevels || [],
      implementationTimeline: profile.implementationTimeline || 'exploring',
      subjectsTaught: profile.subjectsTaught || [],
      teacherCounts: profile.teacherCounts || {
        elementary: '0',
        middle: '0',
        high: '0',
      },
      otherStaff: profile.otherStaff || [],
      currentCSStatus: profile.currentCSStatus || 'none',
      existingActivities: profile.existingActivities || [],
      previousPD: profile.previousPD || [],
      deviceAvailability: profile.deviceAvailability || 'limited',
      deviceTypes: profile.deviceTypes || [],
      internetReliability: profile.internetReliability || 'moderate',
      existingInitiatives: profile.existingInitiatives || [],
      cultureCharacteristics: profile.cultureCharacteristics || [],
      existingPartnerships: profile.existingPartnerships,
      budget: profile.budget || 'none',
      primaryGoals: profile.primaryGoals || [],
      challenges: profile.challenges || [],
      pathways: profile.pathways || [],
      wantFeederPathways: profile.wantFeederPathways || false,
      industryPartners: profile.industryPartners,
      stateRequirements: profile.stateRequirements || 'notSure',
      alignToStateStandards: profile.alignToStateStandards ?? true,
      currentFundingSources: profile.currentFundingSources || [],
      grantInterest: profile.grantInterest || [],
      seekingPartnerships: profile.seekingPartnerships || false,
      partnershipTypes: profile.partnershipTypes || [],
      partnershipGoals: profile.partnershipGoals || [],
      existingCommunityConnections: profile.existingCommunityConnections,
      createdAt: profile.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onComplete(completeProfile);
  }, [profile, onComplete]);

  // Step validation - determines if user can proceed
  const canProceed = useCallback((): boolean => {
    switch (currentStep) {
      case 1:
        // Require school name, state, and at least one grade level
        return !!(
          profile.schoolName?.trim() &&
          profile.state &&
          profile.gradeLevels &&
          profile.gradeLevels.length > 0
        );
      case 2:
        // Structure step - require at least one subject
        return !!(profile.subjectsTaught && profile.subjectsTaught.length > 0);
      case 3:
        // Current state - require CS status selection
        return !!profile.currentCSStatus;
      case 4:
        // Technology - require device availability
        return !!profile.deviceAvailability;
      case 5:
        // Culture - optional, always can proceed
        return true;
      case 6:
        // Goals - require at least one goal
        return !!(profile.primaryGoals && profile.primaryGoals.length > 0);
      case 7:
        // Pathways - require at least one pathway
        return !!(profile.pathways && profile.pathways.length > 0);
      case 8:
        // Funding - optional, always can proceed
        return true;
      default:
        return true;
    }
  }, [currentStep, profile]);

  // Render progress indicator
  const renderProgressIndicator = () => (
    <div className="mb-8">
      {/* Step counter */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">
          Step {currentStep} of {TOTAL_STEPS}
        </span>
        <span className="text-sm font-medium text-slate-700">
          {STEP_TITLES[currentStep - 1]}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-slate-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="flex justify-between mt-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index + 1 <= currentStep ? 'bg-slate-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );

  // Render current step content
  const renderStepContent = () => {
    const commonProps = {
      profile,
      updateProfile,
    };

    switch (currentStep) {
      case 1:
        return <Step1Overview {...commonProps} />;
      case 2:
        return <Step2Structure {...commonProps} />;
      case 3:
        return <Step3CurrentState {...commonProps} />;
      case 4:
        return <Step4Technology {...commonProps} />;
      case 5:
        return <Step5Culture {...commonProps} />;
      case 6:
        return <Step6Goals {...commonProps} />;
      case 7:
        return <Step7Pathways {...commonProps} />;
      case 8:
        return <Step8Funding {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      {renderProgressIndicator()}

      {/* Step content */}
      <div className="min-h-[400px]">{renderStepContent()}</div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <div>
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back
            </button>
          ) : onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          ) : null}
        </div>

        <div>
          {currentStep < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                canProceed()
                  ? 'bg-slate-600 text-white hover:bg-slate-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              disabled={!canProceed()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                canProceed()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Generate Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
