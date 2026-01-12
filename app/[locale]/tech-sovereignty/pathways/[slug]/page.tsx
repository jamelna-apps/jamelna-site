'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { getPathway, type PathwayStep } from '@/data/pathways';
import {
  getPathwayProgress,
  toggleStepCompletion,
  getCompletedCount,
} from '@/lib/sovereignty-progress';
import { notFound } from 'next/navigation';

const colorClasses = {
  sky: {
    bg: 'bg-sky-500/20',
    border: 'border-sky-500/30',
    text: 'text-sky-400',
    progress: 'bg-sky-500',
    ring: 'ring-sky-500/50',
  },
  violet: {
    bg: 'bg-violet-500/20',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    progress: 'bg-violet-500',
    ring: 'ring-violet-500/50',
  },
  amber: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    progress: 'bg-amber-500',
    ring: 'ring-amber-500/50',
  },
  green: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    text: 'text-green-400',
    progress: 'bg-green-500',
    ring: 'ring-green-500/50',
  },
  orange: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    progress: 'bg-orange-500',
    ring: 'ring-orange-500/50',
  },
  rose: {
    bg: 'bg-rose-500/20',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    progress: 'bg-rose-500',
    ring: 'ring-rose-500/50',
  },
};

const typeLabels = {
  'quick-win': { label: 'Quick Win', bg: 'bg-green-500/20', text: 'text-green-400' },
  lesson: { label: 'Lesson', bg: 'bg-sky-500/20', text: 'text-sky-400' },
  project: { label: 'Project', bg: 'bg-violet-500/20', text: 'text-violet-400' },
};

interface StepCardProps {
  step: PathwayStep;
  index: number;
  isCompleted: boolean;
  onToggle: () => void;
  color: keyof typeof colorClasses;
}

function StepCard({ step, index, isCompleted, onToggle, color }: StepCardProps) {
  const colors = colorClasses[color];
  const typeInfo = typeLabels[step.type];

  return (
    <div
      className={`relative bg-zinc-800 border ${
        isCompleted ? colors.border : 'border-zinc-700'
      } rounded-xl p-6 transition-all ${isCompleted ? 'opacity-90' : ''}`}
    >
      {/* Step number */}
      <div
        className={`absolute -left-3 top-6 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
          isCompleted ? `${colors.bg} ${colors.text}` : 'bg-zinc-700 text-zinc-400'
        }`}
      >
        {isCompleted ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          index + 1
        )}
      </div>

      {/* Content */}
      <div className="ml-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${typeInfo.bg} ${typeInfo.text}`}>
                {typeInfo.label}
              </span>
              <span className="text-xs text-zinc-500">{step.duration}</span>
            </div>
            <h3 className={`text-lg font-semibold ${isCompleted ? 'text-zinc-400 line-through' : 'text-white'}`}>
              {step.title}
            </h3>
          </div>
        </div>

        <p className="text-zinc-400 text-sm mb-4">{step.description}</p>

        {/* Checkpoint */}
        <div className={`bg-zinc-900/50 rounded-lg p-4 border ${isCompleted ? colors.border : 'border-zinc-700'}`}>
          <div className="flex items-start gap-3">
            <button
              onClick={onToggle}
              className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                isCompleted
                  ? `${colors.bg} ${colors.border} ${colors.text}`
                  : 'border-zinc-600 hover:border-zinc-500'
              }`}
            >
              {isCompleted && (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Checkpoint:</p>
              <p className={`text-sm ${isCompleted ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>
                {step.checkpoint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PathwayPage() {
  const params = useParams();
  const locale = useLocale();
  const slug = params.slug as string;
  const pathway = getPathway(slug);

  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    if (pathway) {
      setCompletedSteps(getPathwayProgress(slug));
    }
  }, [slug, pathway]);

  if (!pathway) {
    notFound();
  }

  const colors = colorClasses[pathway.color];
  const progressPercent = (completedSteps.length / pathway.steps.length) * 100;

  const handleToggle = (stepId: string) => {
    toggleStepCompletion(slug, stepId);
    setCompletedSteps(getPathwayProgress(slug));
  };

  // Find next incomplete step
  const nextStepIndex = pathway.steps.findIndex((step) => !completedSteps.includes(step.id));

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 px-4 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br from-${pathway.color}-500/10 via-zinc-900 to-zinc-950`}></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href={`/${locale}/tech-sovereignty/pathways`}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Pathways
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            {pathway.title}
          </h1>

          <p className="text-lg text-zinc-300 mb-6 max-w-3xl">
            {pathway.longDescription}
          </p>

          {/* Progress bar */}
          <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${colors.text}`}>
                  {completedSteps.length} of {pathway.steps.length} checkpoints
                </span>
                {completedSteps.length === pathway.steps.length && (
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                    Completed!
                  </span>
                )}
              </div>
              <span className="text-sm text-zinc-500">{pathway.timeEstimate}</span>
            </div>
            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${colors.progress} rounded-full transition-all duration-500`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="py-8 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div className={`bg-zinc-800 border ${colors.border} rounded-xl p-6`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <svg className={`w-5 h-5 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-1">What you&apos;ll achieve</h3>
                <p className="text-lg text-white">{pathway.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Your Journey</h2>
            {nextStepIndex !== -1 && (
              <span className="text-sm text-zinc-400">
                Next: Step {nextStepIndex + 1}
              </span>
            )}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-700 ml-[11px]" />

            <div className="space-y-6">
              {pathway.steps.map((step, index) => (
                <StepCard
                  key={step.id}
                  step={step}
                  index={index}
                  isCompleted={completedSteps.includes(step.id)}
                  onToggle={() => handleToggle(step.id)}
                  color={pathway.color}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      {completedSteps.length === pathway.steps.length && (
        <section className="py-12 px-4 bg-zinc-950">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Pathway Complete!</h2>
            <p className="text-zinc-400 mb-8">
              Congratulations! You&apos;ve completed all checkpoints in this pathway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/tech-sovereignty/pathways`}
                className="inline-flex items-center justify-center gap-2 bg-violet-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-400 transition-colors"
              >
                Explore More Pathways
              </Link>
              <Link
                href={`/${locale}/tech-sovereignty#curriculum`}
                className="inline-flex items-center justify-center gap-2 border border-zinc-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
              >
                Browse Full Curriculum
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
