'use client';

import React from 'react';
import PageWrapper from '@/components/PageWrapper';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-heading mb-6">
          <span className="text-primary">/</span> {t('title')}
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Consulting Inquiries */}
      <div className="border-t border-deep-border pt-12 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-12 bg-warm"></div>
          <h2 className="text-2xl font-display font-bold text-text-heading">
            {t('consultingTitle')}
          </h2>
        </div>
        <p className="text-text-secondary mb-4">
          {t('consultingIntro')}
        </p>
        <ol className="list-decimal list-inside space-y-3 text-text-secondary mb-6">
          <li>
            <strong className="text-text-primary">{t('consultingStep1')}</strong> {t('consultingStep1At')}{' '}
            <a
              href="mailto:joe@jamelna.com"
              className="text-primary hover:text-primary-light transition-colors"
            >
              joe@jamelna.com
            </a>{' '}
            {t('consultingStep1With')}
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>{t('consultingBullet1')}</li>
              <li>{t('consultingBullet2')}</li>
              <li>{t('consultingBullet3')}</li>
            </ul>
          </li>
          <li>
            <strong className="text-text-primary">{t('consultingStep2')}</strong> {t('consultingStep2Detail')}
          </li>
          <li>
            <strong className="text-text-primary">{t('consultingStep3')}</strong> {t('consultingStep3Detail')}
          </li>
          <li>
            <strong className="text-text-primary">{t('consultingStep4')}</strong>, {t('consultingStep4Detail')}
          </li>
        </ol>
        <a
          href="mailto:joe@jamelna.com"
          className="btn-warm inline-flex items-center justify-center"
        >
          {t('sendEmail')}
        </a>
      </div>

      {/* Employment Opportunities */}
      <div className="border-t border-deep-border pt-12 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-12 bg-primary"></div>
          <h2 className="text-2xl font-display font-bold text-text-heading">
            {t('employmentTitle')}
          </h2>
        </div>
        <p className="text-text-secondary mb-4">
          {t('employmentIntro')}
        </p>
        <ul className="list-disc list-inside space-y-2 text-text-secondary mb-4 ml-4">
          <li>{t('employmentBullet1')}</li>
          <li>{t('employmentBullet2')}</li>
          <li>{t('employmentBullet3')}</li>
        </ul>
        <p className="text-text-secondary">
          {t('employmentEmail')}{' '}
          <a
            href="mailto:joe@jamelna.com?subject=Employment Opportunity"
            className="text-primary hover:text-primary-light transition-colors"
          >
            joe@jamelna.com
          </a>{' '}
          {t('employmentSubject')}
        </p>
      </div>

      {/* General Inquiries */}
      <div className="border-t border-deep-border pt-12 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-12 bg-warm"></div>
          <h2 className="text-2xl font-display font-bold text-text-heading">
            {t('generalTitle')}
          </h2>
        </div>
        <p className="text-text-secondary mb-4">
          {t('generalIntro')}
        </p>
        <div className="space-y-2 text-text-secondary">
          <p>
            <strong className="text-warm">{t('email')}</strong>{' '}
            <a
              href="mailto:joe@jamelna.com"
              className="text-primary hover:text-primary-light transition-colors"
            >
              joe@jamelna.com
            </a>
          </p>
          <p>
            <strong className="text-warm">{t('linkedin')}</strong>{' '}
            <a
              href="https://linkedin.com/in/joeamelendez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-light transition-colors"
            >
              linkedin.com/in/joeamelendez
            </a>
          </p>
        </div>
      </div>

      {/* Location & Availability */}
      <div className="border-t border-deep-border pt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-12 bg-primary"></div>
          <h2 className="text-2xl font-display font-bold text-text-heading">
            {t('locationTitle')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-text-secondary">
          <div className="bg-deep-card border border-deep-border rounded-lg p-6">
            <h3 className="font-bold text-warm mb-2 uppercase tracking-wider text-sm font-mono">{t('locationLabel')}</h3>
            <p className="text-text-primary">{t('locationValue')}</p>
          </div>
          <div className="bg-deep-card border border-deep-border rounded-lg p-6">
            <h3 className="font-bold text-warm mb-2 uppercase tracking-wider text-sm font-mono">{t('availabilityLabel')}</h3>
            <p className="text-text-primary">{t('availabilityValue1')}</p>
            <p className="text-text-primary">{t('availabilityValue2')}</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
