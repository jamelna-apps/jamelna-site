'use client';

import React, { useState, useEffect, useRef } from 'react';
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
    <div className="bg-canvas-raised border border-orange-500/30 rounded-xl px-6 py-5 inline-block">
      <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
        Since you opened this page, AI companies have subsidized users like you:
      </p>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="font-mono text-3xl font-bold text-orange-300 tabular-nums tracking-tight"
      >
        ${formatted} <span className="text-orange-500 text-xl">▲</span>
      </p>
      <p className="text-xs text-text-muted mt-2">
        Based on industry annual losses.{' '}
        <a
          href="#methodology"
          className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors"
        >
          See methodology →
        </a>
      </p>
    </div>
  );
}
