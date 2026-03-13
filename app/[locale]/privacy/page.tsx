'use client';

import React from 'react';
import PageWrapper from '@/components/PageWrapper';
import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-heading mb-4">
          <span className="text-warm">/</span> {t('title')}
        </h1>
        <p className="text-text-muted text-sm font-mono">{t('lastUpdated')}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-12">

        {/* Intro */}
        <div className="space-y-4">
          <p className="text-lg text-text-secondary leading-relaxed">{t('intro')}</p>
        </div>

        {/* What We Collect */}
        <section>
          <h2 className="text-2xl font-display font-bold text-text-heading mb-4">
            <span className="text-warm font-mono text-lg mr-2">01</span>
            {t('collectTitle')}
          </h2>
          <div className="space-y-4 pl-8 border-l border-deep-border">
            <div>
              <p className="text-sm font-mono font-medium text-warm uppercase tracking-wider mb-1">{t('collectAnalyticsLabel')}</p>
              <p className="text-text-secondary leading-relaxed">{t('collectAnalytics')}</p>
            </div>
            <div>
              <p className="text-sm font-mono font-medium text-warm uppercase tracking-wider mb-1">{t('collectAILabel')}</p>
              <p className="text-text-secondary leading-relaxed">{t('collectAI')}</p>
            </div>
            <div>
              <p className="text-sm font-mono font-medium text-warm uppercase tracking-wider mb-1">{t('collectContactLabel')}</p>
              <p className="text-text-secondary leading-relaxed">{t('collectContact')}</p>
            </div>
          </div>
        </section>

        {/* How We Use It */}
        <section>
          <h2 className="text-2xl font-display font-bold text-text-heading mb-4">
            <span className="text-warm font-mono text-lg mr-2">02</span>
            {t('useTitle')}
          </h2>
          <div className="space-y-3 pl-8 border-l border-deep-border">
            <p className="text-text-secondary leading-relaxed">{t('useIntro')}</p>
            <ul className="space-y-2">
              {(['use1', 'use2', 'use3', 'use4'] as const).map((key) => (
                <li key={key} className="flex gap-2 text-text-secondary">
                  <span className="text-warm mt-1 shrink-0">—</span>
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Third-Party Services */}
        <section>
          <h2 className="text-2xl font-display font-bold text-text-heading mb-4">
            <span className="text-warm font-mono text-lg mr-2">03</span>
            {t('thirdPartyTitle')}
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4 pl-8">{t('thirdPartyIntro')}</p>
          <div className="space-y-3 pl-8 border-l border-deep-border">
            {(
              [
                { labelKey: 'tpAnthropicLabel', descKey: 'tpAnthropic', href: 'https://www.anthropic.com/privacy' },
                { labelKey: 'tpFirebaseLabel', descKey: 'tpFirebase', href: 'https://policies.google.com/privacy' },
                { labelKey: 'tpSupabaseLabel', descKey: 'tpSupabase', href: 'https://supabase.com/privacy' },
                { labelKey: 'tpSanityLabel', descKey: 'tpSanity', href: 'https://www.sanity.io/legal/privacy' },
                { labelKey: 'tpVercelLabel', descKey: 'tpVercel', href: 'https://vercel.com/legal/privacy-policy' },
              ] as const
            ).map(({ labelKey, descKey, href }) => (
              <div key={labelKey}>
                <p className="text-sm font-mono font-medium text-warm uppercase tracking-wider mb-1">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {t(labelKey)} ↗
                  </a>
                </p>
                <p className="text-text-secondary leading-relaxed">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-2xl font-display font-bold text-text-heading mb-4">
            <span className="text-warm font-mono text-lg mr-2">04</span>
            {t('cookiesTitle')}
          </h2>
          <div className="space-y-3 pl-8 border-l border-deep-border">
            <p className="text-text-secondary leading-relaxed">{t('cookiesIntro')}</p>
            <ul className="space-y-2">
              {(['cookie1', 'cookie2'] as const).map((key) => (
                <li key={key} className="flex gap-2 text-text-secondary">
                  <span className="text-warm mt-1 shrink-0">—</span>
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
            <p className="text-text-secondary leading-relaxed">{t('cookiesNote')}</p>
          </div>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-2xl font-display font-bold text-text-heading mb-4">
            <span className="text-warm font-mono text-lg mr-2">05</span>
            {t('retentionTitle')}
          </h2>
          <div className="space-y-3 pl-8 border-l border-deep-border">
            <p className="text-text-secondary leading-relaxed">{t('retention1')}</p>
            <p className="text-text-secondary leading-relaxed">{t('retention2')}</p>
          </div>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-2xl font-display font-bold text-text-heading mb-4">
            <span className="text-warm font-mono text-lg mr-2">06</span>
            {t('rightsTitle')}
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4 pl-8">{t('rightsIntro')}</p>
          <ul className="space-y-2 pl-8 border-l border-deep-border">
            {(['right1', 'right2', 'right3', 'right4', 'right5'] as const).map((key) => (
              <li key={key} className="flex gap-2 text-text-secondary">
                <span className="text-warm mt-1 shrink-0">—</span>
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section className="border-t border-deep-border pt-10">
          <h2 className="text-2xl font-display font-bold text-text-heading mb-4">
            {t('contactTitle')}
          </h2>
          <p className="text-text-secondary leading-relaxed mb-3">{t('contactText')}</p>
          <a
            href="mailto:privacy@jamelna.com"
            className="text-primary hover:text-primary-light transition-colors font-mono"
          >
            privacy@jamelna.com
          </a>
        </section>

      </div>
    </PageWrapper>
  );
}
