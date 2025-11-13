'use client';

import React from 'react';
import Button from '@/components/Button';
import PageWrapper from '@/components/PageWrapper';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {t('title')}
        </h1>
      </div>

      {/* The Story */}
      <div className="prose prose-lg max-w-none mb-16">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {t('p1')}
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {t('p2')}
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {t('p3')}
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {t('p4')}
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {t('p5')}
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {t('p6')}
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {t('p7')}
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {t('p8')}
          </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          {t('p9')}
        </p>
      </div>

      {/* Quick Facts */}
      <div className="border-t border-gray-200 pt-12 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{t('basedIn')}</p>
              <p className="text-gray-900">{t('basedInValue')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{t('workWith')}</p>
              <p className="text-gray-900">{t('workWithValue')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{t('languages')}</p>
              <p className="text-gray-900">{t('languagesValue')}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{t('education')}</p>
              <p className="text-gray-900" style={{ whiteSpace: 'pre-line' }}>{t('educationValue')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{t('contact')}</p>
              <a href="mailto:joe@jamelna.com" className="text-slate-600 hover:text-slate-700 underline transition-colors">
                joe@jamelna.com
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{t('linkedin')}</p>
              <a
                href="https://linkedin.com/in/joeamelendez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-700 underline transition-colors"
              >
                linkedin.com/in/joeamelendez
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button href="/contact" variant="primary" size="lg">
          {t('cta')}
        </Button>
      </div>
    </PageWrapper>
  );
}
