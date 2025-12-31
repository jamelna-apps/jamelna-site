'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-zinc-900 to-zinc-950"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4), transparent)' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            <span className="text-orange-400">/</span> {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          {/* Consulting Inquiries */}
          <div className="border-t border-zinc-800 pt-12 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-orange-500"></div>
              <h2 className="text-2xl font-display font-bold text-white">
                {t('consultingTitle')}
              </h2>
            </div>
            <p className="text-zinc-300 mb-4">
              {t('consultingIntro')}
            </p>
            <ol className="list-decimal list-inside space-y-3 text-zinc-300 mb-6">
              <li>
                <strong className="text-zinc-100">{t('consultingStep1')}</strong> {t('consultingStep1At')}{' '}
                <a
                  href="mailto:joe@jamelna.com"
                  className="text-orange-400 hover:text-orange-300 transition-colors"
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
                <strong className="text-zinc-100">{t('consultingStep2')}</strong> {t('consultingStep2Detail')}
              </li>
              <li>
                <strong className="text-zinc-100">{t('consultingStep3')}</strong> {t('consultingStep3Detail')}
              </li>
              <li>
                <strong className="text-zinc-100">{t('consultingStep4')}</strong>, {t('consultingStep4Detail')}
              </li>
            </ol>
            <a
              href="mailto:joe@jamelna.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
            >
              {t('sendEmail')}
            </a>
          </div>

          {/* Employment Opportunities */}
          <div className="border-t border-zinc-800 pt-12 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-blue-500"></div>
              <h2 className="text-2xl font-display font-bold text-white">
                {t('employmentTitle')}
              </h2>
            </div>
            <p className="text-zinc-300 mb-4">
              {t('employmentIntro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300 mb-4 ml-4">
              <li>{t('employmentBullet1')}</li>
              <li>{t('employmentBullet2')}</li>
              <li>{t('employmentBullet3')}</li>
            </ul>
            <p className="text-zinc-300">
              {t('employmentEmail')}{' '}
              <a
                href="mailto:joe@jamelna.com?subject=Employment Opportunity"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                joe@jamelna.com
              </a>{' '}
              {t('employmentSubject')}
            </p>
          </div>

          {/* General Inquiries */}
          <div className="border-t border-zinc-800 pt-12 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-orange-500"></div>
              <h2 className="text-2xl font-display font-bold text-white">
                {t('generalTitle')}
              </h2>
            </div>
            <p className="text-zinc-300 mb-4">
              {t('generalIntro')}
            </p>
            <div className="space-y-2 text-zinc-300">
              <p>
                <strong className="text-orange-400">{t('email')}</strong>{' '}
                <a
                  href="mailto:joe@jamelna.com"
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  joe@jamelna.com
                </a>
              </p>
              <p>
                <strong className="text-orange-400">{t('linkedin')}</strong>{' '}
                <a
                  href="https://linkedin.com/in/joeamelendez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  linkedin.com/in/joeamelendez
                </a>
              </p>
            </div>
          </div>

          {/* Location & Availability */}
          <div className="border-t border-zinc-800 pt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-blue-500"></div>
              <h2 className="text-2xl font-display font-bold text-white">
                {t('locationTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
                <h3 className="font-bold text-orange-400 mb-2 uppercase tracking-wider text-sm font-mono">{t('locationLabel')}</h3>
                <p className="text-zinc-200">{t('locationValue')}</p>
              </div>
              <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
                <h3 className="font-bold text-orange-400 mb-2 uppercase tracking-wider text-sm font-mono">{t('availabilityLabel')}</h3>
                <p className="text-zinc-200">{t('availabilityValue1')}</p>
                <p className="text-zinc-200">{t('availabilityValue2')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
