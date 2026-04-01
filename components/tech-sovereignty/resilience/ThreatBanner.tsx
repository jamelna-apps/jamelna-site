'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

type ThreatContext = 'concerned' | 'active' | 'immediate';

interface ThreatBannerProps {
  activeContext: ThreatContext | null;
  onSelect: (context: ThreatContext | null) => void;
}

const contextConfig: {
  id: ThreatContext;
  border: string;
  activeBorder: string;
  activeBg: string;
  iconBg: string;
  iconText: string;
  text: string;
  glowShadow: string;
}[] = [
  {
    id: 'concerned',
    border: 'border-zinc-600',
    activeBorder: 'border-zinc-400',
    activeBg: 'bg-zinc-700/30',
    iconBg: 'bg-zinc-700/60',
    iconText: 'text-zinc-300',
    text: 'text-zinc-300',
    glowShadow: 'shadow-zinc-500/20',
  },
  {
    id: 'active',
    border: 'border-amber-500/30',
    activeBorder: 'border-amber-500/70',
    activeBg: 'bg-amber-500/10',
    iconBg: 'bg-amber-500/20',
    iconText: 'text-amber-400',
    text: 'text-amber-400',
    glowShadow: 'shadow-amber-500/20',
  },
  {
    id: 'immediate',
    border: 'border-red-500/30',
    activeBorder: 'border-red-500/70',
    activeBg: 'bg-red-500/10',
    iconBg: 'bg-red-500/20',
    iconText: 'text-red-400',
    text: 'text-red-400',
    glowShadow: 'shadow-red-500/20',
  },
];

const contextIcons: Record<ThreatContext, React.ReactNode> = {
  concerned: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  active: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  immediate: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

export function ThreatBanner({ activeContext, onSelect }: ThreatBannerProps) {
  const t = useTranslations('techSovereignty');

  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-3 gap-3">
        {contextConfig.map((ctx) => {
          const isActive = activeContext === ctx.id;

          return (
            <button
              key={ctx.id}
              onClick={() => onSelect(isActive ? null : ctx.id)}
              aria-pressed={isActive}
              className={`group text-left rounded-xl border-2 px-4 py-3.5 transition-all focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900 ${
                isActive
                  ? `${ctx.activeBorder} ${ctx.activeBg} shadow-lg ${ctx.glowShadow}`
                  : `${ctx.border} bg-zinc-800 hover:${ctx.activeBorder} hover:bg-zinc-800/70`
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-9 h-9 ${ctx.iconBg} rounded-lg flex items-center justify-center ${ctx.iconText}`}>
                  {contextIcons[ctx.id]}
                </div>
                <div className="min-w-0">
                  <h4 className={`font-semibold text-sm leading-tight mb-1 ${isActive ? ctx.text : 'text-white'}`}>
                    {t(`resilience.contexts.${ctx.id}.title`)}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-snug">
                    {t(`resilience.contexts.${ctx.id}.description`)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Clear filter */}
      {activeContext !== null && (
        <div className="flex justify-end">
          <button
            onClick={() => onSelect(null)}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t('resilience.clearFilter')}
          </button>
        </div>
      )}
    </div>
  );
}

export default ThreatBanner;
