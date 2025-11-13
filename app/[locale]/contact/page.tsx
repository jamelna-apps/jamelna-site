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
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        {t('title')}
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        {t('description')}
      </p>
    </div>

    {/* Consulting Inquiries */}
    <div className="border-t border-gray-200 pt-12 mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-12 bg-slate-600"></div>
        <h2 className="text-2xl font-bold text-gray-900">
          {t('consultingTitle')}
        </h2>
      </div>
      <p className="text-gray-700 mb-4">
        {t('consultingIntro')}
      </p>
      <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
        <li>
          <strong className="text-gray-900">{t('consultingStep1')}</strong> {t('consultingStep1At')}{' '}
          <a
            href="mailto:joe@jamelna.com"
            className="text-slate-600 hover:text-slate-700 underline transition-colors"
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
          <strong className="text-gray-900">{t('consultingStep2')}</strong> {t('consultingStep2Detail')}
        </li>
        <li>
          <strong className="text-gray-900">{t('consultingStep3')}</strong> {t('consultingStep3Detail')}
        </li>
        <li>
          <strong className="text-gray-900">{t('consultingStep4')}</strong>, {t('consultingStep4Detail')}
        </li>
      </ol>
      <a
        href="mailto:joe@jamelna.com"
        className="inline-flex items-center justify-center px-8 py-4 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors"
      >
        {t('sendEmail')}
      </a>
    </div>

    {/* Employment Opportunities */}
    <div className="border-t border-gray-200 pt-12 mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-12 bg-slate-600"></div>
        <h2 className="text-2xl font-bold text-gray-900">
          {t('employmentTitle')}
        </h2>
      </div>
      <p className="text-gray-700 mb-4">
        {t('employmentIntro')}
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
        <li>{t('employmentBullet1')}</li>
        <li>{t('employmentBullet2')}</li>
        <li>{t('employmentBullet3')}</li>
      </ul>
      <p className="text-gray-700">
        {t('employmentEmail')}{' '}
        <a
          href="mailto:joe@jamelna.com?subject=Employment Opportunity"
          className="text-slate-600 hover:text-slate-700 underline transition-colors"
        >
          joe@jamelna.com
        </a>{' '}
        {t('employmentSubject')}
      </p>
    </div>

    {/* General Inquiries */}
    <div className="border-t border-gray-200 pt-12 mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-12 bg-slate-600"></div>
        <h2 className="text-2xl font-bold text-gray-900">
          {t('generalTitle')}
        </h2>
      </div>
      <p className="text-gray-700 mb-4">
        {t('generalIntro')}
      </p>
      <div className="space-y-2 text-gray-700">
        <p>
          <strong className="text-slate-600">{t('email')}</strong>{' '}
          <a
            href="mailto:joe@jamelna.com"
            className="text-slate-600 hover:text-slate-700 underline transition-colors"
          >
            joe@jamelna.com
          </a>
        </p>
        <p>
          <strong className="text-slate-600">{t('linkedin')}</strong>{' '}
          <a
            href="https://linkedin.com/in/joeamelendez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-700 underline transition-colors"
          >
            linkedin.com/in/joeamelendez
          </a>
        </p>
      </div>
    </div>

    {/* Location & Availability */}
    <div className="border-t border-gray-200 pt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-12 bg-slate-600"></div>
        <h2 className="text-2xl font-bold text-gray-900">
          {t('locationTitle')}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-slate-600 mb-2 uppercase tracking-wider">{t('locationLabel')}</h3>
          <p>{t('locationValue')}</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-slate-600 mb-2 uppercase tracking-wider">{t('availabilityLabel')}</h3>
          <p>{t('availabilityValue1')}</p>
          <p>{t('availabilityValue2')}</p>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
}
