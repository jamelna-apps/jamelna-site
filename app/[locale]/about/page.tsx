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
            {/* Photo */}
            <div className="lg:w-1/3 flex-shrink-0">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/images/profile/joe.png"
                  alt="Joe Alexander Meléndez-Naharro"
                  width={600}
                  height={750}
                  className="w-full object-cover"
                  priority
                />
              </div>
            </div>
            {/* First bio paragraphs */}
            <div className="lg:w-2/3 space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
              <p>{t('p4')}</p>
            </div>
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
    </main>
  );
}
