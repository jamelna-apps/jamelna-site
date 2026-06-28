'use client';

import React from 'react';
import Link from 'next/link';

export interface QuickWin {
  id: string;
  title: string;
  description: string;
  duration: string;
  track: string;
  trackTitle: string;
  outcome: string;
  link: string;
}

interface QuickWinCardProps {
  quickWin: QuickWin;
  color: 'sky' | 'violet' | 'amber' | 'green' | 'orange' | 'rose';
  icon: React.ReactNode;
}

const colorClasses = {
  sky: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    hoverBorder: 'hover:border-terra/50',
    text: 'text-terra-light',
    badge: 'bg-terra/20 text-terra-light',
  },
  violet: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    hoverBorder: 'hover:border-terra/50',
    text: 'text-terra-light',
    badge: 'bg-terra/20 text-terra-light',
  },
  amber: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    hoverBorder: 'hover:border-terra/50',
    text: 'text-terra-light',
    badge: 'bg-terra/20 text-terra-light',
  },
  green: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    hoverBorder: 'hover:border-terra/50',
    text: 'text-terra-light',
    badge: 'bg-terra/20 text-terra-light',
  },
  orange: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    hoverBorder: 'hover:border-terra/50',
    text: 'text-terra-light',
    badge: 'bg-terra/20 text-terra-light',
  },
  rose: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    hoverBorder: 'hover:border-terra/50',
    text: 'text-terra-light',
    badge: 'bg-terra/20 text-terra-light',
  },
};

export function QuickWinCard({ quickWin, color, icon }: QuickWinCardProps) {
  const colors = colorClasses[color];

  return (
    <Link
      href={quickWin.link}
      className={`block bg-canvas-raised border ${colors.border} ${colors.hoverBorder} rounded-xl p-5 transition-all hover:shadow-lg group`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge} font-medium`}>
              {quickWin.duration}
            </span>
            <span className="text-xs text-text-muted">{quickWin.trackTitle}</span>
          </div>
          <h3 className="font-display font-semibold text-text-heading text-lg mb-1 group-hover:text-terra-light transition-colors">
            {quickWin.title}
          </h3>
          <p className="text-text-secondary text-base mb-3 line-clamp-2">
            {quickWin.description}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <svg className={`w-4 h-4 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-text-secondary">{quickWin.outcome}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-canvas-border flex items-center justify-between">
        <span className="text-xs text-text-muted">Quick Win</span>
        <span className={`text-xs ${colors.text} font-medium flex items-center gap-1 group-hover:gap-2 transition-all`}>
          Start Now
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
