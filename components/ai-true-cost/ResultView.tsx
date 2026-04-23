'use client';

import React from 'react';
import type { Product, SourcesMap } from '@/lib/ai-true-cost/types';
import { computeBreakdown, stackWrapper } from '@/lib/ai-true-cost/math';
import { Citation } from './Citation';

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
    <div className="space-y-6">
      {/* Breakdown card */}
      <div className="bg-canvas-raised border border-canvas-border rounded-xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 font-mono">
          {product.name.toUpperCase()} — MONTHLY TRUE COST
        </h2>

        <table className="w-full font-mono text-sm">
          <tbody>
            {/* You pay row */}
            <tr className="border-b border-canvas-border">
              <td className="py-2 text-text-secondary w-3/4">You pay</td>
              <td className="py-2 text-right text-white font-medium">
                {usd(breakdown.price_paid_usd)}
              </td>
            </tr>

            {/* Separator */}
            <tr>
              <td colSpan={2} className="py-1">
                <div className="h-px bg-canvas-border" />
              </td>
            </tr>

            {/* Four cost component rows */}
            {COMPONENT_KEYS.map((key) => {
              const comp = product.cost_components[key];
              const value = breakdown[`${key}_usd` as keyof typeof breakdown] as number;
              const citedSources = comp?.sources ? resolveSources(comp.sources, sources) : [];

              return (
                <tr key={key} className="border-b border-canvas-border/50">
                  <td className="py-2 text-text-secondary">
                    <span className="mr-2">{COMPONENT_LABELS[key]}</span>
                    {citedSources.map(({ id, source }) => (
                      <Citation key={id} source={source} />
                    ))}
                  </td>
                  <td className="py-2 text-right text-text-secondary">
                    {usd(value)}
                  </td>
                </tr>
              );
            })}

            {/* Separator */}
            <tr>
              <td colSpan={2} className="py-1">
                <div className="h-px bg-orange-500/30" />
              </td>
            </tr>

            {/* True cost row */}
            <tr>
              <td className="py-2 font-bold text-white">True cost</td>
              <td className="py-2 text-right font-bold text-orange-300 text-base">
                {usd(breakdown.true_cost_usd)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Subsidy callout */}
      {breakdown.subsidy_usd > 0 && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5">
          <p className="text-sm font-semibold text-orange-200 mb-1">
            You are being subsidized
          </p>
          <p className="text-text-secondary text-sm">
            Someone else covers{' '}
            <span className="text-orange-300 font-mono font-semibold">
              {usd(breakdown.subsidy_usd)}/month
            </span>{' '}
            of your costs — a{' '}
            <span className="text-orange-300 font-mono font-semibold">
              {breakdown.subsidy_multiple.toFixed(1)}×
            </span>{' '}
            subsidy on what you pay.
          </p>
        </div>
      )}

      {/* Double-subsidy stack */}
      {stacked && wrapped && wrappedBreakdown && (
        <div className="bg-canvas-raised border border-orange-500/20 rounded-xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">
            Double-subsidy stack
          </h3>
          <p className="text-text-secondary text-sm mb-4">
            {product.name} is built on top of {wrapped.name}. You&apos;re receiving subsidies
            from two layers simultaneously.
          </p>

          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">{product.name} subsidy</span>
              <span className="text-text-secondary">{usd(breakdown.subsidy_usd)}/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">{wrapped.name} subsidy</span>
              <span className="text-text-secondary">{usd(wrappedBreakdown.subsidy_usd)}/mo</span>
            </div>
            <div className="h-px bg-orange-500/20 my-1" />
            <div className="flex justify-between font-bold">
              <span className="text-orange-300">Combined subsidy</span>
              <span className="text-orange-300">{usd(stacked.subsidy_usd)}/mo</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
