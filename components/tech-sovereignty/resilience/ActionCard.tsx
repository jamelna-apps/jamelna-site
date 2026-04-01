'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Tool {
  name: string;
  url: string;
  replaces?: string;
  platforms: string[];
  foss: boolean;
}

interface ActionCardProps {
  actionId: string;
  pillar: string;
  duration: string;
  tier: 1 | 2 | 3;
  tools: Tool[];
  stepCount: number;
  color: 'emerald' | 'cyan' | 'amber' | 'rose' | 'violet';
  relatedTrack?: string;
  locale: string;
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

// Pillar key map (kebab-case IDs → camelCase translation keys)
const pillarKeyMap: Record<string, string> = {
  'secure-communication': 'secureCommunication',
  'data-preservation': 'dataPreservation',
  'infrastructure-independence': 'infrastructureIndependence',
  'operational-security': 'operationalSecurity',
  'community-organizing': 'communityOrganizing',
};

const tierConfig = {
  1: {
    label: 'Immediate',
    classes: 'bg-green-500/20 text-green-300',
  },
  2: {
    label: 'Intermediate',
    classes: 'bg-blue-500/20 text-blue-300',
  },
  3: {
    label: 'Advanced',
    classes: 'bg-purple-500/20 text-purple-300',
  },
};

const platformIcons: Record<string, React.ReactNode> = {
  android: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-label="Android">
      <path d="M17.523 15.341a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-9.546 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM3.513 8.25l-.932-1.714a.375.375 0 0 1 .655-.366l.944 1.733A10.44 10.44 0 0 1 12 6c1.394 0 2.723.273 3.94.77L16.82 5.17a.375.375 0 0 1 .655.366l-.932 1.714C18.7 8.516 20 10.752 20 13.25H4c0-2.498 1.3-4.734 3.513-5.936zM4 14.75v3a1.25 1.25 0 0 0 2.5 0v-3H4zm13.5 0v3a1.25 1.25 0 0 0 2.5 0v-3H17.5z" />
    </svg>
  ),
  ios: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-label="iOS">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  ),
  windows: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-label="Windows">
      <path d="M3 5.557L10.325 4.5v7.17H3V5.557zm0 12.886L10.325 19.5V12.5H3v5.943zM11.025 4.395L21 3v8.67h-9.975V4.395zm0 15.21V12.5H21V21l-9.975-1.395z" />
    </svg>
  ),
  macos: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-label="macOS">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm1.5 3.5c-.828 0-1.5.672-1.5 1.5S12.672 10.5 13.5 10.5 15 9.828 15 9s-.672-1.5-1.5-1.5zM9 9.5C7.895 9.5 7 10.395 7 11.5c0 .868.556 1.604 1.333 1.878L8 17h2l.333-3.5H11v-2H9.5C9.224 11.5 9 11.276 9 11s.224-.5.5-.5H11V9.5H9zm4 1c0 .276-.224.5-.5.5h-1v2h.5L12.333 17h1.834L14.5 13h.5c1.105 0 2-.895 2-2v-.5h-4v.5l.5-.5z" />
    </svg>
  ),
  linux: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-label="Linux">
      <path d="M12 2c-1.1 0-2 .9-2 2 0 .37.1.71.26 1.01C8.34 5.7 7 7.71 7 10v4c0 2.21 1.79 4 4 4h2c2.21 0 4-1.79 4-4v-4c0-2.29-1.34-4.3-3.26-4.99.16-.3.26-.64.26-1.01 0-1.1-.9-2-2-2zm-1 15.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  ),
  web: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Web">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
};

export function ActionCard({
  actionId,
  pillar,
  duration,
  tier,
  tools,
  stepCount,
  color,
  relatedTrack,
  locale,
}: ActionCardProps) {
  const t = useTranslations('techSovereignty');
  const [expanded, setExpanded] = useState(false);
  const colors = colorClasses[color];
  const tierInfo = tierConfig[tier];

  const pillarKey = pillarKeyMap[pillar] ?? pillar;
  const baseKey = `resilience.pillars.${pillarKey}.actions.${actionId}`;

  return (
    <div
      className={`bg-zinc-800 border ${colors.border} ${colors.hoverBorder} rounded-xl transition-all hover:shadow-lg`}
    >
      {/* Collapsed header — always visible */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full text-left p-5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-500 rounded-xl"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
                {duration}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tierInfo.classes}`}>
                Tier {tier} — {tierInfo.label}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-white text-lg mb-1">
              {t(`${baseKey}.title`)}
            </h3>

            {/* Protects one-liner */}
            <p className="text-sm text-zinc-500 mb-3">
              <span className="text-zinc-400 font-medium">Protects: </span>
              {t(`${baseKey}.protects`)}
            </p>

            {/* Tool names inline */}
            <div className="flex flex-wrap gap-1.5">
              {tools.map((tool) => (
                <span
                  key={tool.name}
                  className="text-sm bg-zinc-700/60 text-zinc-300 px-2 py-0.5 rounded"
                >
                  {tool.name}
                </span>
              ))}
            </div>
          </div>

          {/* Expand/collapse chevron */}
          <div className={`flex-shrink-0 w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
            <svg className={`w-4 h-4 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-5 pb-5 border-t border-zinc-700/60 pt-4 space-y-5">
          {/* Description */}
          <p className="text-zinc-300 text-base leading-relaxed">
            {t(`${baseKey}.description`)}
          </p>

          {/* Step-by-step instructions */}
          {stepCount > 0 && (
            <div>
              <h4 className={`text-sm font-semibold uppercase tracking-wide ${colors.text} mb-3`}>
                Steps
              </h4>
              <ol className="space-y-3">
                {Array.from({ length: stepCount }, (_, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-7 h-7 ${colors.bg} ${colors.text} rounded-full flex items-center justify-center text-sm font-bold`}>
                      {i + 1}
                    </span>
                    <span className="text-zinc-300 text-base pt-0.5 leading-relaxed">
                      {t(`${baseKey}.steps.${i}`)}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Tools */}
          {tools.length > 0 && (
            <div>
              <h4 className={`text-sm font-semibold uppercase tracking-wide ${colors.text} mb-3`}>
                Tools
              </h4>
              <div className="space-y-2">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center justify-between bg-zinc-900/50 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-base font-medium ${colors.text} hover:underline`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tool.name}
                      </a>
                      {tool.replaces && (
                        <span className="text-sm text-zinc-500 hidden sm:inline">
                          replaces {tool.replaces}
                        </span>
                      )}
                      {tool.foss && (
                        <span className="text-xs bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">
                          FOSS
                        </span>
                      )}
                    </div>
                    {/* Platform icons */}
                    <div className="flex items-center gap-1 text-zinc-500 flex-shrink-0">
                      {tool.platforms.map((platform) => (
                        <span key={platform} title={platform}>
                          {platformIcons[platform.toLowerCase()] ?? (
                            <span className="text-xs">{platform}</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related track link */}
          {relatedTrack && (
            <div className="pt-1">
              <a
                href={`/${locale}/tech-sovereignty/${relatedTrack}`}
                className={`inline-flex items-center gap-1.5 text-base ${colors.text} hover:underline`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                {t('resilience.viewRelatedTrack')}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActionCard;
