'use client';

import React from 'react';
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';
import { useTranslations, useLocale } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-heading mb-6">
          <span className="text-warm">/</span> {t('title')}
        </h1>
      </div>

      {/* The Story */}
      <div className="max-w-none mb-16 space-y-6">
        <p className="text-lg text-text-secondary leading-relaxed">
          {t('p1')}
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          {t('p2')}
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          {t('p3')}
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          {t('p4')}
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          {t('p5')}
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          {t('p6')}
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          {t('p7')}
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          {t('p8')}
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          {t('p9')}
        </p>
      </div>

      {/* Quick Facts */}
      <div className="border-t border-deep-border pt-12 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-mono font-medium text-warm mb-1 uppercase tracking-wider">{t('basedIn')}</p>
              <p className="text-text-primary">{t('basedInValue')}</p>
            </div>
            <div>
              <p className="text-sm font-mono font-medium text-warm mb-1 uppercase tracking-wider">{t('workWith')}</p>
              <p className="text-text-primary">{t('workWithValue')}</p>
            </div>
            <div>
              <p className="text-sm font-mono font-medium text-warm mb-1 uppercase tracking-wider">{t('languages')}</p>
              <p className="text-text-primary">{t('languagesValue')}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-mono font-medium text-warm mb-1 uppercase tracking-wider">{t('education')}</p>
              <p className="text-text-primary" style={{ whiteSpace: 'pre-line' }}>{t('educationValue')}</p>
            </div>
            <div>
              <p className="text-sm font-mono font-medium text-warm mb-1 uppercase tracking-wider">{t('contact')}</p>
              <a href="mailto:joe@jamelna.com" className="text-primary hover:text-primary-light transition-colors">
                joe@jamelna.com
              </a>
            </div>
            <div>
              <p className="text-sm font-mono font-medium text-warm mb-1 uppercase tracking-wider">{t('linkedin')}</p>
              <a
                href="https://linkedin.com/in/joeamelendez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light transition-colors"
              >
                linkedin.com/in/joeamelendez
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href={`/${locale}/contact`} className="btn-warm inline-block text-lg">
          {t('cta')}
        </Link>
      </div>
    </PageWrapper>
  );
}
