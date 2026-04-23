import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTrueCostData } from '@/lib/ai-true-cost/data';
import { computeBreakdown } from '@/lib/ai-true-cost/math';
import { Calculator } from '@/components/ai-true-cost/Calculator';
import { Hero } from '@/components/ai-true-cost/Hero';
import { TrustStamp } from '@/components/ai-true-cost/TrustStamp';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ scenario?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { scenario } = await searchParams;
  const scenarioParam = scenario ?? 'chatgpt-plus';

  const ogUrl = `/api/og/true-cost?scenario=${encodeURIComponent(scenarioParam)}`;

  return {
    title: 'The True Cost of AI | Jamelna',
    description:
      'Discover the real, unsubsidized cost of the AI tools you use every day. Interactive calculator with cited sources for ChatGPT, Claude, Gemini, and more.',
    openGraph: {
      title: 'The True Cost of AI',
      description:
        'See what ChatGPT, Claude, and other AI tools would cost without billions in investor subsidies.',
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: 'The True Cost of AI — interactive calculator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The True Cost of AI',
      description:
        'See what ChatGPT, Claude, and other AI tools would cost without billions in investor subsidies.',
      images: [ogUrl],
    },
  };
}

export default async function AiTrueCostPage({ params }: PageProps) {
  const { locale } = await params;
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
            <Suspense fallback={<p className="text-text-muted text-sm">Loading calculator&#8230;</p>}>
              <Calculator
                scenarios={data.scenarios}
                productsById={productsById}
                sources={data.sources}
              />
            </Suspense>
          </div>
        </section>
      </div>

      {/* Trust footer */}
      <TrustStamp
        lastVerified={data.subsidyConstants.last_verified}
        locale={locale}
      />
    </main>
  );
}
