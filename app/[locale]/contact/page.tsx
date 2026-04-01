'use client';

import React, { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
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

export default function ContactPage() {
  const t = useTranslations('contact');
  const containerRef = useScrollReveal();

  return (
    <main className="min-h-screen bg-canvas pt-16" ref={containerRef}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <hr className="heading-rule" />
          <h1 className="text-display-section font-display text-text-heading mb-4 reveal-slide-left">
            <span className="font-light">Get in</span>{' '}
            <span className="font-extrabold">{t('title')}</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl reveal-fade">
            {t('description')}
          </p>
        </div>
      </section>

      <PhotoBreak
        src="/photos/once-upon-a-time-in-new-york/1-DSCF2326.webp"
        alt=""
        position="center"
        height="20vh"
      />

      {/* Content */}
      <section className="py-12 px-4 bg-canvas-deep">
        <div className="max-w-4xl mx-auto">

          {/* Section 1: Open to Opportunities */}
          <section className="reveal-fade mb-16">
            <hr className="heading-rule" />
            <h2 className="text-display-section font-display font-extrabold text-text-heading mb-4">
              {t('opportunities.title')}
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mb-6">
              {t('opportunities.description')}
            </p>
            <a href="mailto:joe@jamelna.com" className="btn-terra inline-flex items-center gap-2 px-6 py-3 rounded-lg">
              {t('opportunities.cta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </section>

          {/* Section 2: Consulting */}
          <section className="reveal-fade stagger-1 mb-16">
            <h3 className="text-xl font-display font-bold text-text-heading mb-3">
              {t('consulting.title')}
            </h3>
            <p className="text-text-secondary text-base leading-relaxed max-w-2xl mb-4">
              {t('consulting.description')}
            </p>
            <a href="mailto:joe@jamelna.com" className="link-underline text-terra font-medium">
              {t('consulting.cta')} →
            </a>
          </section>

          {/* Section 3: Get in Touch */}
          <section className="reveal-fade stagger-2 bg-canvas-raised border border-canvas-border rounded-lg p-8">
            <h3 className="text-xl font-display font-bold text-text-heading mb-6">
              {t('connect.title')}
            </h3>
            <div className="space-y-4">
              <a href="mailto:joe@jamelna.com" className="flex items-center gap-3 text-text-secondary hover:text-terra transition-colors text-base">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('connect.email')}
              </a>
              <a href="https://linkedin.com/in/joeamelendez" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-terra transition-colors text-base">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <p className="text-text-muted text-base pt-2">
                {t('connect.location')}
              </p>
            </div>
          </section>

        </div>
      </section>
    </main>
  );
}
