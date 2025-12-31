'use client';

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import DistrictProfileForm from '@/components/k12/DistrictProfileForm';
import DistrictProfileCollapsed from '@/components/k12/DistrictProfileCollapsed';
import CollapsedCurriculumGrid from '@/components/k12/CollapsedCurriculumGrid';
import { PlannerWizard } from '@/components/k12/ai-planner/PlannerWizard';
import { EnhancedDistrictProfile } from '@/lib/export/templates';
import { curricula, GradeLevel, Topic } from '@/data/curricula';
import { Pathway } from '@/components/k12/PathwaySelector';

export default function K12CSEducation() {
  const t = useTranslations('k12CSEducation');
  const locale = useLocale();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [savedProfile, setSavedProfile] = useState<EnhancedDistrictProfile | null>(null);
  const [showWizard, setShowWizard] = useState(false);

  const handleProfileSaved = useCallback(async (profileId: string) => {
    try {
      const response = await fetch(`/api/districts/${profileId}`);
      if (response.ok) {
        const { data } = await response.json();
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

  if (showWizard && savedProfile) {
    return (
      <div className="relative">
        <button
          onClick={handleWizardClose}
          className="fixed top-4 right-4 z-50 p-2 bg-zinc-800 rounded-full shadow-lg hover:bg-zinc-700 transition-colors"
          aria-label="Close wizard"
        >
          <svg className="w-6 h-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <PlannerWizard initialProfile={savedProfile} locale="en" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-zinc-900 to-zinc-950"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4), transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(251, 146, 60, 0.3), transparent)' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            <span className="text-orange-400">/</span> {t('title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          <p className="text-lg text-zinc-500 mb-10 max-w-2xl mx-auto">
            {t('targetAudience')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#curriculum" className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-400 transition-colors">
              {t('hero.ctaPrimary') || 'Explore Curricula'}
            </a>
            <Link
              href={`/${locale}/k12-cs-education/ai-planner`}
              className="border border-orange-500/50 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-500/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              {t('hero.ctaSecondary') || 'AI Implementation Planner'}
            </Link>
          </div>
        </div>
      </section>

      {/* Implementation Tools Section */}
      <section id="implementation" className="py-20 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            {t('implementation.title') || 'Implementation Support'}
          </h2>
          <p className="text-lg text-zinc-300 text-center max-w-3xl mx-auto mb-12">
            {t('implementation.description') || 'Get personalized guidance for bringing CS education to your school or district.'}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href={`/${locale}/k12-cs-education/ai-planner`}
              className="group bg-zinc-800 border border-orange-500/30 rounded-xl p-8 hover:border-orange-500/60 transition-all hover:shadow-lg hover:shadow-orange-500/10"
            >
              <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                {t('aiPlanner.cardTitle') || 'AI Implementation Planner'}
              </h3>
              <p className="text-zinc-300 mb-4">
                {t('aiPlanner.cardDescription') || 'Answer a few questions about your context and get a customized implementation roadmap with curriculum recommendations.'}
              </p>
              <span className="inline-flex items-center text-orange-400 font-medium">
                Start Planning
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            <DistrictProfileCollapsed
              onStartAssessment={() => {
                const section = document.getElementById('district-profile-expanded');
                if (section) {
                  section.classList.remove('hidden');
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              labels={{
                title: t('profile.title'),
                description: t('profile.shortDescription') || 'Complete a brief assessment to receive tailored curriculum and implementation recommendations.',
                button: t('profile.startButton') || 'Start Assessment'
              }}
            />
          </div>
        </div>
      </section>

      {/* Expanded District Profile Form - Hidden by default */}
      <section id="district-profile-expanded" className="hidden py-20 px-4 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{t('profile.title')}</h2>
                <p className="text-zinc-300">{t('profile.description')}</p>
              </div>
              <button
                onClick={() => {
                  const section = document.getElementById('district-profile-expanded');
                  if (section) section.classList.add('hidden');
                }}
                className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                aria-label="Close form"
              >
                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <DistrictProfileForm labels={formLabels} onProfileSaved={handleProfileSaved} />
          </div>
        </div>
      </section>

      {/* Curriculum Repository Section */}
      <section id="curriculum" className="py-20 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">{t('repository.title')}</h2>
          <p className="text-lg text-zinc-300 text-center max-w-3xl mx-auto mb-12">{t('repository.description')}</p>
          <CollapsedCurriculumGrid curricula={curricula} gradeLevelLabels={gradeLevelLabels} topicLabels={topicLabels} />
        </div>
      </section>

      {/* Value Propositions */}
      <section id="why-use" className="py-20 px-4 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">{t('valueProps.title')}</h2>
          <p className="text-lg text-zinc-300 text-center max-w-3xl mx-auto mb-12">
            {t('valueProps.intro') || 'Everything you need to bring computer science to your school.'}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-800 border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/60 transition-colors">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('valueProps.allFree.title')}</h3>
              <p className="text-zinc-400 text-sm">{t('valueProps.allFree.description')}</p>
            </div>

            <div className="bg-zinc-800 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/60 transition-colors">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('valueProps.vetted.title')}</h3>
              <p className="text-zinc-400 text-sm">{t('valueProps.vetted.description')}</p>
            </div>

            <div className="bg-zinc-800 border border-emerald-500/30 rounded-xl p-6 hover:border-emerald-500/60 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('valueProps.aligned.title')}</h3>
              <p className="text-zinc-400 text-sm">{t('valueProps.aligned.description')}</p>
            </div>

            <div className="bg-zinc-800 border border-violet-500/30 rounded-xl p-6 hover:border-violet-500/60 transition-colors">
              <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('valueProps.comprehensive.title')}</h3>
              <p className="text-zinc-400 text-sm">{t('valueProps.comprehensive.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section id="standards" className="py-20 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">{t('standards.title')}</h2>
          <p className="text-lg text-zinc-300 text-center max-w-3xl mx-auto mb-12">{t('standards.description')}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-800 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/60 transition-colors">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('standards.csta.title')}</h3>
              <p className="text-zinc-400 text-sm mb-4">{t('standards.csta.description')}</p>
              <a href="https://csteachers.org/k12standards/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1 transition-colors">
                {t('standards.csta.link')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="bg-zinc-800 border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/60 transition-colors">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('standards.states.title')}</h3>
              <p className="text-zinc-400 text-sm mb-4">{t('standards.states.description')}</p>
              <a href="https://advocacy.code.org/stateofcs" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 text-sm font-medium inline-flex items-center gap-1 transition-colors">
                {t('standards.states.link')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">{t('faq.title')}</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="border border-zinc-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === num ? null : num)}
                  className="w-full text-left px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-white">{t(`faq.q${num}.question`)}</span>
                  <svg className={`w-5 h-5 text-zinc-500 transition-transform ${expandedFaq === num ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === num && (
                  <div className="px-6 py-4 bg-zinc-800/50">
                    <p className="text-zinc-300">{t(`faq.q${num}.answer`)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('cta.title') || 'Ready to Get Started?'}</h2>
          <p className="text-lg text-zinc-300 max-w-3xl mx-auto mb-8">
            {t('cta.description') || 'Use our AI-powered planner to create a customized implementation roadmap for your school or district.'}
          </p>
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-8 max-w-2xl mx-auto hover:border-orange-500/50 transition-colors">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{t('cta.cardTitle') || 'AI Implementation Planner'}</h3>
            <p className="text-zinc-300 mb-6">{t('cta.cardDescription') || 'Get personalized recommendations based on your school\'s unique context and goals.'}</p>
            <Link href={`/${locale}/k12-cs-education/ai-planner`} className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-400 transition-colors">
              {t('cta.button') || 'Start Planning'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
