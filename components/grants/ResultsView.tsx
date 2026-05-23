'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type {
  ClassroomProject,
  CuratedFunder,
  FoundationLead,
  OrgProfile,
  RankedGrant,
  SearchMeta,
  SearchResponse,
} from '@/lib/grants/types';
import { GrantCard } from './GrantCard';
import { ExportBar } from './ExportBar';
import { SourcesFooter } from './SourcesFooter';
import {
  ORG_TYPE_LABELS,
  FOCUS_LABELS,
  BUDGET_LABELS,
} from './constants';

const STORAGE_PROFILE_KEY = 'grants.profile';
const STORAGE_RESULTS_KEY = 'grants.results';

interface Props {
  locale: string;
}

type Status = 'loading' | 'streaming' | 'ready' | 'error' | 'missing-profile';

export function ResultsView({ locale }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('loading');
  const [statusMessage, setStatusMessage] = useState<string>('Preparing your search…');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [profile, setProfile] = useState<OrgProfile | null>(null);
  const [results, setResults] = useState<RankedGrant[]>([]);
  const [curatedFunders, setCuratedFunders] = useState<CuratedFunder[] | undefined>();
  const [foundationLeads, setFoundationLeads] = useState<FoundationLead[] | undefined>();
  const [classroomProjects, setClassroomProjects] = useState<ClassroomProject[] | undefined>();
  const [meta, setMeta] = useState<SearchMeta | null>(null);
  const [unrankedFallback, setUnrankedFallback] = useState(false);
  const requestedRef = useRef(false);

  useEffect(() => {
    if (requestedRef.current) return;
    requestedRef.current = true;

    let storedProfile: OrgProfile | null = null;
    let cachedResponse: SearchResponse | null = null;
    try {
      const raw = sessionStorage.getItem(STORAGE_PROFILE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        // Legacy single-focus profiles had `focusArea`. Migrate in place.
        if (!Array.isArray(parsed.focusAreas) && typeof parsed.focusArea === 'string') {
          parsed.focusAreas = [parsed.focusArea];
          delete parsed.focusArea;
          sessionStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(parsed));
          sessionStorage.removeItem(STORAGE_RESULTS_KEY);
        }
        storedProfile = parsed as unknown as OrgProfile;
      }
      const rawResults = sessionStorage.getItem(STORAGE_RESULTS_KEY);
      if (rawResults) cachedResponse = JSON.parse(rawResults) as SearchResponse;
    } catch {
      // ignore
    }

    if (!storedProfile) {
      setStatus('missing-profile');
      return;
    }
    setProfile(storedProfile);

    if (cachedResponse) {
      setResults(cachedResponse.results);
      setCuratedFunders(cachedResponse.curatedFunders);
      setFoundationLeads(cachedResponse.foundationLeads);
      setClassroomProjects(cachedResponse.classroomProjects);
      setMeta(cachedResponse.meta);
      setUnrankedFallback(Boolean(cachedResponse.unrankedFallback));
      setStatus('ready');
      return;
    }

    void runSearch(storedProfile);
  }, []);

  const runSearch = async (activeProfile: OrgProfile) => {
    setStatus('streaming');
    setStatusMessage('Searching Grants.gov…');

    try {
      const response = await fetch('/api/grants/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeProfile),
      });
      if (!response.ok || !response.body) {
        const payload = (await response.json().catch(() => ({}))) as {
          error?: string;
          errors?: { field: string; message: string }[];
        };
        const fieldDetail = payload.errors
          ?.map((e) => `${e.field}: ${e.message}`)
          .join('; ');
        throw new Error(
          fieldDetail ??
            payload.error ??
            `Search failed (${response.status})`,
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let finalResponse: SearchResponse | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (!payload || payload === '[DONE]') continue;
          try {
            const event = JSON.parse(payload);
            if (event.type === 'status') {
              setStatusMessage(String(event.message ?? 'Working…'));
            } else if (event.type === 'error') {
              throw new Error(event.error ?? 'Search failed');
            } else if (event.type === 'complete') {
              finalResponse = {
                meta: event.meta,
                profile: event.profile,
                results: event.results ?? [],
                curatedFunders: event.curatedFunders ?? [],
                foundationLeads: event.foundationLeads ?? [],
                classroomProjects: event.classroomProjects ?? [],
                unrankedFallback: Boolean(event.unrankedFallback),
              };
            }
          } catch (err) {
            if (err instanceof SyntaxError) continue;
            throw err;
          }
        }
      }

      if (!finalResponse) {
        throw new Error('No results returned');
      }

      setResults(finalResponse.results);
      setCuratedFunders(finalResponse.curatedFunders);
      setFoundationLeads(finalResponse.foundationLeads);
      setClassroomProjects(finalResponse.classroomProjects);
      setMeta(finalResponse.meta);
      setUnrankedFallback(Boolean(finalResponse.unrankedFallback));
      setStatus('ready');
      try {
        sessionStorage.setItem(STORAGE_RESULTS_KEY, JSON.stringify(finalResponse));
      } catch {
        // ignore quota issues
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Search failed');
    }
  };

  if (status === 'missing-profile') {
    return (
      <div className="border border-deep-border rounded-lg p-6 bg-deep-card">
        <h1 className="text-xl font-semibold text-text-heading">No search in progress</h1>
        <p className="mt-2 text-sm text-text-secondary">
          We could not find an organization profile in this browser session. Start a new search to
          get ranked grant matches.
        </p>
        <Link
          href={`/${locale}/resources/grants`}
          className="mt-4 inline-block px-4 py-2 rounded-md bg-warm text-white text-sm"
        >
          Start new search
        </Link>
      </div>
    );
  }

  if (status === 'loading' || status === 'streaming') {
    return (
      <div className="border border-deep-border rounded-lg p-6 bg-deep-card">
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <span className="inline-block h-2 w-2 rounded-full bg-warm animate-pulse" />
          {statusMessage}
        </div>
        <p className="mt-4 text-xs text-text-muted">
          This can take 10–30 seconds. We search federal grant opportunities and then ask Claude to
          rank them for your organization.
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="border border-highlight-red/40 bg-highlight-red/10 rounded-lg p-6">
        <h1 className="text-lg font-semibold text-highlight-red">Search failed</h1>
        <p className="mt-2 text-sm text-text-secondary">{errorMessage}</p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => {
              if (profile) {
                requestedRef.current = false;
                void runSearch(profile);
              } else {
                router.push(`/${locale}/resources/grants`);
              }
            }}
            className="px-4 py-2 rounded-md bg-warm text-white text-sm"
          >
            Retry
          </button>
          <Link
            href={`/${locale}/resources/grants`}
            className="px-4 py-2 rounded-md border border-deep-border text-sm"
          >
            Start over
          </Link>
        </div>
      </div>
    );
  }

  if (!profile || !meta) return null;

  return (
    <div className="space-y-8">
      <header className="border border-deep-border rounded-lg p-6 bg-deep-card">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-text-heading">
              Your AI-ranked grant matches
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              {meta.rankedCount} opportunities ranked from {meta.candidateCount} candidates.
            </p>
            <dl className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <dt className="text-text-muted">Organization</dt>
                <dd className="text-text-primary">{ORG_TYPE_LABELS[profile.orgType]}</dd>
              </div>
              <div>
                <dt className="text-text-muted">Focus</dt>
                <dd className="text-text-primary">
                  {profile.focusAreas.map((f) => FOCUS_LABELS[f] ?? f).join(' · ')}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">State</dt>
                <dd className="text-text-primary">{profile.stateCode}</dd>
              </div>
              <div>
                <dt className="text-text-muted">Budget</dt>
                <dd className="text-text-primary">{BUDGET_LABELS[profile.budgetRange]}</dd>
              </div>
            </dl>
          </div>
          <ExportBar
            profile={profile}
            results={results}
            curatedFunders={curatedFunders}
            foundationLeads={foundationLeads}
            classroomProjects={classroomProjects}
          />
        </div>
        {unrankedFallback && (
          <div className="mt-4 p-3 rounded-md bg-warm/10 border border-warm/30 text-sm text-warm">
            AI ranking was unavailable for this search. Results are shown unranked — review each
            opportunity directly on its source site.
          </div>
        )}
      </header>

      {results.length === 0 ? (
        <div className="border border-deep-border rounded-lg p-6 bg-deep-card text-sm text-text-secondary">
          No grants matched this profile. Try broadening your focus area, enabling forecasted
          opportunities on the previous step, or relaxing your budget range.{' '}
          <Link href={`/${locale}/resources/grants`} className="text-warm underline">
            Adjust search
          </Link>
          .
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((grant, idx) => (
            <GrantCard key={grant.opportunityId} grant={grant} rank={idx + 1} locale={locale} />
          ))}
        </div>
      )}

      {curatedFunders && curatedFunders.length > 0 && (
        <section className="border border-deep-border rounded-lg p-6 bg-deep-card">
          <h2 className="text-lg font-semibold text-text-heading">
            Major foundations likely to fund this work
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            A curated list of US foundations whose published priorities overlap with your focus
            area, state, and organization type. Visit each foundation&apos;s grants page to confirm
            current priorities and application process.
          </p>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {curatedFunders.map((f) => (
              <li
                key={f.id}
                className="rounded-lg border border-deep-border p-4 hover:border-warm/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-text-heading hover:text-warm"
                  >
                    {f.name}
                  </a>
                  {f.giving && (
                    <span className="shrink-0 text-xs text-text-muted">{f.giving}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-text-secondary">{f.description}</p>
                <div className="mt-2 text-xs text-text-muted">
                  {f.states === 'all' ? 'Nationwide' : f.states.join(', ')}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {foundationLeads && foundationLeads.length > 0 && (
        <section className="border border-deep-border rounded-lg p-6 bg-deep-card">
          <h2 className="text-lg font-semibold text-text-heading">
            Additional foundations from IRS filings
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Private foundations active in your state and focus area. These are leads, not open
            grants — review each foundation&apos;s website for current giving priorities.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {foundationLeads.map((f) => (
              <li key={f.ein}>
                <a href={f.url} target="_blank" rel="noreferrer" className="text-warm underline">
                  {f.name}
                </a>{' '}
                <span className="text-text-muted">
                  — {f.state}
                  {f.ntee ? ` · NTEE ${f.ntee}` : ''}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {classroomProjects && classroomProjects.length > 0 && (
        <section className="border border-deep-border rounded-lg p-6 bg-deep-card">
          <h2 className="text-lg font-semibold text-text-heading">
            Classroom crowdfunding (DonorsChoose)
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {classroomProjects.map((p) => (
              <li key={p.id}>
                <a href={p.url} target="_blank" rel="noreferrer" className="text-warm underline">
                  {p.title}
                </a>{' '}
                <span className="text-text-muted">
                  — {p.subject} · ${p.costToComplete.toLocaleString('en-US')}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex items-center justify-between">
        <Link
          href={`/${locale}/resources/grants`}
          className="text-sm text-text-secondary hover:text-warm"
        >
          ← Start a new search
        </Link>
        <button
          onClick={() => {
            try {
              sessionStorage.removeItem(STORAGE_RESULTS_KEY);
            } catch {}
            requestedRef.current = false;
            if (profile) void runSearch(profile);
          }}
          className="text-sm text-text-secondary hover:text-warm"
        >
          Re-run search
        </button>
      </div>

      <SourcesFooter />
    </div>
  );
}
