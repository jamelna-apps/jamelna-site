'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { subsidyPerSecond } from '@/lib/ai-true-cost/counter';

interface SubsidyCounterProps {
  /** Annual industry subsidy in USD (from subsidy-constants.yaml) */
  annualSubsidyUsd: number;
}

/**
 * Live counter showing how much AI companies have subsidized users
 * since the page was opened. Updates every 100ms.
 */
export function SubsidyCounter({ annualSubsidyUsd }: SubsidyCounterProps) {
  const t = useTranslations('trueCost.hero');
  const locale = useLocale();
  const startRef = useRef<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    startRef.current = Date.now();

    const interval = setInterval(() => {
      setElapsedMs(Date.now() - (startRef.current ?? Date.now()));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const perSecond = subsidyPerSecond(annualSubsidyUsd);
  const amount = perSecond * (elapsedMs / 1000);

  const formatted = amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="bg-canvas-raised border border-orange-500/30 rounded-2xl px-8 py-7 md:px-10 md:py-8 max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-text-muted mb-4">
        {t('counterLabel')}
      </p>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="font-mono text-4xl md:text-6xl font-bold text-orange-300 tabular-nums tracking-tight leading-none mb-4"
      >
        ${formatted}
        <span className="text-orange-500/70 text-2xl md:text-3xl ml-2">▲</span>
      </p>
      <p className="text-sm text-text-muted leading-relaxed">
        Based on industry annual losses.{' '}
        <Link
          href={`/${locale}/ai-true-cost/methodology`}
          className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors"
        >
          {t('counterMethodologyLink')}
        </Link>
      </p>
    </div>
  );
}
