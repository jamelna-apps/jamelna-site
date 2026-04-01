'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface PillarCardProps {
  pillarId: string;
  accentColor: 'emerald' | 'cyan' | 'amber' | 'rose' | 'violet';
  actionCount: number;
  icon: React.ReactNode;
}

const colorClasses = {
  emerald: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/50',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300',
    callout: 'border-l-2 border-emerald-500/50 pl-3',
  },
  cyan: {
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/30',
    hoverBorder: 'hover:border-cyan-500/50',
    text: 'text-cyan-400',
    badge: 'bg-cyan-500/20 text-cyan-300',
    callout: 'border-l-2 border-cyan-500/50 pl-3',
  },
  amber: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/50',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300',
    callout: 'border-l-2 border-amber-500/50 pl-3',
  },
  rose: {
    bg: 'bg-rose-500/20',
    border: 'border-rose-500/30',
    hoverBorder: 'hover:border-rose-500/50',
    text: 'text-rose-400',
    badge: 'bg-rose-500/20 text-rose-300',
    callout: 'border-l-2 border-rose-500/50 pl-3',
  },
  violet: {
    bg: 'bg-violet-500/20',
    border: 'border-violet-500/30',
    hoverBorder: 'hover:border-violet-500/50',
    text: 'text-violet-400',
    badge: 'bg-violet-500/20 text-violet-300',
    callout: 'border-l-2 border-violet-500/50 pl-3',
  },
};

// Pillar key map (kebab-case IDs → camelCase translation keys)
const pillarKeyMap: Record<string, string> = {
  'secure-communication': 'secureCommunication',
  'data-preservation': 'dataPreservation',
  'infrastructure-independence': 'infrastructureIndependence',
  'operational-security': 'operationalSecurity',
  'community-organizing': 'communityOrganizing',
};

export function PillarCard({ pillarId, accentColor, actionCount, icon }: PillarCardProps) {
  const t = useTranslations('techSovereignty');
  const colors = colorClasses[accentColor];
  const anchorId = `pillar-${pillarId}`;
  const pillarKey = pillarKeyMap[pillarId] ?? pillarId;

  const handleClick = () => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`group w-full text-left bg-zinc-800 border ${colors.border} ${colors.hoverBorder} rounded-xl p-5 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900`}
    >
      {/* Icon + title row */}
      <div className="flex items-start gap-4 mb-3">
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0 ${colors.text}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-white text-base leading-tight">
              {t(`resilience.pillars.${pillarKey}.title`)}
            </h3>
          </div>
          {/* Action count badge */}
          <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
            {actionCount} {actionCount === 1 ? 'action' : 'actions'}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
        {t(`resilience.pillars.${pillarKey}.description`)}
      </p>

      {/* Priority callout */}
      <div className={`${colors.callout} bg-zinc-900/40 rounded-r-lg py-2 pr-3`}>
        <p className="text-xs text-zinc-500 mb-0.5">If you only do one thing:</p>
        <p className="text-sm text-zinc-300">
          {t(`resilience.pillars.${pillarKey}.priority`)}
        </p>
      </div>

      {/* Scroll cue */}
      <div className="mt-4 pt-3 border-t border-zinc-700 flex items-center justify-between">
        <span className="text-xs text-zinc-500">{t('resilience.viewActions')}</span>
        <span className={`text-xs ${colors.text} flex items-center gap-1 group-hover:gap-2 transition-all`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
    </button>
  );
}

export default PillarCard;
