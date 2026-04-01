'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    const elements = ref.current?.querySelectorAll('.reveal, .reveal-clip, .reveal-fade, .reveal-mask, .reveal-slide-left, .reveal-slide-right');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}
import {
  ActionCard,
  TierSelector,
  PillarCard,
  ThreatBanner,
  ToolRecommendation,
} from '@/components/tech-sovereignty/resilience';
import {
  pillarConfigs,
  resilienceActions,
  getAllTools,
  getActionsByPillar,
  type ResiliencePillar,
  type ThreatTier,
} from '@/data/resilience-toolkit';

// ─── Pillar SVG Icons ─────────────────────────────────────────────────────────

const PillarIcons: Record<ResiliencePillar, React.ReactNode> = {
  'secure-communication': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 17a5 5 0 005-5"
      />
    </svg>
  ),
  'data-preservation': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 12H3a9 9 0 1018 0h-2M12 3v9m0 0l-3-3m3 3l3-3"
      />
      <ellipse cx="12" cy="6" rx="9" ry="3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6v6a9 9 0 0018 0V6"
      />
    </svg>
  ),
  'infrastructure-independence': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="4" width="20" height="6" rx="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="14" width="20" height="6" rx="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="7" r="1" fill="currentColor" />
      <circle cx="6" cy="17" r="1" fill="currentColor" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7h4M12 17h4" />
    </svg>
  ),
  'operational-security': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  'community-organizing': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
};

// ─── Section icons ─────────────────────────────────────────────────────────────

const SectionPillarIcon = ({ pillar }: { pillar: ResiliencePillar }) => (
  <div className="w-10 h-10 flex items-center justify-center">
    {PillarIcons[pillar]}
  </div>
);

// ─── Cross-link data ───────────────────────────────────────────────────────────

