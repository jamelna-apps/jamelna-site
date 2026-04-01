'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <main className="min-h-screen bg-canvas pt-16">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <hr className="heading-rule" />
          <h1 className="text-display-section font-display text-text-heading mb-4">
            <span className="font-light">Get in</span>{' '}
            <span className="font-extrabold">{t('title')}</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 bg-canvas-deep">
        <div className="max-w-4xl mx-auto">
          {/* Consulting Inquiries */}
          <div className="border-t border-canvas-border pt-12 mb-16">
            <hr className="heading-rule" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-terra"></div>
              <h2 className="text-display-section font-display font-extrabold text-text-heading">
                {t('consultingTitle')}
              </h2>
            </div>
            <p className="text-text-secondary mb-4">
              {t('consultingIntro')}
            </p>
            <ol className="list-decimal list-inside space-y-3 text-text-secondary mb-6">
              <li>
                <strong className="text-text-heading">{t('consultingStep1')}</strong> {t('consultingStep1At')}{' '}
                <a
                  href="mailto:joe@jamelna.com"
                  className="text-terra hover:text-terra-light transition-colors"
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
                <strong className="text-text-heading">{t('consultingStep2')}</strong> {t('consultingStep2Detail')}
              </li>
              <li>
                <strong className="text-text-heading">{t('consultingStep3')}</strong> {t('consultingStep3Detail')}
              </li>
              <li>
                <strong className="text-text-heading">{t('consultingStep4')}</strong>, {t('consultingStep4Detail')}
              </li>
            </ol>
            <a
              href="mailto:joe@jamelna.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-terra hover:bg-terra-dark text-white font-semibold rounded-lg transition-colors"
            >
              {t('sendEmail')}
            </a>
          </div>

          {/* Employment Opportunities */}
          <div className="border-t border-canvas-border pt-12 mb-16">
            <hr className="heading-rule" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-ink"></div>
              <h2 className="text-display-section font-display font-extrabold text-text-heading">
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
                className="text-ink hover:text-ink-light transition-colors"
              >
                joe@jamelna.com
              </a>{' '}
              {t('employmentSubject')}
            </p>
          </div>

          {/* General Inquiries */}
          <div className="border-t border-canvas-border pt-12 mb-16">
            <hr className="heading-rule" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-terra"></div>
              <h2 className="text-display-section font-display font-extrabold text-text-heading">
                {t('generalTitle')}
              </h2>
            </div>
            <p className="text-text-secondary mb-4">
              {t('generalIntro')}
            </p>
            <div className="space-y-2 text-text-secondary">
              <p>
                <strong className="text-terra">{t('email')}</strong>{' '}
                <a
                  href="mailto:joe@jamelna.com"
                  className="text-terra hover:text-terra-light transition-colors"
                >
                  joe@jamelna.com
                </a>
              </p>
              <p>
                <strong className="text-terra">{t('linkedin')}</strong>{' '}
                <a
                  href="https://linkedin.com/in/joeamelendez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terra hover:text-terra-light transition-colors"
                >
                  linkedin.com/in/joeamelendez
                </a>
              </p>
            </div>
          </div>

          {/* Location & Availability */}
          <div className="border-t border-canvas-border pt-12">
            <hr className="heading-rule" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-ink"></div>
              <h2 className="text-display-section font-display font-extrabold text-text-heading">
                {t('locationTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-canvas-raised border border-canvas-border rounded-lg p-6">
                <h3 className="font-bold text-terra mb-2 uppercase tracking-wider text-sm font-mono">{t('locationLabel')}</h3>
                <p className="text-text-secondary">{t('locationValue')}</p>
              </div>
              <div className="bg-canvas-raised border border-canvas-border rounded-lg p-6">
                <h3 className="font-bold text-terra mb-2 uppercase tracking-wider text-sm font-mono">{t('availabilityLabel')}</h3>
                <p className="text-text-secondary">{t('availabilityValue1')}</p>
                <p className="text-text-secondary">{t('availabilityValue2')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
