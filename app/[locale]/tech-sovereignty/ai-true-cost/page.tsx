import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTrueCostData } from '@/lib/ai-true-cost/data';
import { computeBreakdown } from '@/lib/ai-true-cost/math';
import { Calculator } from '@/components/ai-true-cost/Calculator';
import { Hero } from '@/components/ai-true-cost/Hero';

export const metadata: Metadata = {
  title: 'The True Cost of AI | Jamelna',
  description:
    'Discover the real, unsubsidized cost of the AI tools you use every day. Interactive calculator with cited sources for ChatGPT, Claude, Gemini, and more.',
};

export default async function AiTrueCostPage() {
  const data = await getTrueCostData();

  // Build a lookup map for the client-side calculator
  const productsById = Object.fromEntries(data.products.map((p) => [p.id, p]));

  // Compute featured tagline from ChatGPT Plus, with hard fallback
  const featuredProduct = productsById['chatgpt-plus'];
  const tagline = featuredProduct
    ? (() => {
        const bd = computeBreakdown(featuredProduct);
        return {
          productName: featuredProduct.name,
          paid: bd.price_paid_usd,
          trueCost: bd.true_cost_usd,
        };
      })()
    : { productName: 'ChatGPT Plus', paid: 20, trueCost: 287 };

  return (
    <main className="min-h-screen bg-canvas-deep text-white">
      {/* Hero */}
      <Hero
        annualSubsidyUsd={data.subsidyConstants.annual_industry_subsidy_usd}
        tagline={tagline}
      />

      {/* Calculator */}
      <div id="calculator">
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <Suspense fallback={<p className="text-text-muted text-sm">Loading calculator…</p>}>
              <Calculator
                scenarios={data.scenarios}
                productsById={productsById}
                sources={data.sources}
              />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}
