'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { BudgetRange, FocusArea, OrgProfile, OrgType } from '@/lib/grants/types';
import {
  ORG_TYPE_OPTIONS,
  FOCUS_OPTIONS,
  BUDGET_OPTIONS,
  US_STATES,
} from './constants';

type Step = 'org' | 'focus' | 'budget' | 'summary';

const STEPS: { id: Step; title: string; description: string }[] = [
  { id: 'org', title: 'Organization', description: 'Tell us who is applying' },
  { id: 'focus', title: 'Focus & location', description: 'What you do and where' },
  { id: 'budget', title: 'Budget', description: 'How much funding you need' },
  { id: 'summary', title: 'Project', description: 'A short description of your project' },
];

interface IntakeWizardProps {
  locale: string;
}

export function IntakeWizard({ locale }: IntakeWizardProps) {
  const router = useRouter();
  const [current, setCurrent] = useState<Step>('org');
  const [orgType, setOrgType] = useState<OrgType | null>(null);
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);
  const [stateCode, setStateCode] = useState<string>('');
  const [budgetRange, setBudgetRange] = useState<BudgetRange | null>(null);
  const [projectSummary, setProjectSummary] = useState('');
  const [includeForecasted, setIncludeForecasted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentIndex = STEPS.findIndex((s) => s.id === current);

  const toggleFocus = (value: FocusArea) => {
    setFocusAreas((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : prev.length >= 5
          ? prev
          : [...prev, value],
    );
  };

  const canAdvance = (): boolean => {
    switch (current) {
      case 'org':
        return orgType !== null;
      case 'focus':
        return focusAreas.length > 0 && stateCode.length === 2;
      case 'budget':
        return budgetRange !== null;
      case 'summary':
        return projectSummary.trim().length >= 10;
    }
  };

  const goNext = () => {
    setError(null);
    if (!canAdvance()) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrent(STEPS[nextIndex].id);
    } else {
      handleSubmit();
    }
  };

  const goBack = () => {
    setError(null);
    if (currentIndex > 0) setCurrent(STEPS[currentIndex - 1].id);
  };

  const handleSubmit = () => {
    if (!orgType || focusAreas.length === 0 || !budgetRange || !stateCode) return;
    const profile: OrgProfile = {
      orgType,
      focusAreas,
      stateCode,
      budgetRange,
      projectSummary: projectSummary.trim(),
      includeForecasted,
    };
    try {
      sessionStorage.setItem('grants.profile', JSON.stringify(profile));
      sessionStorage.removeItem('grants.results');
    } catch {
      setError('Your browser blocked sessionStorage. Please allow it to continue.');
      return;
    }
    router.push(`/${locale}/resources/grants/results`);
  };

  return (
    <div className="border border-deep-border rounded-lg overflow-hidden bg-deep-card">
      <div className="px-6 py-4 border-b border-deep-border">
        <div className="flex items-center justify-between text-sm text-text-muted">
          <span>
            Step {currentIndex + 1} of {STEPS.length} · {STEPS[currentIndex].title}
          </span>
          <span className="hidden md:inline">{STEPS[currentIndex].description}</span>
        </div>
        <div className="mt-3 h-1 w-full bg-deep-alt rounded">
          <div
            className="h-1 bg-warm rounded transition-all"
            style={{ width: `${((currentIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 space-y-4">
        {error && (
          <div className="rounded-md border border-highlight-red/40 bg-highlight-red/10 px-4 py-3 text-sm text-highlight-red">
            {error}
          </div>
        )}

        {current === 'org' && (
          <div className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-text-heading mb-2">
              Which best describes your organization?
            </h2>
            <div className="text-xs text-text-muted mb-2">
              Current selection: {orgType ?? 'none'}
            </div>
            {ORG_TYPE_OPTIONS.map((opt) => {
              const selected = orgType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    console.log('[grants] org selected:', opt.value);
                    setOrgType(opt.value);
                  }}
                  style={{ WebkitTapHighlightColor: 'rgba(196, 112, 63, 0.3)' }}
                  className={`block w-full text-left p-4 rounded-lg border transition-colors ${
                    selected
                      ? 'border-warm bg-warm/10'
                      : 'border-deep-border hover:border-deep-border/70'
                  }`}
                >
                  <span className="pointer-events-none block font-medium text-text-heading">
                    {selected ? '● ' : '○ '}
                    {opt.label}
                  </span>
                  <span className="pointer-events-none block text-sm text-text-secondary">
                    {opt.description}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {current === 'focus' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-text-heading">
                  Focus areas (pick 1–5)
                </label>
                <span className="text-xs text-text-muted">
                  {focusAreas.length}/5 selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {FOCUS_OPTIONS.map((opt) => {
                  const selected = focusAreas.includes(opt.value);
                  const atMax = !selected && focusAreas.length >= 5;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleFocus(opt.value)}
                      disabled={atMax}
                      style={{ WebkitTapHighlightColor: 'rgba(196, 112, 63, 0.3)' }}
                      className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                        selected
                          ? 'border-warm bg-warm/15 text-warm'
                          : atMax
                            ? 'border-deep-border text-text-muted opacity-50 cursor-not-allowed'
                            : 'border-deep-border text-text-primary hover:border-deep-border/60'
                      }`}
                    >
                      {selected ? '✓ ' : ''}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-heading mb-2">
                US state or territory
              </label>
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="w-full rounded-md border border-deep-border bg-deep-alt px-3 py-2 text-text-primary"
              >
                <option value="">Select a state…</option>
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {current === 'budget' && (
          <div className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-text-heading mb-2">
              Approximate funding need
            </h2>
            {BUDGET_OPTIONS.map((opt) => {
              const selected = budgetRange === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setBudgetRange(opt.value)}
                  style={{ WebkitTapHighlightColor: 'rgba(196, 112, 63, 0.3)' }}
                  className={`block w-full text-left p-4 rounded-lg border transition-colors ${
                    selected
                      ? 'border-warm bg-warm/10'
                      : 'border-deep-border hover:border-deep-border/70'
                  }`}
                >
                  <span className="pointer-events-none font-medium text-text-heading">
                    {selected ? '● ' : '○ '}
                    {opt.label}
                  </span>
                </button>
              );
            })}
            <p className="text-xs text-text-muted mt-2">
              Budget is used to rank fit. Grants outside the range still appear when otherwise strong matches.
            </p>
          </div>
        )}

        {current === 'summary' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-heading mb-2">
                Briefly describe your project (10–800 characters)
              </label>
              <textarea
                value={projectSummary}
                onChange={(e) => setProjectSummary(e.target.value.slice(0, 800))}
                rows={6}
                placeholder="We serve 420 middle-school students and want to launch an after-school robotics and computer science program with equipment for 2 classrooms and teacher training."
                className="w-full rounded-md border border-deep-border bg-deep-alt px-3 py-2 text-text-primary"
              />
              <div className="mt-1 text-xs text-text-muted text-right">
                {projectSummary.length}/800
              </div>
            </div>
            <label className="flex items-start gap-3 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={includeForecasted}
                onChange={(e) => setIncludeForecasted(e.target.checked)}
                className="mt-1"
              />
              <span>
                Include forecasted opportunities and grants closing more than 180 days out.
                <span className="block text-xs text-text-muted mt-1">
                  Off by default — most users want only actionable, near-term deadlines.
                </span>
              </span>
            </label>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-deep-border flex items-center justify-between">
        <button
          onClick={goBack}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-sm rounded-md border border-deep-border text-text-secondary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-deep-alt"
        >
          Back
        </button>
        <button
          onClick={goNext}
          disabled={!canAdvance()}
          className={`px-5 py-2 text-sm font-medium rounded-md transition-colors ${
            canAdvance()
              ? 'btn-warm bg-warm text-white hover:bg-warm/90'
              : 'bg-deep-alt text-text-muted cursor-not-allowed'
          }`}
        >
          {currentIndex === STEPS.length - 1 ? 'Find grants' : 'Next'}
        </button>
      </div>
    </div>
  );
}
