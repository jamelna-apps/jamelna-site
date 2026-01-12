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
    bg: 'bg-sky-500/20',
    border: 'border-sky-500/30',
    hoverBorder: 'hover:border-sky-500/50',
    text: 'text-sky-400',
    badge: 'bg-sky-500/20 text-sky-300',
  },
  violet: {
    bg: 'bg-violet-500/20',
    border: 'border-violet-500/30',
    hoverBorder: 'hover:border-violet-500/50',
    text: 'text-violet-400',
    badge: 'bg-violet-500/20 text-violet-300',
  },
  amber: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/50',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300',
  },
  green: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    hoverBorder: 'hover:border-green-500/50',
    text: 'text-green-400',
    badge: 'bg-green-500/20 text-green-300',
  },
  orange: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    hoverBorder: 'hover:border-orange-500/50',
    text: 'text-orange-400',
    badge: 'bg-orange-500/20 text-orange-300',
  },
  rose: {
    bg: 'bg-rose-500/20',
    border: 'border-rose-500/30',
    hoverBorder: 'hover:border-rose-500/50',
    text: 'text-rose-400',
    badge: 'bg-rose-500/20 text-rose-300',
  },
};

export function QuickWinCard({ quickWin, color, icon }: QuickWinCardProps) {
  const colors = colorClasses[color];

  return (
    <Link
      href={quickWin.link}
      className={`block bg-zinc-800 border ${colors.border} ${colors.hoverBorder} rounded-xl p-5 transition-all hover:shadow-lg group`}
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
            <span className="text-xs text-zinc-500">{quickWin.trackTitle}</span>
          </div>
          <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-violet-300 transition-colors">
            {quickWin.title}
          </h3>
          <p className="text-zinc-400 text-sm mb-3 line-clamp-2">
            {quickWin.description}
          </p>
          <div className="flex items-center gap-2 text-xs">
            <svg className={`w-4 h-4 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-zinc-300">{quickWin.outcome}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-zinc-700 flex items-center justify-between">
        <span className="text-xs text-zinc-500">Quick Win</span>
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
