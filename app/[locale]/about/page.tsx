'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

// Scroll reveal hook
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

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  const containerRef = useScrollReveal();

  const experiences = [
    { key: 'ncstate' },
    { key: 'csforall' },
    { key: 'cornellDirector' },
    { key: 'cornellResident' },
    { key: 'nycdoe' },
    { key: 'expanded' },
    { key: 'nyasPm' },
    { key: 'nyasCoord' },
    { key: 'lsc' },
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-canvas pt-16">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <hr className="heading-rule" />
          <h1 className="reveal-slide-left text-display-section font-display font-extrabold text-text-heading mb-4">
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Profile intro — photo + first bio paragraphs */}
      <section className="bg-canvas-deep">
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
          <div className="reveal-fade flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Photo with sci-fi frame — transparent PNG floats over orbital rings */}
            <div className="lg:w-1/3 flex-shrink-0">
              <div className="relative group py-8">

                {/* Orbital ring 1 — slow rotation */}
                <div className="absolute top-1/2 left-1/2 w-[110%] aspect-square animate-orbit pointer-events-none">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <ellipse cx="100" cy="100" rx="95" ry="95" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-terra/20" strokeDasharray="4 8" />
                  </svg>
                </div>

                {/* Orbital ring 2 — tilted, reverse */}
                <div className="absolute top-1/2 left-1/2 w-[130%] aspect-square animate-orbit-reverse pointer-events-none" style={{ transform: 'translate(-50%, -50%) rotate(0deg)' }}>
                  <svg viewBox="0 0 200 200" className="w-full h-full" style={{ transform: 'rotateX(60deg)' }}>
                    <ellipse cx="100" cy="100" rx="95" ry="95" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-ink/20" strokeDasharray="2 12" />
                  </svg>
                </div>

                {/* Glow backdrop behind the transparent photo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-terra/8 blur-3xl group-hover:bg-terra/15 transition-all duration-1000 pointer-events-none" />

                {/* HUD corner brackets */}
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-terra/40 group-hover:border-terra/70 transition-colors duration-500" />
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-terra/40 group-hover:border-terra/70 transition-colors duration-500" />
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-terra/40 group-hover:border-terra/70 transition-colors duration-500" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-terra/40 group-hover:border-terra/70 transition-colors duration-500" />

                {/* Scanning line */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                  <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-terra/30 to-transparent animate-scan" />
                </div>

                {/* Data readout — top */}
                <div className="absolute -top-4 left-10 flex items-center gap-2 z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-terra animate-pulse" />
                  <span className="font-mono text-[10px] text-terra/60 uppercase tracking-widest">sys.profile.active</span>
                </div>

                {/* Data readout — bottom */}
                <div className="absolute -bottom-4 right-2 z-10">
                  <span className="font-mono text-[10px] text-text-muted/40 tracking-wider">35.99°N 78.90°W</span>
                </div>

                {/* Side data bar — audio spectrum style */}
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-1 items-center">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1 rounded-full bg-terra/20 group-hover:bg-terra/50 transition-all duration-500" style={{ height: `${6 + Math.sin(i * 0.8) * 5}px`, transitionDelay: `${i * 60}ms` }} />
                  ))}
                </div>

                {/* The photo — transparent PNG floats over everything */}
                <div className="relative z-10">
                  <Image
                    src="/images/profile/joe.png"
                    alt="Joe Alexander Meléndez-Naharro"
                    width={600}
                    height={750}
                    className="w-full drop-shadow-[0_0_30px_rgba(196,112,63,0.15)] group-hover:drop-shadow-[0_0_40px_rgba(196,112,63,0.25)] transition-all duration-700"
                    priority
                  />
                </div>
              </div>
            </div>
            {/* First bio paragraphs */}
            <div className="lg:w-2/3 space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
              <p>{t('p4')}</p>
              <a
                href="https://linkedin.com/in/joeamelendez"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-terra inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base mt-6"
              >
                {t('linkedinButton')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="py-16 bg-canvas-deep">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="reveal-slide-left text-sm font-mono text-terra uppercase tracking-wider mb-8">
            {t('metricsTitle')}
          </h3>
          <div className="reveal-fade grid grid-cols-2 md:grid-cols-5 gap-8">
            {['schools', 'educators', 'students', 'years', 'nsfFunded'].map((key) => (
              <div key={key}>
                <div className="text-3xl md:text-4xl font-display font-extrabold text-text-heading">
                  {t(`metrics.${key}.number`)}
                </div>
                <div className="text-sm text-text-muted mt-1">
                  {t(`metrics.${key}.label`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 bg-canvas">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="reveal-slide-left text-sm font-mono text-terra uppercase tracking-wider mb-8">
            {t('skillsTitle')}
          </h3>
          <div className="reveal-fade grid grid-cols-1 md:grid-cols-2 gap-6">
            {['strategy', 'technical', 'education', 'leadership'].map((key) => (
              <div key={key} className="card-alive p-6">
                <h4 className="font-display font-bold text-text-heading text-lg mb-2">
                  {t(`skills.${key}.title`)}
                </h4>
                <p className="text-text-secondary text-base leading-relaxed">
                  {t(`skills.${key}.items`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Remaining bio paragraphs */}
      <section className="py-12 px-4 bg-canvas-deep">
        <div className="max-w-4xl mx-auto">
          <div className="reveal-fade mb-16 space-y-6 text-lg text-text-secondary leading-relaxed">
            <p>{t('p5')}</p>
            <p>{t('p6')}</p>
            <p>{t('p7')}</p>
            <p>{t('p8')}</p>
            <p>{t('p9')}</p>
          </div>

          {/* Experience / CV Section */}
          <div className="border-t border-canvas-border pt-12 mb-12">
            <hr className="heading-rule" />
            <h2 className="reveal-slide-left text-display-section font-display text-text-heading mb-8">
              <span className="font-light">Experience</span>{' '}
              <span className="font-extrabold">{t('experienceTitle')}</span>
            </h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={exp.key}
                  className="reveal-fade relative pl-6 border-l-2 border-canvas-border hover:border-terra transition-colors"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-canvas-raised border-2 border-canvas-border"></div>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-text-heading">
                        {t(`experience.${exp.key}.title`)}
                      </h3>
                      <p className="text-terra font-medium">
                        {t(`experience.${exp.key}.org`)}
                      </p>
                    </div>
                    <p className="text-sm text-text-muted font-mono md:text-right whitespace-nowrap">
                      {t(`experience.${exp.key}.dates`)}
                    </p>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t(`experience.${exp.key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Facts */}
          <div className="reveal-fade border-t border-canvas-border pt-12 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-mono font-medium text-terra mb-1 uppercase tracking-wider">{t('basedIn')}</p>
                  <p className="text-text-secondary">{t('basedInValue')}</p>
                </div>
                <div>
                  <p className="text-sm font-mono font-medium text-terra mb-1 uppercase tracking-wider">{t('workWith')}</p>
                  <p className="text-text-secondary">{t('workWithValue')}</p>
                </div>
                <div>
                  <p className="text-sm font-mono font-medium text-terra mb-1 uppercase tracking-wider">{t('languages')}</p>
                  <p className="text-text-secondary">{t('languagesValue')}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-mono font-medium text-terra mb-1 uppercase tracking-wider">{t('education')}</p>
                  <p className="text-text-secondary" style={{ whiteSpace: 'pre-line' }}>{t('educationValue')}</p>
                </div>
                <div>
                  <p className="text-sm font-mono font-medium text-terra mb-1 uppercase tracking-wider">{t('contact')}</p>
                  <a href="mailto:joe@jamelna.com" className="text-terra hover:text-terra-light transition-colors">
                    joe@jamelna.com
                  </a>
                </div>
                <div>
                  <p className="text-sm font-mono font-medium text-terra mb-1 uppercase tracking-wider">{t('linkedin')}</p>
                  <a
                    href="https://linkedin.com/in/joeamelendez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terra hover:text-terra-light transition-colors"
                  >
                    linkedin.com/in/joeamelendez
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-3 bg-terra hover:bg-terra-dark text-white font-semibold rounded-lg transition-colors text-lg"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Photography + Contact CTAs */}
      <section className="py-16 bg-canvas-deep">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between">
          <div className="reveal-fade">
            <p className="text-text-secondary text-lg mb-2">{t('photographyLink')}</p>
            <Link href={`/${locale}/photography`} className="link-underline text-terra font-medium inline-flex items-center gap-2">
              {t('photographyLinkCta')} →
            </Link>
          </div>
          <div className="reveal-fade stagger-1">
            <p className="text-text-secondary text-lg mb-2">{t('contactCta')}</p>
            <Link href={`/${locale}/contact`} className="btn-terra inline-flex items-center gap-2 px-6 py-3 rounded-lg">
              {t('contactCtaButton')} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
