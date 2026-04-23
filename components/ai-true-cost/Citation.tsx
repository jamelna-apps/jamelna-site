'use client';

import React, { useState, useRef, useCallback } from 'react';
import type { Source } from '@/lib/ai-true-cost/types';

interface CitationProps {
  source: Source;
  /** Optional label for the trigger; defaults to "cite" */
  label?: string;
}

/**
 * Inline citation button that reveals a hover/tap card showing the full source.
 * Supports hover, focus, and click-to-toggle interactions.
 */
export function Citation({ source, label = 'cite' }: CitationProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCard = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }, []);

  const toggleCard = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <span className="relative inline-block align-baseline">
      <button
        type="button"
        aria-label={`Citation: ${source.title}`}
        aria-expanded={open}
        onClick={toggleCard}
        onMouseEnter={openCard}
        onMouseLeave={scheduleClose}
        onFocus={openCard}
        onBlur={scheduleClose}
        className={`
          inline-flex items-center gap-0.5
          text-[10px] font-mono font-medium leading-none
          px-1.5 py-0.5 rounded
          border
          transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
          ${open
            ? 'bg-orange-500/20 border-orange-500/50 text-orange-300'
            : 'bg-canvas-deep border-canvas-border text-text-muted hover:border-orange-500/40 hover:text-orange-300'
          }
        `}
      >
        [{label}]
      </button>

      {open && (
        <span
          role="tooltip"
          onMouseEnter={openCard}
          onMouseLeave={scheduleClose}
          className="
            absolute z-50 left-0 top-full mt-1
            w-72 max-w-[90vw]
            bg-canvas-raised border border-canvas-border rounded-lg
            p-4 shadow-xl shadow-black/40
            text-left
          "
        >
          {/* Title + link */}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm font-semibold text-orange-300 hover:text-orange-200 leading-snug mb-1 underline underline-offset-2"
          >
            {source.title}
          </a>

          {/* Author + date */}
          <p className="text-xs text-text-muted mb-2">
            {source.author}
            {source.accessed && (
              <> &middot; Accessed {source.accessed}</>
            )}
          </p>

          {/* Pull quote */}
          {source.pull_quote && (
            <blockquote className="border-l-2 border-orange-500/40 pl-3 mt-2">
              <p className="text-xs italic text-text-secondary leading-relaxed">
                &ldquo;{source.pull_quote}&rdquo;
              </p>
            </blockquote>
          )}
        </span>
      )}
    </span>
  );
}
