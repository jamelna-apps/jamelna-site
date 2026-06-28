'use client';

import Link from 'next/link';
import type { RankedGrant } from '@/lib/grants/types';

function formatCurrency(value: number | null): string {
  if (value === null || value === undefined) return '—';
  return `$${value.toLocaleString('en-US')}`;
}

function daysUntil(iso: string | null): string {
  if (!iso) return 'No deadline listed';
  const close = new Date(iso);
  if (isNaN(close.getTime())) return iso;
  const diffDays = Math.ceil((close.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return `Closed ${Math.abs(diffDays)} days ago`;
  if (diffDays === 0) return 'Closes today';
  if (diffDays === 1) return 'Closes tomorrow';
  return `Closes in ${diffDays} days`;
}

function fitBadgeClasses(score: number): string {
  if (score >= 75) return 'bg-highlight-green/15 text-highlight-green border-highlight-green/30';
  if (score >= 45) return 'bg-warm/15 text-warm border-warm/30';
  return 'bg-deep-alt text-text-muted border-deep-border';
}

interface GrantCardProps {
  grant: RankedGrant;
  rank: number;
  locale: string;
}

export function GrantCard({ grant, rank, locale }: GrantCardProps) {
  return (
    <article className="border border-deep-border rounded-lg p-5 bg-deep-card hover:border-deep-border/60 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-text-muted mb-1">
            #{rank} · {grant.agency}
          </div>
          <h3 className="text-lg font-display font-semibold text-text-heading truncate">{grant.title}</h3>
        </div>
        <span
          className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${fitBadgeClasses(grant.fitScore)}`}
          title="AI-estimated match score"
        >
          AI match {grant.fitScore}/100
        </span>
      </div>

      {grant.fitRationale && (
        <p className="mt-3 text-sm text-text-secondary">{grant.fitRationale}</p>
      )}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <div className="text-text-muted">Deadline</div>
          <div className="text-text-heading">{daysUntil(grant.closeDate)}</div>
        </div>
        <div>
          <div className="text-text-muted">Award range</div>
          <div className="text-text-heading">
            {formatCurrency(grant.awardFloor)} – {formatCurrency(grant.awardCeiling)}
          </div>
        </div>
        <div>
          <div className="text-text-muted">Source</div>
          <div className="text-text-heading">{grant.source.replace('_', '.')}</div>
        </div>
      </div>

      {grant.redFlags.length > 0 && (
        <ul className="mt-3 text-xs text-highlight-red space-y-1">
          {grant.redFlags.map((f) => (
            <li key={f}>⚠ {f}</li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center gap-3 text-sm">
        <Link
          href={`/${locale}/resources/grants/${encodeURIComponent(grant.opportunityId)}?source=${grant.source}`}
          className="text-warm hover:underline"
        >
          View details
        </Link>
        <a
          href={grant.url}
          target="_blank"
          rel="noreferrer"
          className="text-text-secondary hover:text-warm"
        >
          Open on {grant.source.replace('_', '.')} ↗
        </a>
      </div>
    </article>
  );
}
