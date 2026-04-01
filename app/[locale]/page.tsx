'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import PhotoBreak from '@/components/PhotoBreak';
import PhotoTeaser from '@/components/PhotoTeaser';
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

export default function Home() {
  const t = useTranslations('home');
  const locale = useLocale();
  const containerRef = useScrollReveal();

  const expertiseItems = [
    {
      title: t('valueProps.bridgeBuilder.title'),
      desc: t('valueProps.bridgeBuilder.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
    {
      title: t('valueProps.aiPioneer.title'),
      desc: t('valueProps.aiPioneer.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: t('valueProps.systemsDesigner.title'),
      desc: t('valueProps.systemsDesigner.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
  ];

  const projects = [
    { key: 'script', anchor: 'script' },
    { key: 'cs4all', anchor: 'nyc-cs4all' },
    { key: 'gyst', anchor: 'gyst-get-your-style-together' },
    { key: 'coachdesk', anchor: 'coachdesk' },
    { key: 'smartiegoals', anchor: 'smartiegoals-org' },
    { key: 'codetale', anchor: 'codetale' },
  ];

  return (
    <div ref={containerRef} className="bg-canvas">
      {/* Hero Section */}
      <Hero />

      {/* Core Expertise */}
      <section className="pt-4 lg:pt-8 pb-16 lg:pb-24 bg-canvas-deep relative overflow-hidden overlap-up">
        {/* Oversized section number watermark */}
        <div className="absolute top-4 right-6 section-number text-text-primary select-none" aria-hidden="true" style={{ opacity: 0.06 }}>
          01
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section heading — mixed weight, terra rule */}
          <div className="reveal-slide-left mb-16">
            <hr className="heading-rule" />
            <h2 className="text-display-section font-display text-text-heading">
              <span className="font-light">What I</span>{' '}
              <span className="font-extrabold">{t('coreExpertise')}</span>
            </h2>
          </div>

          {/* Offset card layout */}
          <div className="flex flex-col gap-6 lg:gap-4">
            {/* Card 1 — flush left, wide */}
            <div className="reveal-slide-left stagger-1 card-alive p-8 lg:w-[65%]">
              <div className="text-terra mb-4 card-icon">{expertiseItems[0].icon}</div>
              <h3 className="text-2xl font-display font-bold text-text-heading mb-4">
                {expertiseItems[0].title}
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                {expertiseItems[0].desc}
              </p>
            </div>

            {/* Card 2 — offset right */}
            <div className="reveal-slide-right stagger-2 card-alive p-8 lg:w-[55%] lg:ml-auto lg:-mt-4">
              <div className="text-ink mb-4">{expertiseItems[1].icon}</div>
              <h3 className="text-2xl font-display font-bold text-text-heading mb-4">
                {expertiseItems[1].title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {expertiseItems[1].desc}
              </p>
            </div>

            {/* Card 3 — centered */}
            <div className="reveal-slide-left stagger-3 card-alive p-8 lg:w-[60%] lg:mx-auto lg:-mt-4">
              <div className="text-ink mb-4">{expertiseItems[2].icon}</div>
              <h3 className="text-2xl font-display font-bold text-text-heading mb-4">
                {expertiseItems[2].title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {expertiseItems[2].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="py-12 bg-canvas">
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal-fade flex flex-wrap justify-center gap-12 md:gap-16">
            {(['schools', 'educators', 'students', 'nsfFunded'] as const).map((key) => (
              <div key={key} className="text-center">
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

      {/* Photo Break */}
      <div className="diagonal-top diagonal-bottom -my-8 relative z-20">
        <PhotoBreak
          src="/photos/once-upon-a-time-in-new-york/30-DSCF8639.webp"
          alt="Street photography in New York City"
          position="center 40%"
          height="40vh"
        />
      </div>

      {/* Featured Work — Cream Section */}
      <section className="section-cream py-20 lg:py-32 relative overflow-hidden">
        {/* Oversized section number */}
        <div className="absolute top-4 right-6 section-number select-none text-canvas-border" aria-hidden="true" style={{ opacity: 0.08 }}>
          02
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="reveal-mask mb-16">
            <hr className="heading-rule" />
            <h2 className="text-display-section font-display">
              <span className="font-light">Selected</span>{' '}
              <span className="font-extrabold">{t('featuredWork.title')}</span>
            </h2>
            <p className="text-lg mt-4 max-w-2xl text-text-muted">
              {t('featuredWork.description')}
            </p>
          </div>

          {/* Project cards — 2 column on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {projects.map((project, index) => (
              <Link
                key={index}
                href={`/${locale}/work#${project.anchor}`}
                className="reveal-fade bg-white border border-canvas-border rounded-lg p-6 group hover:border-terra hover:shadow-lg hover:shadow-terra/5 transition-all"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm font-mono text-text-secondary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <svg
                    className="w-5 h-5 text-text-secondary group-hover:text-terra group-hover:translate-x-1 group-hover:-translate-y-1 card-arrow transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-terra transition-colors text-canvas-deep">
                  {t(`featuredWork.projects.${project.key}.title`)}
                </h3>
                <p className="text-base text-text-muted">
                  {t(`featuredWork.projects.${project.key}.subtitle`)}
                </p>
              </Link>
            ))}
          </div>

          <div className="reveal-fade">
            <Link
              href={`/${locale}/work`}
              className="link-underline text-terra font-semibold inline-flex items-center gap-2 text-lg"
            >
              {t('featuredWork.viewAll')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Photography Teaser */}
      <PhotoTeaser />

      {/* CTA Section */}
      <section className="py-24 lg:py-40 bg-canvas-deep relative overflow-hidden">
        {/* Blurred photo texture background */}
        <div className="absolute inset-0">
          <img
            src="/photos/open-world/24-DSCF5915.webp"
            alt=""
            className="w-full h-full object-cover blur-[50px] opacity-20 saturate-50"
            aria-hidden="true"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-canvas-deep/60" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="reveal-slide-right">
            <h2 className="text-display-section font-display font-extrabold text-text-heading mb-6">
              {t('cta.title')}
            </h2>
          </div>
          <p className="reveal-fade stagger-1 text-xl text-text-secondary mb-12">
            {t('cta.description')}
          </p>
          <div className="reveal-fade stagger-2">
            <Link
              href={`/${locale}/contact`}
              className="btn-terra inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg"
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
