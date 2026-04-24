'use client';

import React, { useState } from 'react';
import type { Product } from '@/lib/ai-true-cost/types';
import type { Breakdown } from '@/lib/ai-true-cost/math';
import { useTranslations, useLocale } from 'next-intl';
import { trackEvent } from '@/analytics/tracker';

interface ShareBarProps {
  product: Product;
  breakdown: Breakdown;
}

const SITE_URL = 'https://jamelna.com';

function buildShareText(product: Product, breakdown: Breakdown, locale: string): string {
  return (
    `${product.name}: you pay $${product.price_paid_usd}/mo. ` +
    `True cost: $${breakdown.true_cost_usd.toFixed(2)}/mo ` +
    `(${breakdown.subsidy_multiple.toFixed(1)}× subsidy). ` +
    `See: ${SITE_URL}/${locale}/ai-true-cost?scenario=${encodeURIComponent(product.id)}`
  );
}

/**
 * Three-button share bar: copy result, share on X, share on LinkedIn.
 * Wired into ResultView after the subsidy callout.
 */
export function ShareBar({ product, breakdown }: ShareBarProps) {
  const t = useTranslations('trueCost.shareBar');
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

  const shareText = buildShareText(product, breakdown, locale);

  const handleCopy = async () => {
    trackEvent('jamelna', 'share_clicked', { product: product.id, channel: 'copy' });
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select a temporary textarea
      const el = document.createElement('textarea');
      el.value = shareText;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tweetUrl =
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  const linkedInUrl =
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      `${SITE_URL}/${locale}/ai-true-cost?scenario=${encodeURIComponent(product.id)}`
    )}`;

  return (
    <div className="flex flex-wrap gap-3 pt-4">
      {/* Copy result */}
      <button
        type="button"
        onClick={handleCopy}
        className="
          inline-flex items-center gap-2
          text-xs font-medium font-mono
          px-4 py-2 rounded-lg border
          transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
          bg-canvas-raised border-canvas-border text-text-secondary
          hover:border-orange-500/40 hover:text-white
        "
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-400">{t('copied')}</span>
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {t('copy')}
          </>
        )}
      </button>

      {/* Share on X */}
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('jamelna', 'share_clicked', { product: product.id, channel: 'x' })}
        className="
          inline-flex items-center gap-2
          text-xs font-medium font-mono
          px-4 py-2 rounded-lg border
          transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
          bg-canvas-raised border-canvas-border text-text-secondary
          hover:border-orange-500/40 hover:text-white
        "
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        {t('shareX')}
      </a>

      {/* Share on LinkedIn */}
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('jamelna', 'share_clicked', { product: product.id, channel: 'linkedin' })}
        className="
          inline-flex items-center gap-2
          text-xs font-medium font-mono
          px-4 py-2 rounded-lg border
          transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
          bg-canvas-raised border-canvas-border text-text-secondary
          hover:border-orange-500/40 hover:text-white
        "
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        {t('shareLinkedIn')}
      </a>
    </div>
  );
}
