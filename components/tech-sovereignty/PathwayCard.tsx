'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export interface PathwayCardProps {
  slug: string;
  title: string;
  description: string;
  outcome: string;
  timeEstimate: string;
  tracks: string[];
  totalCheckpoints: number;
  completedCheckpoints?: number;
  color: 'sky' | 'violet' | 'amber' | 'green' | 'orange' | 'rose';
  icon: React.ReactNode;
  locale: string;
}

const colorClasses = {
  sky: {
    bg: 'bg-sky-500/20',
    border: 'border-sky-500/30 hover:border-sky-500/60',
    text: 'text-sky-400',
    progress: 'bg-sky-500',
  },
  violet: {
    bg: 'bg-violet-500/20',
    border: 'border-violet-500/30 hover:border-violet-500/60',
    text: 'text-violet-400',
    progress: 'bg-violet-500',
  },
  amber: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30 hover:border-amber-500/60',
    text: 'text-amber-400',
    progress: 'bg-amber-500',
  },
  green: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/30 hover:border-green-500/60',
    text: 'text-green-400',
    progress: 'bg-green-500',
  },
  orange: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30 hover:border-orange-500/60',
    text: 'text-orange-400',
    progress: 'bg-orange-500',
  },
  rose: {
    bg: 'bg-rose-500/20',
    border: 'border-rose-500/30 hover:border-rose-500/60',
    text: 'text-rose-400',
    progress: 'bg-rose-500',
  },
};

const trackLabels: Record<string, string> = {
  networking: 'Networking',
  'self-hosted': 'Self-Hosted',
  'ai-llm': 'AI/LLM',
  'app-dev': 'App Dev',
  'linux-foss': 'Linux/FOSS',
  'digital-rights': 'Digital Rights',
  community: 'Community',
};

export function PathwayCard({
  slug,
  title,
  description,
  outcome,
  timeEstimate,
  tracks,
  totalCheckpoints,
  completedCheckpoints = 0,
  color,
  icon,
  locale,
}: PathwayCardProps) {
  const router = useRouter();
  const colors = colorClasses[color];
  const progressPercent = totalCheckpoints > 0 ? (completedCheckpoints / totalCheckpoints) * 100 : 0;
  const hasStarted = completedCheckpoints > 0;

  const handleClick = () => {
    router.push(`/${locale}/tech-sovereignty/pathways/${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className={`block bg-zinc-800 border ${colors.border} rounded-xl p-6 transition-all hover:shadow-lg group cursor-pointer`}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-white/90">
            {title}
          </h3>
          <p className="text-zinc-400 text-sm line-clamp-2">{description}</p>
        </div>
      </div>

      {/* Outcome */}
      <div className="bg-zinc-900/50 rounded-lg p-3 mb-4">
        <p className="text-xs text-zinc-500 mb-1">What you&apos;ll achieve:</p>
        <p className="text-sm text-zinc-300">{outcome}</p>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 mb-4">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {timeEstimate}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          {totalCheckpoints} checkpoints
        </span>
      </div>

      {/* Tracks */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tracks.map((track) => (
          <span
            key={track}
            className="text-xs bg-zinc-700/50 text-zinc-300 px-2 py-1 rounded"
          >
            {trackLabels[track] || track}
          </span>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className={hasStarted ? colors.text : 'text-zinc-500'}>
            {hasStarted ? `${completedCheckpoints}/${totalCheckpoints} completed` : 'Not started'}
          </span>
          {hasStarted && (
            <span className={colors.text}>{Math.round(progressPercent)}%</span>
          )}
        </div>
        <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.progress} rounded-full transition-all duration-300`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-4 pt-4 border-t border-zinc-700">
        <span className={`text-sm ${colors.text} font-medium flex items-center gap-1 group-hover:gap-2 transition-all`}>
          {hasStarted ? 'Continue Learning' : 'Start Pathway'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default PathwayCard;
