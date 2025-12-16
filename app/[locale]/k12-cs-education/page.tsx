'use client';

import React, { useState, useCallback } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { useTranslations } from 'next-intl';
import CurriculumGrid from '@/components/k12/CurriculumGrid';
import DistrictProfileForm from '@/components/k12/DistrictProfileForm';
import { PlannerWizard } from '@/components/k12/ai-planner/PlannerWizard';
import { EnhancedDistrictProfile } from '@/lib/export/templates';
import { curricula, GradeLevel, Topic } from '@/data/curricula';
import { Pathway } from '@/components/k12/PathwaySelector';

export default function K12CSEducation() {
  const t = useTranslations('k12CSEducation');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [savedProfile, setSavedProfile] = useState<EnhancedDistrictProfile | null>(null);
  const [showWizard, setShowWizard] = useState(false);

  const handleProfileSaved = useCallback(async (profileId: string) => {
    // Fetch the saved profile to get the full data
    try {
      const response = await fetch(`/api/districts/${profileId}`);
      if (response.ok) {
        const { data } = await response.json();
        // Convert legacy profile to enhanced format if needed
        const enhancedProfile: EnhancedDistrictProfile = {
          id: data.id,
          schoolName: data.schoolName,
          city: data.city || '',
          state: data.state,
          gradeLevels: data.gradeLevels || [],
          implementationTimeline: data.implementationTimeline || 'exploring',
          subjectsTaught: data.subjectsTaught || [],
          teacherCounts: data.teacherCounts || { elementary: '0', middle: '0', high: '0' },
          otherStaff: data.otherStaff || [],
          currentCSStatus: data.currentCSStatus || 'none',
          existingActivities: data.existingActivities || [],
          previousPD: data.previousPD || [],
          deviceAvailability: data.deviceAvailability || 'limited',
          deviceTypes: data.deviceTypes || [],
          internetReliability: data.internetReliability || 'moderate',
          existingInitiatives: data.existingInitiatives || [],
          cultureCharacteristics: data.cultureCharacteristics || [],
          existingPartnerships: data.existingPartnerships || null,
          budget: data.budget || 'none',
          primaryGoals: data.primaryGoals || [],
          challenges: data.challenges || [],
          pathways: data.pathways || [],
          wantFeederPathways: data.wantFeederPathways || false,
          industryPartners: data.industryPartners || null,
          stateRequirements: data.stateRequirements || 'notSure',
          alignToStateStandards: data.alignToStateStandards ?? true,
          currentFundingSources: data.currentFundingSources || [],
          grantInterest: data.grantInterest || [],
          seekingPartnerships: data.seekingPartnerships || false,
          partnershipTypes: data.partnershipTypes || [],
          partnershipGoals: data.partnershipGoals || [],
          existingCommunityConnections: data.existingCommunityConnections || null,
        };
        setSavedProfile(enhancedProfile);
        setShowWizard(true);
        // Scroll to top when wizard is shown
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Failed to load saved profile:', error);
    }
  }, []);

  const handleWizardClose = useCallback(() => {
    setShowWizard(false);
    setSavedProfile(null);
  }, []);

  const gradeLevelLabels: Record<GradeLevel, string> = {
    elementary: t('gradeLevels.elementary'),
    middle: t('gradeLevels.middle'),
    high: t('gradeLevels.high'),
    all: t('gradeLevels.all'),
  };

  const topicLabels: Record<Topic, string> = {
    cs: t('topics.cs'),
    ct: t('topics.ct'),
    ai: t('topics.ai'),
    cybersecurity: t('topics.cybersecurity'),
    robotics: t('topics.robotics'),
    data: t('topics.data'),
    web: t('topics.web'),
  };

  const pathwayLabels: Record<Pathway, string> = {
    robotics: t('pathways.robotics'),
    cybersecurity: t('pathways.cybersecurity'),
    ai: t('pathways.ai'),
    dataScience: t('pathways.dataScience'),
    webDev: t('pathways.webDev'),
    gameDev: t('pathways.gameDev'),
  };

  const formLabels = {
    title: t('profile.title'),
    description: t('profile.description'),
    schoolName: t('profile.schoolName'),
    schoolNamePlaceholder: t('profile.schoolNamePlaceholder'),
    city: t('profile.city'),
    cityPlaceholder: t('profile.cityPlaceholder'),
    state: t('profile.state'),
    statePlaceholder: t('profile.statePlaceholder'),
    gradeLevels: t('profile.gradeLevelsLabel'),
    currentOfferings: t('profile.currentOfferings'),
    currentOfferingsPlaceholder: t('profile.currentOfferingsPlaceholder'),
    pathways: t('profile.pathwaysLabel'),
    resources: t('profile.resources'),
    resourcesPlaceholder: t('profile.resourcesPlaceholder'),
    submit: t('profile.submit'),
    successTitle: t('profile.successTitle'),
    successMessage: t('profile.successMessage'),
    pathwayLabels,
    gradeLevelOptions: {
      elementary: gradeLevelLabels.elementary,
      middle: gradeLevelLabels.middle,
      high: gradeLevelLabels.high,
    },
  };

  const sectionLinks: { id: string; label: string; href?: string }[] = [
    { id: 'curriculum', label: t('sectionNav.curriculum') },
    { id: 'district-profile', label: t('sectionNav.districtProfile') },
    { id: 'ai-planner', label: t('sectionNav.aiPlanner'), href: '/en/k12-cs-education/ai-planner' },
    { id: 'why-use', label: t('sectionNav.whyUse') },
    { id: 'standards', label: t('sectionNav.standards') },
    { id: 'faq', label: t('sectionNav.faq') },
  ];

  // If wizard is active, show it instead of the regular page
  if (showWizard && savedProfile) {
    return (
      <div className="relative">
        {/* Close button */}
        <button
          onClick={handleWizardClose}
          className="fixed top-4 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close wizard"
        >
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <PlannerWizard
          initialProfile={savedProfile}
          locale="en"
        />
      </div>
    );
  }

  return (
    <PageWrapper>
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          {t('subtitle')}
        </p>
        <p className="text-gray-500">
          {t('targetAudience')}
        </p>
      </div>

      {/* Section Navigation */}
      <nav className="mb-16 sticky top-0 bg-white/95 backdrop-blur-sm py-4 -mx-4 px-4 border-b border-gray-200 z-10">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {sectionLinks.map((link) => (
            <a
              key={link.id}
              href={link.href || `#${link.id}`}
              className={
                link.id === 'ai-planner'
                  ? 'px-3 py-1.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-colors inline-flex items-center gap-1'
                  : 'px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors'
              }
            >
              {link.id === 'ai-planner' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              )}
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Curriculum Repository Section */}
      <section id="curriculum" className="mb-20 scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('repository.title')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('repository.description')}
        </p>
        <CurriculumGrid
          curricula={curricula}
          gradeLevelLabels={gradeLevelLabels}
          topicLabels={topicLabels}
          filterLabel={t('repository.filterLabel')}
          allGradesLabel={t('gradeLevels.all')}
          allTopicsLabel={t('topics.all')}
          gradeLevelFilterLabel={t('repository.gradeLevelFilter')}
          topicFilterLabel={t('repository.topicFilter')}
        />
      </section>

      {/* District Profile Form Section */}
      <section id="district-profile" className="mb-20 scroll-mt-20">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('profile.title')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('profile.description')}
          </p>
          <DistrictProfileForm
            labels={formLabels}
            onProfileSaved={handleProfileSaved}
          />
        </div>
      </section>

      {/* Value Propositions */}
      <section id="why-use" className="mb-20 scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {t('valueProps.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('valueProps.allFree.title')}</h3>
            <p className="text-sm text-gray-600">{t('valueProps.allFree.description')}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">✅</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('valueProps.vetted.title')}</h3>
            <p className="text-sm text-gray-600">{t('valueProps.vetted.description')}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('valueProps.aligned.title')}</h3>
            <p className="text-sm text-gray-600">{t('valueProps.aligned.description')}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('valueProps.comprehensive.title')}</h3>
            <p className="text-sm text-gray-600">{t('valueProps.comprehensive.description')}</p>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section id="standards" className="mb-20 scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('standards.title')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('standards.description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">{t('standards.csta.title')}</h3>
            <p className="text-sm text-gray-600 mb-4">{t('standards.csta.description')}</p>
            <a
              href="https://csteachers.org/k12standards/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1"
            >
              {t('standards.csta.link')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">{t('standards.states.title')}</h3>
            <p className="text-sm text-gray-600 mb-4">{t('standards.states.description')}</p>
            <a
              href="https://advocacy.code.org/stateofcs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800 text-sm font-medium inline-flex items-center gap-1"
            >
              {t('standards.states.link')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mb-20 scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {t('faq.title')}
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === num ? null : num)}
                className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <span className="font-medium text-gray-900">
                  {t(`faq.q${num}.question`)}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === num ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedFaq === num && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-600">{t(`faq.q${num}.answer`)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
