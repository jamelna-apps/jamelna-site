'use client';

import React from 'react';
import type { Product, SourcesMap } from '@/lib/ai-true-cost/types';
import { computeBreakdown, stackWrapper } from '@/lib/ai-true-cost/math';
import { Citation } from './Citation';
import { ShareBar } from './ShareBar';

interface ResultViewProps {
  product: Product;
  /** The product that `product` wraps (e.g. OpenAI under MagicSchool) */
  wrapped?: Product;
  sources: SourcesMap;
}

function usd(n: number) {
  return `$${n.toFixed(2)}`;
}

/** Resolve source ids from a list to Source objects, ignoring unknown ids */
function resolveSources(ids: string[], sources: SourcesMap) {
  return ids.flatMap((id) => (sources[id] ? [{ id, source: sources[id] }] : []));
}

const COMPONENT_LABELS: Record<string, string> = {
  compute: 'Compute (GPU-hours × cloud)',
  training_amortization: 'Training amortization',
  energy_water: 'Energy + water externalities',
  investor_subsidy: 'Investor subsidy',
};

const COMPONENT_KEYS = ['compute', 'training_amortization', 'energy_water', 'investor_subsidy'] as const;

/**
 * Renders the full cost breakdown table for a product, a subsidy callout,
 * and optionally a double-subsidy stack card when a wrapped product is provided.
 */
export function ResultView({ product, wrapped, sources }: ResultViewProps) {
  const breakdown = computeBreakdown(product);
  const wrappedBreakdown = wrapped ? computeBreakdown(wrapped) : undefined;
  const stacked = wrappedBreakdown ? stackWrapper(breakdown, wrappedBreakdown) : undefined;

  return (
    <div className="space-y-8">
      {/* Breakdown card */}
      <div className="bg-canvas-raised border border-canvas-border rounded-2xl p-8 md:p-10">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
            Monthly true cost
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {product.name}
          </h2>
        </div>

        <table className="w-full text-base">
          <tbody>
            {/* You pay row */}
            <tr className="border-b border-canvas-border">
              <td className="py-4 text-text-secondary">You pay</td>
              <td className="py-4 text-right text-white font-mono font-medium">
                {usd(breakdown.price_paid_usd)}
              </td>
            </tr>

            {/* Four cost component rows */}
            {COMPONENT_KEYS.map((key, idx) => {
              const comp = product.cost_components[key];
              const value = breakdown[`${key}_usd` as keyof typeof breakdown] as number;
              const citedSources = comp?.sources ? resolveSources(comp.sources, sources) : [];
              const isLast = idx === COMPONENT_KEYS.length - 1;

              return (
                <tr
                  key={key}
                  className={isLast ? '' : 'border-b border-canvas-border/60'}
                >
                  <td className="py-4 text-text-secondary">
                    <div className="flex items-center flex-wrap gap-2">
                      <span>{COMPONENT_LABELS[key]}</span>
                      <div className="inline-flex gap-1">
                        {citedSources.map(({ id, source }) => (
                          <Citation key={id} source={source} />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-right text-text-secondary font-mono">
                    {usd(value)}
                  </td>
                </tr>
              );
            })}

            {/* True cost row */}
            <tr className="border-t-2 border-orange-500/40">
              <td className="pt-6 font-bold text-white text-lg">True cost</td>
              <td className="pt-6 text-right font-bold text-orange-300 text-2xl font-mono">
                {usd(breakdown.true_cost_usd)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Subsidy callout */}
      {breakdown.subsidy_usd > 0 && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-7 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-300 mb-3">
            You are being subsidized
          </p>
          <p className="text-text-primary text-lg leading-relaxed">
            Someone else covers{' '}
            <span className="text-orange-300 font-mono font-bold">
              {usd(breakdown.subsidy_usd)}/month
            </span>{' '}
            of your costs — a{' '}
            <span className="text-orange-300 font-mono font-bold">
              {breakdown.subsidy_multiple.toFixed(1)}×
            </span>{' '}
            subsidy on what you pay.
          </p>
        </div>
      )}

      {/* Share bar */}
      <ShareBar product={product} breakdown={breakdown} />

      {/* Double-subsidy stack */}
      {stacked && wrapped && wrappedBreakdown && (
        <div className="bg-canvas-raised border border-orange-500/30 rounded-2xl p-7 md:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-orange-400 mb-4">
            Double-subsidy stack
          </h3>
          <p className="text-text-secondary text-base leading-relaxed mb-6">
            {product.name} is built on top of {wrapped.name}. You&apos;re receiving subsidies
            from two layers simultaneously.
          </p>

          <div className="space-y-3 font-mono text-base">
            <div className="flex justify-between py-2">
              <span className="text-text-muted">{product.name} subsidy</span>
              <span className="text-text-secondary">{usd(breakdown.subsidy_usd)}/mo</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-text-muted">{wrapped.name} subsidy</span>
              <span className="text-text-secondary">{usd(wrappedBreakdown.subsidy_usd)}/mo</span>
            </div>
            <div className="h-px bg-orange-500/30 my-2" />
            <div className="flex justify-between py-2 text-lg font-bold">
              <span className="text-orange-300">Combined subsidy</span>
              <span className="text-orange-300">{usd(stacked.subsidy_usd)}/mo</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
