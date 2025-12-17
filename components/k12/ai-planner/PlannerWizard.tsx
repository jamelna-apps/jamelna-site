'use client';

import { useState, useCallback, useEffect } from 'react';
import { EnhancedDistrictProfile } from '@/lib/export/templates';
import EnhancedDistrictForm from '@/components/k12/EnhancedDistrictForm';
import { EnhancedProfileReviewStep } from './EnhancedProfileReviewStep';
import { AIChatPanel } from './AIChatPanel';
import { PlanViewer } from './PlanViewer';
import { PlanExporter } from './PlanExporter';

// Re-export for backward compatibility
export type DistrictProfile = EnhancedDistrictProfile;

interface Plan {
  id: string;
  title: string;
  version?: number;
  executiveSummary?: string;
  rawContent?: string;
  scopeSequence?: Array<{
    gradeLevel: string;
    competencies: string[];
    instructionTime: string;
    curricula: string[];
    standards: string[];
  }>;
  curriculumRecommendations?: Array<{
    name: string;
    provider: string;
    gradeLevels: string[];
    features: string[];
    resources: string;
    rationale: string;
  }>;
  implementationRoadmap?: Array<{
    phase: string;
    title: string;
    priorities: string[];
  }>;
  professionalDevelopment?: {
    essential?: string[];
    certifications?: string[];
    support?: string[];
  };
  successMetrics?: {
    measurements?: string[];
    milestones?: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

type WizardStep = 'profile' | 'review' | 'generate' | 'refine' | 'export';

interface WizardStepConfig {
  id: WizardStep;
  title: string;
  description: string;
}

interface PlannerWizardProps {
  initialProfile?: EnhancedDistrictProfile;
  locale?: string;
  labels?: {
    stepProfile: string;
    stepReview: string;
    stepGenerate: string;
    stepRefine: string;
    stepExport: string;
    stepProfileDesc: string;
    stepReviewDesc: string;
    stepGenerateDesc: string;
    stepRefineDesc: string;
    stepExportDesc: string;
    next: string;
    back: string;
    generating: string;
    generatingDesc: string;
    startOver: string;
  };
  onComplete?: (plan: Plan) => void;
}

const DEFAULT_LABELS = {
  stepProfile: 'District Profile',
  stepReview: 'Review',
  stepGenerate: 'Generate Plan',
  stepRefine: 'Refine',
  stepExport: 'Export',
  stepProfileDesc: 'Tell us about your district',
  stepReviewDesc: 'Confirm your information',
  stepGenerateDesc: 'AI creates your plan',
  stepRefineDesc: 'Chat to customize',
  stepExportDesc: 'Download your plan',
  next: 'Next',
  back: 'Back',
  generating: 'Generating Your Plan',
  generatingDesc: 'Our AI is creating a comprehensive K-12 CS education plan tailored to your district...',
  startOver: 'Start Over',
};

export function PlannerWizard({
  initialProfile,
  locale = 'en',
  labels = DEFAULT_LABELS,
  onComplete,
}: PlannerWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>(
    initialProfile ? 'review' : 'profile'
  );
  const [districtProfile, setDistrictProfile] = useState<EnhancedDistrictProfile | undefined>(
    initialProfile
  );
  const [plan, setPlan] = useState<Plan | null>(null);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mergedLabels = { ...DEFAULT_LABELS, ...labels };

  const steps: WizardStepConfig[] = [
    { id: 'profile', title: mergedLabels.stepProfile, description: mergedLabels.stepProfileDesc },
    { id: 'review', title: mergedLabels.stepReview, description: mergedLabels.stepReviewDesc },
    { id: 'generate', title: mergedLabels.stepGenerate, description: mergedLabels.stepGenerateDesc },
    { id: 'refine', title: mergedLabels.stepRefine, description: mergedLabels.stepRefineDesc },
    { id: 'export', title: mergedLabels.stepExport, description: mergedLabels.stepExportDesc },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  // Progress bar simulation during generation
  useEffect(() => {
    if (isGenerating && generationProgress < 90) {
      const timer = setTimeout(() => {
        setGenerationProgress((prev) => Math.min(prev + Math.random() * 10, 90));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, generationProgress]);

  // Handler for when the enhanced form is completed
  const handleProfileComplete = useCallback(async (profile: EnhancedDistrictProfile) => {
    setError(null);
    try {
      // Save the profile to the API
      const response = await fetch('/api/districts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const result = await response.json();
      const savedProfile = {
        ...profile,
        id: result.data?.id || profile.id,
      };

      setDistrictProfile(savedProfile);
      setCurrentStep('review');
    } catch (err) {
      console.error('Failed to save profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    }
  }, []);

  const handleGeneratePlan = useCallback(async () => {
    if (!districtProfile) return;

    setIsGenerating(true);
    setGenerationProgress(0);
    setError(null);
    setCurrentStep('generate');

    try {
      const response = await fetch('/api/ai/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          districtProfile,
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';
      let generatedPlan: Plan | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6);
            if (jsonStr === '[DONE]') continue;

            try {
              const event = JSON.parse(jsonStr);
              if (event.type === 'complete' && event.plan) {
                generatedPlan = event.plan;
                setGenerationProgress(100);
              } else if (event.type === 'content') {
                // Update progress during streaming
                setGenerationProgress((prev) => Math.min(prev + 2, 90));
              } else if (event.type === 'error') {
                throw new Error(event.error);
              }
            } catch (e) {
              if (e instanceof SyntaxError) continue;
              throw e;
            }
          }
        }
      }

      if (generatedPlan) {
        setPlan(generatedPlan);
        setCurrentStep('refine');
        onComplete?.(generatedPlan);
      } else {
        throw new Error('No plan received from AI');
      }
    } catch (err) {
      console.error('Plan generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate plan');
      setCurrentStep('review');
    } finally {
      setIsGenerating(false);
    }
  }, [districtProfile, locale, onComplete]);

  const handleConversationCreated = useCallback((id: string) => {
    setConversationId(id);
  }, []);

  const handleExport = useCallback(async (format: 'pdf' | 'markdown') => {
    if (!plan) return;

    try {
      const response = await fetch(`/api/plans/${plan.id}/export?format=${format}`);
      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${plan.title.replace(/\s+/g, '-').toLowerCase()}.${format === 'pdf' ? 'pdf' : 'md'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export error:', err);
      setError('Failed to export plan');
    }
  }, [plan]);

  const handleStartOver = () => {
    setDistrictProfile(undefined);
    setPlan(null);
    setConversationId(undefined);
    setCurrentStep('profile');
    setError(null);
  };

  const canGoBack = currentStepIndex > 0 && !isGenerating;
  const canGoNext = currentStepIndex < steps.length - 1 && !isGenerating;

  const goBack = () => {
    if (canGoBack) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const goNext = () => {
    if (canGoNext) {
      const nextStep = steps[currentStepIndex + 1].id;
      if (nextStep === 'generate' && !plan) {
        handleGeneratePlan();
      } else {
        setCurrentStep(nextStep);
      }
    }
  };

  // Get icon for each step
  const getStepIcon = (stepId: WizardStep, isCompleted: boolean) => {
    if (isCompleted) {
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }

    const icons: Record<WizardStep, React.ReactNode> = {
      profile: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      review: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      generate: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      refine: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      export: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
    };
    return icons[stepId];
  };

  return (
    <div className="min-h-screen bg-deep">
      {/* Progress Steps - Clean Modern Design */}
      <div className="bg-deep-card border-b border-deep-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Minimal Stepper */}
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = index < currentStepIndex;
              const isAccessible = index <= currentStepIndex || (plan && index === steps.length - 1);

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => isAccessible && !isGenerating && setCurrentStep(step.id)}
                    disabled={!isAccessible || isGenerating}
                    className={`group flex flex-col items-center ${
                      isAccessible && !isGenerating ? 'cursor-pointer' : 'cursor-not-allowed'
                    }`}
                  >
                    {/* Step Circle */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? 'bg-warm text-white shadow-lg scale-110'
                          : isCompleted
                          ? 'bg-highlight-green text-white'
                          : 'bg-deep-alt text-text-muted'
                      } ${isAccessible && !isGenerating && !isActive ? 'group-hover:bg-deep-border' : ''}`}
                    >
                      {getStepIcon(step.id, isCompleted)}
                    </div>
                    {/* Step Label - Only show on md+ screens */}
                    <span
                      className={`hidden md:block mt-2 text-xs font-medium transition-colors ${
                        isActive
                          ? 'text-warm'
                          : isCompleted
                          ? 'text-highlight-green'
                          : 'text-text-muted'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 md:w-20 h-0.5 mx-1 md:mx-2 transition-colors ${
                        index < currentStepIndex
                          ? 'bg-highlight-green'
                          : 'bg-deep-border'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Step Info - Clean single line below */}
          <div className="mt-4 text-center">
            <p className="text-sm text-text-secondary">
              <span className="font-medium text-text-heading">
                Step {currentStepIndex + 1}:
              </span>{' '}
              {steps[currentStepIndex]?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <div className="bg-highlight-red/10 border border-highlight-red/30 rounded-lg p-4">
            <p className="text-highlight-red">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm text-highlight-red/70 hover:text-highlight-red"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Step - Enhanced multi-step form */}
        {currentStep === 'profile' && !districtProfile && (
          <div className="max-w-3xl mx-auto">
            <EnhancedDistrictForm
              onComplete={handleProfileComplete}
            />
          </div>
        )}

        {/* Review Step */}
        {currentStep === 'review' && districtProfile && (
          <EnhancedProfileReviewStep
            profile={districtProfile}
            onConfirm={handleGeneratePlan}
            onEdit={() => setCurrentStep('profile')}
          />
        )}

        {/* Generate Step */}
        {currentStep === 'generate' && isGenerating && (
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-warm/20 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-warm animate-pulse"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-heading mb-2">
                {mergedLabels.generating}
              </h2>
              <p className="text-text-secondary">
                {mergedLabels.generatingDesc}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-deep-alt rounded-full h-2 overflow-hidden">
              <div
                className="bg-warm h-full rounded-full transition-all duration-500"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
            <p className="text-sm text-text-muted mt-2">
              {Math.round(generationProgress)}% complete
            </p>
          </div>
        )}

        {/* Refine Step */}
        {currentStep === 'refine' && plan && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Plan Preview */}
            <div className="order-2 lg:order-1">
              <PlanViewer
                plan={plan}
                showRawContent={true}
                onExport={handleExport}
              />
            </div>

            {/* Chat Panel */}
            <div className="order-1 lg:order-2 h-[600px]">
              <AIChatPanel
                districtProfile={districtProfile}
                conversationId={conversationId}
                locale={locale}
                onConversationCreated={handleConversationCreated}
              />
            </div>
          </div>
        )}

        {/* Export Step */}
        {currentStep === 'export' && plan && (
          <PlanExporter
            plan={plan}
            districtProfile={districtProfile}
            onExport={handleExport}
          />
        )}
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-deep-card border-t border-deep-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            {currentStep !== 'profile' && (
              <button
                onClick={handleStartOver}
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                {mergedLabels.startOver}
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={goBack}
              disabled={!canGoBack}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                canGoBack
                  ? 'border-deep-border text-text-secondary hover:bg-deep-alt'
                  : 'border-deep-border/50 text-text-muted cursor-not-allowed'
              }`}
            >
              {mergedLabels.back}
            </button>
            {currentStep !== 'export' && (
              <button
                onClick={goNext}
                disabled={!canGoNext || (currentStep === 'review' && !districtProfile)}
                className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                  canGoNext && (currentStep !== 'review' || districtProfile)
                    ? 'btn-warm'
                    : 'bg-deep-alt text-text-muted cursor-not-allowed'
                }`}
              >
                {currentStep === 'review' ? 'Generate Plan' : mergedLabels.next}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
