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
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    hoverBorder: 'hover:border-terra/50',
    text: 'text-terra-light',
    badge: 'bg-terra/20 text-terra-light',
    callout: 'border-l-2 border-terra/50 pl-3',
  },
  cyan: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    hoverBorder: 'hover:border-terra/50',
    text: 'text-terra-light',
    badge: 'bg-terra/20 text-terra-light',
    callout: 'border-l-2 border-terra/50 pl-3',
  },
  amber: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    hoverBorder: 'hover:border-terra/50',
    text: 'text-terra-light',
    badge: 'bg-terra/20 text-terra-light',
    callout: 'border-l-2 border-terra/50 pl-3',
  },
  rose: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    hoverBorder: 'hover:border-terra/50',
    text: 'text-terra-light',
    badge: 'bg-terra/20 text-terra-light',
    callout: 'border-l-2 border-terra/50 pl-3',
  },
  violet: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    hoverBorder: 'hover:border-terra/50',
    text: 'text-terra-light',
    badge: 'bg-terra/20 text-terra-light',
    callout: 'border-l-2 border-terra/50 pl-3',
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
      className={`group w-full text-left bg-canvas-raised border ${colors.border} ${colors.hoverBorder} rounded-xl p-5 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-canvas-border focus:ring-offset-2 focus:ring-offset-canvas`}
    >
      {/* Icon + title row */}
      <div className="flex items-start gap-4 mb-3">
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0 ${colors.text}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-bold text-text-heading text-lg leading-tight">
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
      <p className="text-text-secondary text-base mb-4 line-clamp-2">
        {t(`resilience.pillars.${pillarKey}.description`)}
      </p>

      {/* Priority callout */}
      <div className={`${colors.callout} bg-canvas-deep/40 rounded-r-lg py-2.5 pr-3`}>
        <p className="text-sm text-text-muted mb-0.5">If you only do one thing:</p>
        <p className="text-base text-text-secondary">
          {t(`resilience.pillars.${pillarKey}.priority`)}
        </p>
      </div>

      {/* Scroll cue */}
      <div className="mt-4 pt-3 border-t border-canvas-border flex items-center justify-between">
        <span className="text-sm text-text-muted">{t('resilience.viewActions')}</span>
        <span className={`text-sm ${colors.text} flex items-center gap-1 group-hover:gap-2 transition-all`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
    </button>
  );
}

export default PillarCard;
