'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { PathwayCard } from '@/components/tech-sovereignty/PathwayCard';
import { getAllPathways } from '@/data/pathways';
import { getCompletedCount } from '@/lib/sovereignty-progress';

// Icons for each pathway
const pathwayIcons: Record<string, React.ReactNode> = {
  'secure-network': (
    <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  'own-your-data': (
    <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  'stop-tracking': (
    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ),
};

export default function PathwaysPage() {
  const locale = useLocale();
  const [pathwayProgress, setPathwayProgress] = useState<Record<string, number>>({});
  const pathways = getAllPathways();

  // Load progress from localStorage on mount
  useEffect(() => {
    const progress: Record<string, number> = {};
    pathways.forEach((pathway) => {
      progress[pathway.slug] = getCompletedCount(pathway.slug);
    });
    setPathwayProgress(progress);
  }, [pathways]);

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-zinc-900 to-zinc-950"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3), transparent)' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Link
            href={`/${locale}/tech-sovereignty`}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tech Sovereignty
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Learning Pathways
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Goal-oriented paths to tech independence. Choose what you want to achieve and follow a structured journey to get there.
          </p>
        </div>
      </section>

      {/* Pathways Grid */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pathways.map((pathway) => (
              <PathwayCard
                key={pathway.slug}
                slug={pathway.slug}
                title={pathway.title}
                description={pathway.description}
                outcome={pathway.outcome}
                timeEstimate={pathway.timeEstimate}
                tracks={pathway.tracks}
                totalCheckpoints={pathway.steps.length}
                completedCheckpoints={pathwayProgress[pathway.slug] || 0}
                color={pathway.color}
                locale={locale}
                icon={pathwayIcons[pathway.slug]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            How Pathways Work
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-sky-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Choose Your Goal</h3>
              <p className="text-zinc-400 text-sm">
                Select a pathway based on what you want to achieve. Each has a clear outcome.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-violet-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Follow the Steps</h3>
              <p className="text-zinc-400 text-sm">
                Work through lessons and projects at your own pace. Each step builds on the last.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Mark Your Progress</h3>
              <p className="text-zinc-400 text-sm">
                Complete checkpoints to verify you&apos;ve actually done the work. Your progress is saved locally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Prefer Structured Curriculum?
          </h2>
          <p className="text-zinc-400 mb-8">
            If you&apos;re an educator or prefer to browse by topic, check out our full curriculum with lesson plans and assessments.
          </p>
          <Link
            href={`/${locale}/tech-sovereignty#curriculum`}
            className="inline-flex items-center gap-2 bg-violet-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-400 transition-colors"
          >
            View Full Curriculum
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
