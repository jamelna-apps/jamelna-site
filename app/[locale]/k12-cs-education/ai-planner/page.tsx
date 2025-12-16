'use client';

import React from 'react';
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';
import { useTranslations, useLocale } from 'next-intl';
import { PlannerWizard } from '@/components/k12/ai-planner/PlannerWizard';
import SamplePlans from '@/components/k12/ai-planner/SamplePlans';

export default function AIPlannerPage() {
  const t = useTranslations('k12CSEducation.aiPlanner');
  const tProfile = useTranslations('k12CSEducation.profile');
  const locale = useLocale();

  const wizardLabels = {
    stepProfile: tProfile('title'),
    stepReview: 'Review',
    stepGenerate: 'Generate Plan',
    stepRefine: 'Refine',
    stepExport: 'Export',
    stepProfileDesc: tProfile('description'),
    stepReviewDesc: 'Confirm your district information',
    stepGenerateDesc: 'AI creates your customized plan',
    stepRefineDesc: 'Chat to customize and improve',
    stepExportDesc: 'Download your finished plan',
    next: 'Next',
    back: 'Back',
    generating: 'Generating your plan...',
    generatingDesc: 'This may take up to a minute',
    startOver: 'Start Over',
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Wizard Container */}
      <div className="max-w-5xl mx-auto" id="planner">
        <PlannerWizard
          labels={wizardLabels}
          onComplete={(plan) => {
            console.log('Plan complete:', plan);
          }}
        />
      </div>

      {/* Sample Plans Section */}
      <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-16" id="sample-plans">
        <SamplePlans />
      </div>

      {/* Back Link */}
      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/k12-cs-education`}
          className="text-slate-600 hover:text-slate-800 text-sm inline-flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to K-12 CS Education Resources
        </Link>
      </div>
    </PageWrapper>
  );
}
