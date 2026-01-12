'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Track {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  borderColor: string;
  x: number;
  y: number;
  link: string;
}

interface Connection {
  from: string;
  to: string;
  type: 'recommended' | 'optional';
}

interface TrackMapProps {
  locale: string;
  onTrackHover?: (trackId: string | null) => void;
}

export function TrackMap({ locale, onTrackHover }: TrackMapProps) {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  const [selectedSequence, setSelectedSequence] = useState<string | null>(null);

  const tracks: Track[] = [
    {
      id: 'digital-rights',
      title: 'Digital Rights',
      subtitle: 'Understand Why',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/50',
      x: 50,
      y: 8,
      link: `/${locale}/tech-sovereignty/digital-rights`,
    },
    {
      id: 'linux-foss',
      title: 'Linux & FOSS',
      subtitle: 'Foundation',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/50',
      x: 15,
      y: 35,
      link: `/${locale}/tech-sovereignty/linux-foss`,
    },
    {
      id: 'networking',
      title: 'Networking',
      subtitle: 'Connect',
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/20',
      borderColor: 'border-sky-500/50',
      x: 50,
      y: 35,
      link: `/${locale}/tech-sovereignty/networking`,
    },
    {
      id: 'self-hosted',
      title: 'Self-Hosted',
      subtitle: 'Deploy',
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/20',
      borderColor: 'border-violet-500/50',
      x: 85,
      y: 35,
      link: `/${locale}/tech-sovereignty/self-hosted`,
    },
    {
      id: 'app-dev',
      title: 'App Dev',
      subtitle: 'Build',
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/20',
      borderColor: 'border-sky-500/50',
      x: 15,
      y: 62,
      link: `/${locale}/tech-sovereignty/app-dev`,
    },
    {
      id: 'ai-llm',
      title: 'AI/LLM',
      subtitle: 'Extend',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/50',
      x: 85,
      y: 62,
      link: `/${locale}/tech-sovereignty/ai-llm`,
    },
    {
      id: 'community',
      title: 'Community',
      subtitle: 'Share',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/20',
      borderColor: 'border-rose-500/50',
      x: 50,
      y: 89,
      link: `/${locale}/tech-sovereignty/community`,
    },
  ];

  const connections: Connection[] = [
    // From Digital Rights
    { from: 'digital-rights', to: 'linux-foss', type: 'recommended' },
    { from: 'digital-rights', to: 'networking', type: 'recommended' },
    { from: 'digital-rights', to: 'self-hosted', type: 'recommended' },
    // Core path
    { from: 'linux-foss', to: 'networking', type: 'recommended' },
    { from: 'networking', to: 'self-hosted', type: 'recommended' },
    // Branches
    { from: 'linux-foss', to: 'app-dev', type: 'recommended' },
    { from: 'self-hosted', to: 'ai-llm', type: 'recommended' },
    // To Community
    { from: 'app-dev', to: 'community', type: 'optional' },
    { from: 'ai-llm', to: 'community', type: 'optional' },
    { from: 'self-hosted', to: 'community', type: 'optional' },
  ];

  // Predefined learning sequences
  const sequences = {
    sovereignty: ['digital-rights', 'linux-foss', 'networking', 'self-hosted', 'community'],
    developer: ['digital-rights', 'linux-foss', 'app-dev', 'community'],
    aiPath: ['digital-rights', 'linux-foss', 'networking', 'self-hosted', 'ai-llm'],
  };

  const handleTrackHover = (trackId: string | null) => {
    setHoveredTrack(trackId);
    onTrackHover?.(trackId);
  };

  const isTrackHighlighted = (trackId: string) => {
    if (selectedSequence && sequences[selectedSequence as keyof typeof sequences]) {
      return sequences[selectedSequence as keyof typeof sequences].includes(trackId);
    }
    return hoveredTrack === trackId;
  };

  const isConnectionHighlighted = (conn: Connection) => {
    if (selectedSequence && sequences[selectedSequence as keyof typeof sequences]) {
      const seq = sequences[selectedSequence as keyof typeof sequences];
      const fromIdx = seq.indexOf(conn.from);
      const toIdx = seq.indexOf(conn.to);
      return fromIdx !== -1 && toIdx !== -1 && Math.abs(fromIdx - toIdx) === 1;
    }
    return hoveredTrack === conn.from || hoveredTrack === conn.to;
  };

  const getTrackPosition = (trackId: string) => {
    const track = tracks.find((t) => t.id === trackId);
    return track ? { x: track.x, y: track.y } : { x: 0, y: 0 };
  };

  return (
    <div className="w-full">
      {/* Sequence Selector */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        <button
          onClick={() => setSelectedSequence(selectedSequence === 'sovereignty' ? null : 'sovereignty')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedSequence === 'sovereignty'
              ? 'bg-violet-500 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          Full Sovereignty Path
        </button>
        <button
          onClick={() => setSelectedSequence(selectedSequence === 'developer' ? null : 'developer')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedSequence === 'developer'
              ? 'bg-sky-500 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          Developer Path
        </button>
        <button
          onClick={() => setSelectedSequence(selectedSequence === 'aiPath' ? null : 'aiPath')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedSequence === 'aiPath'
              ? 'bg-orange-500 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          AI Independence Path
        </button>
      </div>

      {/* Map Container */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-zinc-900/50 rounded-xl border border-zinc-700 overflow-hidden">
        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-zinc-600" />
            </marker>
            <marker
              id="arrowhead-highlighted"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-violet-400" />
            </marker>
          </defs>
          {connections.map((conn, idx) => {
            const from = getTrackPosition(conn.from);
            const to = getTrackPosition(conn.to);
            const highlighted = isConnectionHighlighted(conn);

            return (
              <line
                key={idx}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke={highlighted ? '#a78bfa' : '#3f3f46'}
                strokeWidth={highlighted ? 3 : 2}
                strokeDasharray={conn.type === 'optional' ? '5,5' : undefined}
                markerEnd={highlighted ? 'url(#arrowhead-highlighted)' : 'url(#arrowhead)'}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Track Nodes */}
        {tracks.map((track) => {
          const highlighted = isTrackHighlighted(track.id);
          return (
            <Link
              key={track.id}
              href={track.link}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                highlighted ? 'scale-110 z-20' : 'z-10'
              }`}
              style={{ left: `${track.x}%`, top: `${track.y}%` }}
              onMouseEnter={() => handleTrackHover(track.id)}
              onMouseLeave={() => handleTrackHover(null)}
            >
              <div
                className={`${track.bgColor} ${
                  highlighted ? track.borderColor : 'border-zinc-700'
                } border-2 rounded-xl p-3 md:p-4 text-center min-w-[100px] md:min-w-[130px] hover:shadow-lg transition-all ${
                  highlighted ? 'shadow-lg' : ''
                }`}
              >
                <h4 className={`font-semibold text-xs md:text-sm ${track.color}`}>{track.title}</h4>
                <p className="text-zinc-400 text-[10px] md:text-xs mt-0.5">{track.subtitle}</p>
              </div>
            </Link>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 bg-zinc-800/90 rounded-lg p-2 md:p-3 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-0.5 bg-zinc-500"></div>
            <span className="text-zinc-400">Recommended</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-zinc-500 border-dashed border-t-2 border-zinc-500"></div>
            <span className="text-zinc-400">Optional</span>
          </div>
        </div>

        {/* Start Here Indicator */}
        <div className="absolute top-3 right-3 bg-amber-500/20 text-amber-300 text-xs px-3 py-1.5 rounded-full font-medium">
          Start with Digital Rights →
        </div>
      </div>

      {/* Sequence Description */}
      {selectedSequence && (
        <div className="mt-4 bg-zinc-800 rounded-lg p-4 border border-zinc-700">
          {selectedSequence === 'sovereignty' && (
            <div>
              <h4 className="font-semibold text-violet-400 mb-2">Full Sovereignty Path</h4>
              <p className="text-zinc-300 text-sm">
                The complete journey to tech independence. Start by understanding your digital rights,
                build foundational Linux skills, master networking, deploy your own services, then
                share knowledge with your community.
              </p>
            </div>
          )}
          {selectedSequence === 'developer' && (
            <div>
              <h4 className="font-semibold text-sky-400 mb-2">Developer Path</h4>
              <p className="text-zinc-300 text-sm">
                Focus on building applications that serve your community. Learn the foundations of
                open source development, then create tools and platforms that reflect community values.
              </p>
            </div>
          )}
          {selectedSequence === 'aiPath' && (
            <div>
              <h4 className="font-semibold text-orange-400 mb-2">AI Independence Path</h4>
              <p className="text-zinc-300 text-sm">
                Run powerful AI models on your own hardware. Build the infrastructure foundation, then
                deploy and customize AI tools that keep your data private and under your control.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
