'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import CollapsedCurriculumGrid from '@/components/k12/CollapsedCurriculumGrid';
import ScopeSequenceBuilder from '@/components/k12/ScopeSequenceBuilder';
import { curricula, GradeLevel, Topic } from '@/data/curricula';
import PhotoBreak from '@/components/PhotoBreak';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    const elements = ref.current?.querySelectorAll('.reveal, .reveal-clip, .reveal-fade, .reveal-mask, .reveal-slide-left, .reveal-slide-right');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function K12CSEducation() {
  const t = useTranslations('k12CSEducation');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const containerRef = useScrollReveal();

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

  return (
    <main className="min-h-screen bg-canvas pt-16" ref={containerRef}>
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <hr className="heading-rule" />
          <h1 className="text-display-section font-display font-extrabold text-text-heading mb-4 reveal-slide-left">
            {t('title')}
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mb-4 reveal-fade" style={{ transitionDelay: '0.1s' }}>
            {t('subtitle')}
          </p>
          <p className="text-lg text-text-muted max-w-2xl mb-8 reveal-fade" style={{ transitionDelay: '0.2s' }}>
            {t('targetAudience')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 reveal-fade" style={{ transitionDelay: '0.3s' }}>
            <a href="#curriculum" className="bg-terra text-white px-8 py-3 rounded-lg font-semibold hover:bg-terra-dark transition-colors inline-flex items-center justify-center">
              {t('hero.ctaPrimary')}
            </a>
            <a
              href="#scope-sequence"
              className="border border-terra/50 text-white px-8 py-3 rounded-lg font-semibold hover:bg-terra/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>

      <PhotoBreak
        src="/photos/once-upon-a-time-in-new-york/21-DSCF5980.webp"
        alt=""
        position="center"
        height="20vh"
      />

      {/* Scope & Sequence Builder Section */}
      <section id="scope-sequence" className="py-20 px-4 bg-canvas-deep">
        <div className="max-w-6xl mx-auto">
          <ScopeSequenceBuilder />
        </div>
      </section>

      {/* Curriculum Repository Section */}
      <section id="curriculum" className="py-20 px-4 bg-canvas">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center reveal-slide-left">{t('repository.title')}</h2>
          <p className="text-lg text-text-secondary text-center max-w-3xl mx-auto mb-12">{t('repository.description')}</p>
          <CollapsedCurriculumGrid curricula={curricula} gradeLevelLabels={gradeLevelLabels} topicLabels={topicLabels} />
        </div>
      </section>

      {/* Value Propositions */}
      <section id="why-use" className="py-20 px-4 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">{t('valueProps.title')}</h2>
          <p className="text-lg text-text-secondary text-center max-w-3xl mx-auto mb-12">
            {t('valueProps.intro')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-canvas-raised border border-terra/30 rounded-xl p-6 hover:border-terra/60 transition-colors reveal-fade" style={{ transitionDelay: '0s' }}>
              <div className="w-12 h-12 bg-terra/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-terra" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('valueProps.allFree.title')}</h3>
              <p className="text-text-secondary text-sm">{t('valueProps.allFree.description')}</p>
            </div>

            <div className="bg-canvas-raised border border-ink/30 rounded-xl p-6 hover:border-ink/60 transition-colors reveal-fade" style={{ transitionDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-ink/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('valueProps.vetted.title')}</h3>
              <p className="text-text-secondary text-sm">{t('valueProps.vetted.description')}</p>
            </div>

            <div className="bg-canvas-raised border border-terra/30 rounded-xl p-6 hover:border-terra/60 transition-colors reveal-fade" style={{ transitionDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-terra/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-terra-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('valueProps.aligned.title')}</h3>
              <p className="text-text-secondary text-sm">{t('valueProps.aligned.description')}</p>
            </div>

            <div className="bg-canvas-raised border border-ink/30 rounded-xl p-6 hover:border-ink/60 transition-colors reveal-fade" style={{ transitionDelay: '0.3s' }}>
              <div className="w-12 h-12 bg-ink/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-ink-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('valueProps.comprehensive.title')}</h3>
              <p className="text-text-secondary text-sm">{t('valueProps.comprehensive.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section id="standards" className="py-20 px-4 bg-canvas">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center reveal-slide-left">{t('standards.title')}</h2>
          <p className="text-lg text-text-secondary text-center max-w-3xl mx-auto mb-12">{t('standards.description')}</p>
          <div className="grid md:grid-cols-2 gap-8 reveal-fade">
            <div className="bg-canvas-raised border border-ink/30 rounded-xl p-6 hover:border-ink/60 transition-colors">
              <div className="w-12 h-12 bg-ink/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('standards.csta.title')}</h3>
              <p className="text-text-secondary text-sm mb-4">{t('standards.csta.description')}</p>
              <a href="https://csteachers.org/k12standards/" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-ink-light text-sm font-medium inline-flex items-center gap-1 transition-colors">
                {t('standards.csta.link')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="bg-canvas-raised border border-terra/30 rounded-xl p-6 hover:border-terra/60 transition-colors">
              <div className="w-12 h-12 bg-terra/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-terra" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('standards.states.title')}</h3>
              <p className="text-text-secondary text-sm mb-4">{t('standards.states.description')}</p>
              <a href="https://advocacy.code.org/stateofcs" target="_blank" rel="noopener noreferrer" className="text-terra hover:text-terra-light text-sm font-medium inline-flex items-center gap-1 transition-colors">
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
      <section id="faq" className="py-20 px-4 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">{t('faq.title')}</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="border border-canvas-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === num ? null : num)}
                  className="w-full text-left px-6 py-4 bg-canvas-raised hover:bg-canvas-border transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-white">{t(`faq.q${num}.question`)}</span>
                  <svg className={`w-5 h-5 text-text-muted transition-transform ${expandedFaq === num ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === num && (
                  <div className="px-6 py-4 bg-canvas-raised/50">
                    <p className="text-text-secondary">{t(`faq.q${num}.answer`)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-canvas">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('cta.title')}</h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            {t('cta.description')}
          </p>
          <a href="#scope-sequence" className="inline-block bg-terra text-white px-8 py-4 rounded-lg font-semibold hover:bg-terra-dark transition-colors">
            {t('cta.button')}
          </a>
        </div>
      </section>
    </main>
  );
}
