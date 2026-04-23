import React from 'react';
import Link from 'next/link';
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
export function Hero({ annualSubsidyUsd, tagline }: HeroProps) {
  return (
    <section className="pt-16 pb-12 px-6 bg-canvas-deep border-b border-canvas-border">
      <div className="max-w-5xl mx-auto">
        <hr className="heading-rule mb-4" />

        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          The True Cost of AI
        </h1>

        <p className="text-xl text-text-secondary max-w-2xl mb-8 leading-relaxed">
          You pay{' '}
          <strong className="text-white">${tagline.paid}/month</strong> for{' '}
          <strong className="text-white">{tagline.productName}</strong>.
          Without subsidies, it would cost you{' '}
          <strong className="text-orange-300">${tagline.trueCost}/month</strong>.
        </p>

        <Link
          href="#calculator"
          className="
            inline-flex items-center gap-2
            bg-orange-500 hover:bg-orange-400 text-white
            px-8 py-3 rounded-lg font-semibold
            transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
            mb-12
          "
        >
          See your true cost →
        </Link>

        <div>
          <SubsidyCounter annualSubsidyUsd={annualSubsidyUsd} />
        </div>
      </div>
    </section>
  );
}
