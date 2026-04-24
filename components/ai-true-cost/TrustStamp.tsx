'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/analytics/tracker';

const CHALLENGE_URL =
  'https://github.com/jamelna-apps/jamelna-site/issues/new?template=true-cost-challenge.md';

interface TrustStampProps {
  lastVerified: string;
  locale: string;
  onChallenge?: () => void;
}

/**
 * Footer bar with four trust-signaling items:
 * - Last verified date
 * - Link to methodology
 * - Link to changelog
 * - "Challenge a number" GitHub issue deep-link
 */
export function TrustStamp({ lastVerified, locale, onChallenge }: TrustStampProps) {
  const t = useTranslations('trueCost.trustStamp');
  return (
    <div className="border-t border-canvas-border bg-canvas-raised px-6 py-4">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-muted font-mono">
        {/* Last verified */}
        <span>
          {t('lastVerified')}{' '}
          <span className="text-text-secondary">{lastVerified}</span>
        </span>

        <span className="text-canvas-border hidden sm:inline">·</span>

        {/* Methodology link */}
        <Link
          href={`/${locale}/ai-true-cost/methodology`}
          className="text-orange-400 hover:text-orange-300 transition-colors underline underline-offset-2"
        >
          {t('methodology')}
        </Link>

        <span className="text-canvas-border hidden sm:inline">·</span>

        {/* Changelog link */}
        <Link
          href={`/${locale}/ai-true-cost/changelog`}
          className="text-orange-400 hover:text-orange-300 transition-colors underline underline-offset-2"
        >
          {t('changelog')}
        </Link>

        <span className="text-canvas-border hidden sm:inline">·</span>

        {/* Challenge link */}
        <a
          href={CHALLENGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-400 hover:text-orange-300 transition-colors underline underline-offset-2"
          onClick={() => {
            trackEvent('jamelna', 'challenge_clicked');
            onChallenge?.();
          }}
        >
          {t('challenge')}
        </a>
      </div>
    </div>
  );
}
