'use client';

import React from 'react';

interface ToolRecommendationProps {
  name: string;
  url: string;
  replaces?: string;
  platforms: string[];
  foss: boolean;
  color: 'emerald' | 'cyan' | 'amber' | 'rose' | 'violet';
}

const colorClasses = {
  emerald: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/50',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300',
  },
  cyan: {
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/30',
    hoverBorder: 'hover:border-cyan-500/50',
    text: 'text-cyan-400',
    badge: 'bg-cyan-500/20 text-cyan-300',
  },
  amber: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/50',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300',
  },
  rose: {
    bg: 'bg-rose-500/20',
    border: 'border-rose-500/30',
    hoverBorder: 'hover:border-rose-500/50',
    text: 'text-rose-400',
    badge: 'bg-rose-500/20 text-rose-300',
  },
  violet: {
    bg: 'bg-violet-500/20',
    border: 'border-violet-500/30',
    hoverBorder: 'hover:border-violet-500/50',
    text: 'text-violet-400',
    badge: 'bg-violet-500/20 text-violet-300',
  },
};

const platformIcons: Record<string, React.ReactNode> = {
  android: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.523 15.341a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-9.546 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM3.513 8.25l-.932-1.714a.375.375 0 0 1 .655-.366l.944 1.733A10.44 10.44 0 0 1 12 6c1.394 0 2.723.273 3.94.77L16.82 5.17a.375.375 0 0 1 .655.366l-.932 1.714C18.7 8.516 20 10.752 20 13.25H4c0-2.498 1.3-4.734 3.513-5.936zM4 14.75v3a1.25 1.25 0 0 0 2.5 0v-3H4zm13.5 0v3a1.25 1.25 0 0 0 2.5 0v-3H17.5z" />
    </svg>
  ),
  ios: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  ),
  windows: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 5.557L10.325 4.5v7.17H3V5.557zm0 12.886L10.325 19.5V12.5H3v5.943zM11.025 4.395L21 3v8.67h-9.975V4.395zm0 15.21V12.5H21V21l-9.975-1.395z" />
    </svg>
  ),
  macos: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  ),
  linux: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5m4 0h4m-4 0v4a2 2 0 002 2h4a2 2 0 002-2v-4m0 0h-4" />
    </svg>
  ),
  web: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
};

export function ToolRecommendation({
  name,
  url,
  replaces,
  platforms,
  foss,
  color,
}: ToolRecommendationProps) {
  const colors = colorClasses[color];

  return (
    <div className={`bg-zinc-800 border ${colors.border} ${colors.hoverBorder} rounded-lg px-3 py-2.5 transition-all`}>
      <div className="flex items-start justify-between gap-2">
        {/* Left: name + replaces */}
        <div className="min-w-0 flex-1">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-semibold ${colors.text} hover:underline block leading-tight truncate`}
          >
            {name}
          </a>
          {replaces && (
            <p className="text-xs text-zinc-500 mt-0.5 truncate">
              replaces {replaces}
            </p>
          )}
        </div>

        {/* Right: FOSS + platforms */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {foss && (
            <span className="text-xs bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded font-medium leading-none">
              FOSS
            </span>
          )}
          <div className="flex items-center gap-1 text-zinc-500">
            {platforms.map((platform) => (
              <span key={platform} title={platform} className="flex items-center">
                {platformIcons[platform.toLowerCase()] ?? (
                  <span className="text-xs leading-none">{platform.slice(0, 3)}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolRecommendation;
