import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { SubsidyCounter } from './SubsidyCounter';

interface HeroProps {
  annualSubsidyUsd: number;
  tagline: {
    productName: string;
    paid: number;
    trueCost: number;
  };
}

/**
 * Hero section for the AI True Cost page.
 * Renders the headline, tagline, CTA, and live subsidy counter.
 */
export async function Hero({ annualSubsidyUsd, tagline }: HeroProps) {
  const t = await getTranslations('trueCost.hero');
  return (
    <section className="pt-20 pb-20 md:pt-28 md:pb-24 px-6 bg-canvas-deep border-b border-canvas-border">
      <div className="max-w-5xl mx-auto">
        <hr className="heading-rule mb-6" />

        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.05] tracking-tight">
          {t('headline')}
        </h1>

        <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mb-12 leading-relaxed">
          {t('taglinePrefix')}{' '}
          <strong className="text-white whitespace-nowrap">
            ${(tagline.paid * 12).toLocaleString()}/year
          </strong>{' '}
          {t('taglineMiddle')}{' '}
          <strong className="text-white">{tagline.productName}</strong>.{' '}
          {t('taglineSuffix')}{' '}
          <strong className="text-orange-300 whitespace-nowrap">
            ${(tagline.trueCost * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}/year
          </strong>{' '}
          — an extra{' '}
          <strong className="text-orange-300 whitespace-nowrap">
            ${((tagline.trueCost - tagline.paid) * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}/year
          </strong>{' '}
          covered by investors.
        </p>

        <Link
          href="#calculator"
          className="
            inline-flex items-center gap-2
            bg-orange-500 hover:bg-orange-400 text-black
            px-8 py-4 rounded-lg font-semibold text-base
            transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
            mb-16
          "
        >
          {t('cta')}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

        <SubsidyCounter annualSubsidyUsd={annualSubsidyUsd} />
      </div>
    </section>
  );
}
