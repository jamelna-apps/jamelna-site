'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { RawOpportunity } from '@/lib/grants/types';
import { SourcesFooter } from './SourcesFooter';

function formatCurrency(value: number | null): string {
  if (value === null || value === undefined) return '—';
  return `$${value.toLocaleString('en-US')}`;
}

interface Props {
  opportunityId: string;
  source: string;
  locale: string;
}

export function GrantDetailView({ opportunityId, source, locale }: Props) {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<RawOpportunity | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const url = `/api/grants/detail?id=${encodeURIComponent(opportunityId)}&source=${encodeURIComponent(source)}`;
        const response = await fetch(url);
        if (!response.ok) {
          const payload = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(payload.error ?? `Failed (${response.status})`);
        }
        const body = (await response.json()) as { opportunity: RawOpportunity };
        setDetail(body.opportunity);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load opportunity');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [opportunityId, source]);

  if (loading) {
    return (
      <div className="border border-deep-border rounded-lg p-6 bg-deep-card text-sm text-text-secondary">
        Loading opportunity details…
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="border border-highlight-red/40 bg-highlight-red/10 rounded-lg p-6">
        <h1 className="text-lg font-semibold text-highlight-red">
          Could not load opportunity
        </h1>
        <p className="mt-2 text-sm text-text-secondary">{error ?? 'Not found.'}</p>
        <Link
          href={`/${locale}/resources/grants/results`}
          className="mt-4 inline-block text-sm text-warm underline"
        >
          Back to results
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href={`/${locale}/resources/grants/results`}
        className="inline-block text-sm text-text-secondary hover:text-warm"
      >
        ← Back to results
      </Link>

      <header className="border border-deep-border rounded-lg p-6 bg-deep-card">
        <div className="text-xs text-text-muted">{detail.agency}</div>
        <h1 className="mt-1 text-2xl font-semibold text-text-heading">{detail.title}</h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div>
            <div className="text-text-muted">Close date</div>
            <div className="text-text-primary">{detail.closeDate ?? 'No deadline listed'}</div>
          </div>
          <div>
            <div className="text-text-muted">Posted</div>
            <div className="text-text-primary">{detail.postedDate ?? '—'}</div>
          </div>
          <div>
            <div className="text-text-muted">Award range</div>
            <div className="text-text-primary">
              {formatCurrency(detail.awardFloor)} – {formatCurrency(detail.awardCeiling)}
            </div>
          </div>
        </div>
        <a
          href={detail.url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block px-4 py-2 rounded-md bg-warm text-white text-sm"
        >
          Open on {detail.source.replace('_', '.')} ↗
        </a>
      </header>

      <section className="border border-deep-border rounded-lg p-6 bg-deep-card">
        <h2 className="text-lg font-semibold text-text-heading mb-2">Opportunity description</h2>
        <p className="whitespace-pre-line text-sm text-text-secondary">
          {detail.description || 'No description provided by the source.'}
        </p>
      </section>

      <SourcesFooter />
    </div>
  );
}
