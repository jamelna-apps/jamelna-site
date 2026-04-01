'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface TierSelectorProps {
  activeTier: number | null;
  onSelect: (tier: number | null) => void;
}

const tierColors = [
  // Tier 1
  {
    border: 'border-green-500/30',
    activeBorder: 'border-green-500/70',
    activeBg: 'bg-green-500/10',
    iconBg: 'bg-green-500/20',
    iconText: 'text-green-400',
    text: 'text-green-400',
  },
  // Tier 2
  {
    border: 'border-blue-500/30',
    activeBorder: 'border-blue-500/70',
    activeBg: 'bg-blue-500/10',
    iconBg: 'bg-blue-500/20',
    iconText: 'text-blue-400',
    text: 'text-blue-400',
  },
  // Tier 3
  {
    border: 'border-purple-500/30',
    activeBorder: 'border-purple-500/70',
    activeBg: 'bg-purple-500/10',
    iconBg: 'bg-purple-500/20',
    iconText: 'text-purple-400',
    text: 'text-purple-400',
  },
];

const tierIcons = [
  // Tier 1 — Shield
  <svg key="shield" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // Tier 2 — Wrench
  <svg key="wrench" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // Tier 3 — Globe/mesh
  <svg key="globe" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

export function TierSelector({ activeTier, onSelect }: TierSelectorProps) {
  const t = useTranslations('techSovereignty');

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((tier) => {
          const isActive = activeTier === tier;
          const c = tierColors[tier - 1];

          return (
            <button
              key={tier}
              onClick={() => onSelect(isActive ? null : tier)}
              className={`group text-left rounded-xl border-2 p-5 transition-all focus:outline-none focus:ring-2 focus:ring-canvas-border focus:ring-offset-2 focus:ring-offset-canvas ${
                isActive
                  ? `${c.activeBorder} ${c.activeBg}`
                  : `${c.border} bg-canvas-raised hover:${c.activeBorder} hover:bg-canvas-raised/70`
              }`}
              aria-pressed={isActive}
            >
              <div className={`w-12 h-12 ${c.iconBg} rounded-xl flex items-center justify-center mb-4 ${c.iconText}`}>
                {tierIcons[tier - 1]}
              </div>
              <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${c.text}`}>
                Tier {tier}
              </div>
              <h3 className="font-bold text-text-heading text-lg mb-1">
                {t(`resilience.tiers.${tier}.title`)}
              </h3>
              <p className="text-text-secondary text-base mb-3">
                {t(`resilience.tiers.${tier}.subtitle`)}
              </p>
              <span className={`inline-block text-sm px-2.5 py-1 rounded-full font-medium ${
                isActive
                  ? `${c.iconBg} ${c.text}`
                  : 'bg-canvas-border/60 text-text-secondary'
              }`}>
                {t(`resilience.tiers.${tier}.audience`)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Show All button */}
      {activeTier !== null && (
        <div className="flex justify-center">
          <button
            onClick={() => onSelect(null)}
            className="text-sm text-text-secondary hover:text-text-heading transition-colors underline underline-offset-2"
          >
            {t('resilience.showAllTiers')}
          </button>
        </div>
      )}
    </div>
  );
}

export default TierSelector;
