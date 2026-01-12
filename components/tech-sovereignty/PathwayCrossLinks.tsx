'use client';

import React from 'react';
import Link from 'next/link';
import { getAllPathways, type Pathway } from '@/data/pathways';

interface PathwayCrossLinksProps {
  currentTrack: string;
  locale: string;
}

interface TrackRelationship {
  id: string;
  title: string;
  type: 'prerequisite' | 'next';
}

// Track relationship data
const trackRelationships: Record<string, TrackRelationship[]> = {
  'digital-rights': [
    { id: 'linux-foss', title: 'Linux & FOSS', type: 'next' },
    { id: 'networking', title: 'Networking', type: 'next' },
  ],
  'linux-foss': [
    { id: 'digital-rights', title: 'Digital Rights', type: 'prerequisite' },
    { id: 'networking', title: 'Networking', type: 'next' },
    { id: 'app-dev', title: 'App Development', type: 'next' },
  ],
  networking: [
    { id: 'linux-foss', title: 'Linux & FOSS', type: 'prerequisite' },
    { id: 'self-hosted', title: 'Self-Hosted Services', type: 'next' },
  ],
  'self-hosted': [
    { id: 'networking', title: 'Networking', type: 'prerequisite' },
    { id: 'ai-llm', title: 'AI/LLM Independence', type: 'next' },
    { id: 'community', title: 'Community Building', type: 'next' },
  ],
  'app-dev': [
    { id: 'linux-foss', title: 'Linux & FOSS', type: 'prerequisite' },
    { id: 'community', title: 'Community Building', type: 'next' },
  ],
  'ai-llm': [
    { id: 'self-hosted', title: 'Self-Hosted Services', type: 'prerequisite' },
    { id: 'linux-foss', title: 'Linux & FOSS', type: 'prerequisite' },
  ],
  community: [
    { id: 'self-hosted', title: 'Self-Hosted Services', type: 'prerequisite' },
    { id: 'app-dev', title: 'App Development', type: 'prerequisite' },
  ],
};

export function PathwayCrossLinks({ currentTrack, locale }: PathwayCrossLinksProps) {
  const pathways = getAllPathways();

  // Find pathways that include this track
  const relatedPathways = pathways.filter((pathway) =>
    pathway.tracks.includes(currentTrack) ||
    pathway.steps.some((step) => step.trackRef.startsWith(currentTrack))
  );

  const relationships = trackRelationships[currentTrack] || [];
  const prerequisites = relationships.filter((r) => r.type === 'prerequisite');
  const nextTracks = relationships.filter((r) => r.type === 'next');

  if (relatedPathways.length === 0 && relationships.length === 0) {
    return null;
  }

  return (
    <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        Learning Connections
      </h3>

      <div className="space-y-4">
        {/* Related Pathways */}
        {relatedPathways.length > 0 && (
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Part of these pathways</p>
            <div className="flex flex-wrap gap-2">
              {relatedPathways.map((pathway) => (
                <Link
                  key={pathway.slug}
                  href={`/${locale}/tech-sovereignty/pathways/${pathway.slug}`}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-${pathway.color}-500/20 text-${pathway.color}-300 hover:bg-${pathway.color}-500/30`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {pathway.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Prerequisites */}
        {prerequisites.length > 0 && (
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Recommended Prerequisites</p>
            <div className="flex flex-wrap gap-2">
              {prerequisites.map((track) => (
                <Link
                  key={track.id}
                  href={`/${locale}/tech-sovereignty/${track.id}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                >
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {track.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Next Tracks */}
        {nextTracks.length > 0 && (
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Continue Learning</p>
            <div className="flex flex-wrap gap-2">
              {nextTracks.map((track) => (
                <Link
                  key={track.id}
                  href={`/${locale}/tech-sovereignty/${track.id}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                >
                  {track.title}
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* View Map Link */}
        <div className="pt-2 border-t border-zinc-700">
          <Link
            href={`/${locale}/tech-sovereignty/map`}
            className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
          >
            View learning map
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