const crossLinks = [
  {
    slug: 'networking',
    color: 'violet' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    slug: 'self-hosted',
    color: 'amber' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12H3a9 9 0 1018 0h-2M12 3v9" />
      </svg>
    ),
  },
  {
    slug: 'digital-rights',
    color: 'cyan' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    slug: 'community',
    color: 'emerald' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const crossLinkColorMap = {
  violet: {
    border: 'border-violet-500/30',
    hoverBorder: 'hover:border-violet-500/50',
    iconBg: 'bg-violet-500/20',
    iconText: 'text-violet-400',
    text: 'text-violet-400',
  },
  amber: {
    border: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/50',
    iconBg: 'bg-amber-500/20',
    iconText: 'text-amber-400',
    text: 'text-amber-400',
  },
  cyan: {
    border: 'border-cyan-500/30',
    hoverBorder: 'hover:border-cyan-500/50',
    iconBg: 'bg-cyan-500/20',
    iconText: 'text-cyan-400',
    text: 'text-cyan-400',
  },
  emerald: {
    border: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/50',
    iconBg: 'bg-emerald-500/20',
    iconText: 'text-emerald-400',
    text: 'text-emerald-400',
  },
};

const pillarColorMap = {
  emerald: {
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    iconBg: 'bg-emerald-500/20',
    callout: 'border-l-4 border-emerald-500/50 bg-emerald-500/5',
    divider: 'border-emerald-500/20',
  },
  cyan: {
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    iconBg: 'bg-cyan-500/20',
    callout: 'border-l-4 border-cyan-500/50 bg-cyan-500/5',
    divider: 'border-cyan-500/20',
  },
  amber: {
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    iconBg: 'bg-amber-500/20',
    callout: 'border-l-4 border-amber-500/50 bg-amber-500/5',
    divider: 'border-amber-500/20',
  },
  rose: {
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    iconBg: 'bg-rose-500/20',
    callout: 'border-l-4 border-rose-500/50 bg-rose-500/5',
    divider: 'border-rose-500/20',
  },
  violet: {
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    iconBg: 'bg-violet-500/20',
    callout: 'border-l-4 border-violet-500/50 bg-violet-500/5',
    divider: 'border-violet-500/20',
  },
};

// ─── Pillar key map (kebab-case IDs → camelCase translation keys) ─────────────

const pillarKeyMap: Record<string, string> = {
  'secure-communication': 'secureCommunication',
  'data-preservation': 'dataPreservation',
  'infrastructure-independence': 'infrastructureIndependence',
  'operational-security': 'operationalSecurity',
  'community-organizing': 'communityOrganizing',
};

// ─── Cross-link slug map (kebab-case slugs → camelCase translation keys) ─────

const crossLinkKeyMap: Record<string, string> = {
  'networking': 'networking',
  'self-hosted': 'selfHosted',
  'digital-rights': 'digitalRights',
  'community': 'community',
};

// ─── Filtering helpers ────────────────────────────────────────────────────────

type ThreatContext = 'concerned' | 'active' | 'immediate' | null;

function getSortedActions(
  pillar: ResiliencePillar,
  activeTier: number | null,
  activeContext: ThreatContext,
) {
  let actions = getActionsByPillar(pillar);

  // Apply tier filter when one is explicitly selected
  if (activeTier !== null) {
    actions = actions.filter((a) => a.tier === activeTier);
  }

  // Re-order by context priority when no tier is locked
  if (activeTier === null && activeContext !== null) {
    const priority: Record<ThreatTier, number> = { 1: 0, 2: 1, 3: 2 };

    if (activeContext === 'active') {
      // Prioritize tier 2, then tier 1, then tier 3
      priority[2] = 0;
      priority[1] = 1;
      priority[3] = 2;
    } else if (activeContext === 'immediate') {
      // Prioritize tier 1 and tier 3 (immediate protection + advanced), tier 2 last
      priority[1] = 0;
      priority[3] = 1;
      priority[2] = 2;
    }
    // 'concerned': default order (tier 1 first) — keep defaults

    actions = [...actions].sort((a, b) => priority[a.tier] - priority[b.tier]);
  }

  return actions;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ResiliencePage() {
  const t = useTranslations('techSovereignty');
  const locale = useLocale();
  const containerRef = useScrollReveal();

  const [activeContext, setActiveContext] = useState<ThreatContext>(null);
  const [activeTier, setActiveTier] = useState<number | null>(null);
  const [toolFilter, setToolFilter] = useState<ResiliencePillar | 'all'>('all');

  // Derive all tools, optionally filtered by pillar
  const allTools = getAllTools();
  const filteredTools =
    toolFilter === 'all'
      ? allTools
      : allTools.filter((tool) => {
          // Find which actions use this tool and match the filter pillar
          return resilienceActions.some(
            (action) =>
              action.pillar === toolFilter &&
              action.tools.some((t) => t.name === tool.name),
          );
        });

  // Pillar tool color lookup: find the pillar color for a given tool
  const getToolColor = (toolName: string) => {
    const action = resilienceActions.find((a) =>
      a.tools.some((t) => t.name === toolName),
    );
    if (!action) return 'emerald' as const;
    const config = pillarConfigs.find((p) => p.id === action.pillar);
    return (config?.accentColor ?? 'emerald') as
      | 'emerald'
      | 'cyan'
      | 'amber'
      | 'rose'
      | 'violet';
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-canvas-deep text-text-heading">
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="pt-10 pb-8 px-6 bg-canvas-deep">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <Link
            href={`/${locale}/tech-sovereignty`}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-heading transition-colors mb-8 group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('resilience.hero.backLink')}
          </Link>

          <hr className="heading-rule" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-red-300 uppercase tracking-widest">
              {t('resilience.hero.eyebrow')}
            </span>
          </div>

          <h1 className="text-display-section font-display font-extrabold text-text-heading mb-4 leading-tight">
            {t('resilience.hero.title')}
          </h1>

          <p className="text-lg sm:text-xl text-red-300/90 font-semibold mb-4 max-w-2xl">
            {t('resilience.hero.subtitle')}
          </p>

          <p className="text-base text-text-secondary max-w-2xl leading-relaxed">
            {t('resilience.hero.description')}
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mt-10">
            <div>
              <div className="text-3xl font-black text-text-heading">{resilienceActions.length}</div>
              <div className="text-sm text-text-muted uppercase tracking-wide mt-0.5">
                {t('resilience.hero.statActions')}
              </div>
            </div>
            <div className="w-px bg-canvas-border self-stretch" />
            <div>
              <div className="text-3xl font-black text-text-heading">5</div>
              <div className="text-sm text-text-muted uppercase tracking-wide mt-0.5">
                {t('resilience.hero.statPillars')}
              </div>
            </div>
            <div className="w-px bg-canvas-border self-stretch" />
            <div>
              <div className="text-3xl font-black text-text-heading">3</div>
              <div className="text-sm text-text-muted uppercase tracking-wide mt-0.5">
                {t('resilience.hero.statTiers')}
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-20">

        {/* ── Threat Context Selector ────────────────────────────────────────── */}
        <section>
          <div className="mb-6">
            <h2 className="reveal-slide-left text-2xl font-bold text-text-heading mb-2">
              {t('resilience.contexts.sectionTitle')}
            </h2>
            <p className="text-text-secondary text-base">
              {t('resilience.contexts.sectionDescription')}
            </p>
          </div>
          <ThreatBanner activeContext={activeContext} onSelect={setActiveContext} />
        </section>

        {/* ── Tier Selector ──────────────────────────────────────────────────── */}
        <section>
          <div className="mb-6">
            <h2 className="reveal-slide-left text-2xl font-bold text-text-heading mb-2">
              {t('resilience.tiers.sectionTitle')}
            </h2>
            <p className="text-text-secondary text-base">
              {t('resilience.tiers.sectionDescription')}
            </p>
          </div>
          <TierSelector activeTier={activeTier} onSelect={setActiveTier} />
        </section>

        {/* ── Pillar Overview Grid ───────────────────────────────────────────── */}
        <section>
          <div className="mb-6">
            <h2 className="reveal-slide-left text-2xl font-bold text-text-heading mb-2">
              {t('resilience.pillarsOverview.title')}
            </h2>
            <p className="text-text-secondary text-base">
              {t('resilience.pillarsOverview.description')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillarConfigs.map((config, idx) => (
              <div key={config.id} className="reveal-fade" style={{ transitionDelay: `${idx * 80}ms` }}>
                <PillarCard
                  pillarId={config.id}
                  accentColor={config.accentColor}
                  actionCount={getActionsByPillar(config.id).length}
                  icon={PillarIcons[config.id]}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── Pillar Content Sections ────────────────────────────────────────── */}
        {pillarConfigs.map((config) => {
          const colors = pillarColorMap[config.accentColor];
          const sortedActions = getSortedActions(config.id, activeTier, activeContext);

          return (
            <section
              key={config.id}
              id={`pillar-${config.id}`}
              className="scroll-mt-8"
            >
              {/* Section header */}
              <div className={`flex items-center gap-4 mb-6 pb-4 border-b ${colors.divider}`}>
                <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center ${colors.text}`}>
                  <SectionPillarIcon pillar={config.id} />
                </div>
                <div>
                  <h2 className="reveal-slide-left text-2xl font-bold text-text-heading">
                    {t(`resilience.pillars.${pillarKeyMap[config.id]}.title`)}
                  </h2>
                  <p className="text-text-secondary text-sm mt-0.5">
                    {t(`resilience.pillars.${pillarKeyMap[config.id]}.description`)}
                  </p>
                </div>
              </div>

              {/* "If you only do one thing" callout */}
              <div className={`${colors.callout} rounded-r-xl px-5 py-4 mb-8`}>
                <p className={`text-sm font-semibold uppercase tracking-wide ${colors.text} mb-1`}>
                  {t('resilience.ifOnlyOneThingLabel')}
                </p>
                <p className="text-text-secondary text-base font-medium">
                  {t(`resilience.pillars.${pillarKeyMap[config.id]}.priority`)}
                </p>
              </div>

              {/* Actions grid */}
              {sortedActions.length === 0 ? (
                <div className="text-center py-12 text-text-muted text-sm">
                  {t('resilience.noActionsForFilter')}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedActions.map((action, actionIdx) => (
                    <div key={action.id} className="reveal-fade" style={{ transitionDelay: `${actionIdx * 60}ms` }}>
                      <ActionCard
                        actionId={action.id}
                        pillar={action.pillar}
                        duration={action.duration}
                        tier={action.tier as 1 | 2 | 3}
                        tools={action.tools}
                        stepCount={action.stepCount}
                        color={config.accentColor}
                        relatedTrack={action.relatedTrack}
                        locale={locale}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* ── Tool Directory ─────────────────────────────────────────────────── */}
        <section>
          <div className="mb-6">
            <h2 className="reveal-slide-left text-2xl font-bold text-text-heading mb-2">
              {t('resilience.toolDirectory.title')}
            </h2>
            <p className="text-text-secondary text-base">
              {t('resilience.toolDirectory.description')}
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setToolFilter('all')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-canvas-border ${
                toolFilter === 'all'
                  ? 'bg-canvas-cream text-canvas-deep'
                  : 'bg-canvas-raised text-text-secondary hover:text-text-heading hover:bg-canvas-border'
              }`}
            >
              {t('resilience.toolDirectory.filterAll')}
            </button>
            {pillarConfigs.map((config) => {
              const isActive = toolFilter === config.id;
              const colors = pillarColorMap[config.accentColor];
              return (
                <button
                  key={config.id}
                  onClick={() => setToolFilter(isActive ? 'all' : config.id)}
                  aria-pressed={isActive}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border focus:outline-none focus:ring-2 focus:ring-canvas-border ${
                    isActive
                      ? `${colors.border} ${colors.text} bg-canvas-raised`
                      : 'border-canvas-border text-text-secondary hover:text-text-heading hover:border-canvas-border/70 bg-canvas-raised'
                  }`}
                >
                  {t(`resilience.pillars.${pillarKeyMap[config.id]}.shortTitle`)}
                </button>
              );
            })}
          </div>

          {/* Tool grid */}
          {filteredTools.length === 0 ? (
            <div className="text-center py-12 text-text-muted text-sm">
              {t('resilience.toolDirectory.noTools')}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredTools.map((tool) => (
                <ToolRecommendation
                  key={tool.name}
                  name={tool.name}
                  url={tool.url}
                  replaces={tool.replaces}
                  platforms={tool.platforms}
                  foss={tool.foss}
                  color={getToolColor(tool.name)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── Cross-links ────────────────────────────────────────────────────── */}
        <section>
          <div className="mb-6">
            <h2 className="reveal-slide-left text-2xl font-bold text-text-heading mb-2">
              {t('resilience.crossLinks.title')}
            </h2>
            <p className="text-text-secondary text-base">
              {t('resilience.crossLinks.description')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {crossLinks.map(({ slug, color, icon }, clIdx) => {
              const c = crossLinkColorMap[color];
              return (
                <Link
                  key={slug}
                  href={`/${locale}/tech-sovereignty/${slug}`}
                  className={`reveal-fade group bg-canvas-raised border ${c.border} ${c.hoverBorder} rounded-xl p-5 transition-all hover:shadow-lg flex flex-col gap-3`}
                  style={{ transitionDelay: `${clIdx * 80}ms` }}
                >
                  <div className={`w-10 h-10 ${c.iconBg} rounded-lg flex items-center justify-center ${c.iconText}`}>
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-heading text-base mb-1">
                      {t(`resilience.crossLinks.${crossLinkKeyMap[slug]}.title`)}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {t(`resilience.crossLinks.${crossLinkKeyMap[slug]}.description`)}
                    </p>
                  </div>
                  <div className={`mt-auto pt-2 border-t border-canvas-border flex items-center gap-1 text-sm ${c.text} group-hover:gap-2 transition-all`}>
                    {t('resilience.crossLinks.explore')}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
