'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { TrackMap } from '@/components/tech-sovereignty/TrackMap';

export default function TrackMapPage() {
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-zinc-900 to-zinc-950"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <Link
            href={`/${locale}/tech-sovereignty`}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tech Sovereignty
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Learning Map
          </h1>
          <p className="text-lg text-zinc-300 mb-8 max-w-3xl">
            See how all the tracks connect and find your path to tech independence. Click any track to explore its curriculum, or select a suggested path to see the recommended sequence.
          </p>
        </div>
      </section>

      {/* Track Map */}
      <section className="py-8 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <TrackMap locale={locale} />
        </div>
      </section>

      {/* Suggested Sequences */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Suggested Learning Sequences
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Full Sovereignty */}
            <div className="bg-zinc-800 border border-violet-500/30 rounded-xl p-6 hover:border-violet-500/50 transition-colors">
              <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Full Sovereignty</h3>
              <p className="text-zinc-400 text-sm mb-4">
                The complete journey from understanding your rights to running your own infrastructure.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-amber-500/20 text-amber-400 rounded text-xs flex items-center justify-center font-medium">1</span>
                  <span className="text-zinc-300">Digital Rights</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-green-500/20 text-green-400 rounded text-xs flex items-center justify-center font-medium">2</span>
                  <span className="text-zinc-300">Linux & FOSS</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-sky-500/20 text-sky-400 rounded text-xs flex items-center justify-center font-medium">3</span>
                  <span className="text-zinc-300">Networking</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-violet-500/20 text-violet-400 rounded text-xs flex items-center justify-center font-medium">4</span>
                  <span className="text-zinc-300">Self-Hosted</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-rose-500/20 text-rose-400 rounded text-xs flex items-center justify-center font-medium">5</span>
                  <span className="text-zinc-300">Community</span>
                </div>
              </div>
            </div>

            {/* Developer Path */}
            <div className="bg-zinc-800 border border-sky-500/30 rounded-xl p-6 hover:border-sky-500/50 transition-colors">
              <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Developer Path</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Focus on building applications that serve communities and reflect shared values.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-amber-500/20 text-amber-400 rounded text-xs flex items-center justify-center font-medium">1</span>
                  <span className="text-zinc-300">Digital Rights</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-green-500/20 text-green-400 rounded text-xs flex items-center justify-center font-medium">2</span>
                  <span className="text-zinc-300">Linux & FOSS</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-sky-500/20 text-sky-400 rounded text-xs flex items-center justify-center font-medium">3</span>
                  <span className="text-zinc-300">App Development</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-rose-500/20 text-rose-400 rounded text-xs flex items-center justify-center font-medium">4</span>
                  <span className="text-zinc-300">Community</span>
                </div>
              </div>
            </div>

            {/* AI Independence */}
            <div className="bg-zinc-800 border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/50 transition-colors">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Independence</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Run powerful AI models locally without sending your data to corporate clouds.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-amber-500/20 text-amber-400 rounded text-xs flex items-center justify-center font-medium">1</span>
                  <span className="text-zinc-300">Digital Rights</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-green-500/20 text-green-400 rounded text-xs flex items-center justify-center font-medium">2</span>
                  <span className="text-zinc-300">Linux & FOSS</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-sky-500/20 text-sky-400 rounded text-xs flex items-center justify-center font-medium">3</span>
                  <span className="text-zinc-300">Networking</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-violet-500/20 text-violet-400 rounded text-xs flex items-center justify-center font-medium">4</span>
                  <span className="text-zinc-300">Self-Hosted</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-orange-500/20 text-orange-400 rounded text-xs flex items-center justify-center font-medium">5</span>
                  <span className="text-zinc-300">AI/LLM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Overview */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            All Tracks
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'digital-rights', title: 'Digital Rights & Advocacy', description: 'Understand your rights and threats to online freedom', color: 'amber', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { id: 'linux-foss', title: 'Linux & FOSS', description: 'Foundation skills for open source software', color: 'green', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { id: 'networking', title: 'Networking', description: 'Build and secure your own networks', color: 'sky', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
              { id: 'self-hosted', title: 'Self-Hosted Services', description: 'Replace cloud services with your own', color: 'violet', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01' },
              { id: 'app-dev', title: 'App Development', description: 'Build applications for your community', color: 'sky', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
              { id: 'ai-llm', title: 'AI/LLM Independence', description: 'Run AI models on your own hardware', color: 'orange', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
              { id: 'community', title: 'Community Building', description: 'Teach, organize, and share knowledge', color: 'rose', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            ].map((track) => (
              <Link
                key={track.id}
                href={`/${locale}/tech-sovereignty/${track.id}`}
                className={`bg-zinc-800 border border-${track.color}-500/30 rounded-xl p-4 hover:border-${track.color}-500/50 transition-all hover:scale-[1.02]`}
              >
                <div className={`w-10 h-10 bg-${track.color}-500/20 rounded-lg flex items-center justify-center mb-3`}>
                  <svg className={`w-5 h-5 text-${track.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={track.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{track.title}</h3>
                <p className="text-zinc-400 text-xs">{track.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-zinc-400 mb-8">
            Choose a goal-based pathway for guided learning, or dive into any track that interests you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/tech-sovereignty/pathways`}
              className="inline-flex items-center justify-center gap-2 bg-violet-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-400 transition-colors"
            >
              Browse Pathways
            </Link>
            <Link
              href={`/${locale}/tech-sovereignty#curriculum`}
              className="inline-flex items-center justify-center gap-2 border border-zinc-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
            >
              View Full Curriculum
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
