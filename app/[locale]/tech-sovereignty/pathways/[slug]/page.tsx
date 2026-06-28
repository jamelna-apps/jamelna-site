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
  trackRefToUrl,
} from '@/lib/sovereignty-progress';
import { notFound } from 'next/navigation';

const colorClasses = {
  sky: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    text: 'text-terra-light',
    progress: 'bg-terra',
    ring: 'ring-terra/50',
  },
  violet: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    text: 'text-terra-light',
    progress: 'bg-terra',
    ring: 'ring-terra/50',
  },
  amber: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    text: 'text-terra-light',
    progress: 'bg-terra',
    ring: 'ring-terra/50',
  },
  green: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    text: 'text-terra-light',
    progress: 'bg-terra',
    ring: 'ring-terra/50',
  },
  orange: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    text: 'text-terra-light',
    progress: 'bg-terra',
    ring: 'ring-terra/50',
  },
  rose: {
    bg: 'bg-terra/20',
    border: 'border-terra/30',
    text: 'text-terra-light',
    progress: 'bg-terra',
    ring: 'ring-terra/50',
  },
};

const typeLabels = {
  'quick-win': { label: 'Quick Win', bg: 'bg-terra/20', text: 'text-terra-light' },
  lesson: { label: 'Lesson', bg: 'bg-terra/20', text: 'text-terra-light' },
  project: { label: 'Project', bg: 'bg-terra/20', text: 'text-terra-light' },
};

interface StepCardProps {
  step: PathwayStep;
  index: number;
  isLast: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  color: keyof typeof colorClasses;
  locale: string;
}

function StepCard({ step, index, isLast, isCompleted, onToggle, color, locale }: StepCardProps) {
  const colors = colorClasses[color];
  const typeInfo = typeLabels[step.type];
  const lessonInfo = trackRefToUrl(step.trackRef, locale);

  return (
    <div className="relative flex gap-5">
      {/* Timeline rail: connector line + number / completion badge */}
      <div className="relative flex-shrink-0 w-9">
        {!isLast && (
          <div className="absolute left-1/2 top-9 -bottom-6 w-px -translate-x-1/2 bg-canvas-border" />
        )}
        <div
          className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ring-4 ring-canvas transition-colors ${
            isCompleted ? `${colors.bg} ${colors.text}` : 'bg-canvas-raised border border-canvas-border text-text-secondary'
          }`}
        >
          {isCompleted ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            index + 1
          )}
        </div>
      </div>

      {/* Card */}
      <div
        className={`flex-1 min-w-0 bg-canvas-raised border rounded-xl p-5 transition-colors ${
          isCompleted ? `${colors.border} opacity-80` : 'border-canvas-border'
        }`}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeInfo.bg} ${typeInfo.text}`}>
            {typeInfo.label}
          </span>
          <span className="text-xs text-text-muted">{step.duration}</span>
        </div>
        <h3 className={`font-display text-lg font-semibold mb-1.5 ${isCompleted ? 'text-text-secondary line-through' : 'text-white'}`}>
          {step.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>

        {/* Lesson Link */}
        {lessonInfo && (
          <Link
            href={lessonInfo.url}
            className={`inline-flex items-center gap-1.5 text-sm font-medium ${colors.text} hover:underline mt-3`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Go to {lessonInfo.trackName} - Project {lessonInfo.projectId.replace('project-', '')}, Lesson {lessonInfo.lessonNum}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        )}

        {/* Checkpoint — fully clickable row, separated by a hairline */}
        <button
          onClick={onToggle}
          aria-pressed={isCompleted}
          className="group mt-4 flex w-full items-start gap-3 border-t border-canvas-border pt-4 text-left"
        >
          <span
            className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
              isCompleted ? `${colors.bg} ${colors.border} ${colors.text}` : 'border-canvas-border group-hover:border-text-muted'
            }`}
          >
            {isCompleted && (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          <span className="min-w-0">
            <span className="block text-xs uppercase tracking-wide text-text-muted mb-0.5">Checkpoint</span>
            <span className={`block text-sm ${isCompleted ? 'text-text-muted line-through' : 'text-text-secondary'}`}>
              {step.checkpoint}
            </span>
          </span>
        </button>
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
    <main className="min-h-screen bg-canvas">
      {/* Hero Section */}
      <section className="relative pt-10 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-terra/10 via-zinc-900 to-zinc-950"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href={`/${locale}/tech-sovereignty/pathways`}
            className="inline-flex items-center gap-2 text-text-secondary hover:text-white mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Pathways
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            {pathway.title}
          </h1>

          <p className="text-lg text-text-secondary mb-6 max-w-3xl">
            {pathway.longDescription}
          </p>

          {/* Progress bar */}
          <div className="bg-canvas-raised rounded-xl p-6 border border-canvas-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${colors.text}`}>
                  {completedSteps.length} of {pathway.steps.length} checkpoints
                </span>
                {completedSteps.length === pathway.steps.length && (
                  <span className="bg-terra/20 text-terra-light text-xs px-2 py-1 rounded-full">
                    Completed!
                  </span>
                )}
              </div>
              <span className="text-sm text-text-muted">{pathway.timeEstimate}</span>
            </div>
            <div className="h-2 bg-canvas-border rounded-full overflow-hidden">
              <div
                className={`h-full ${colors.progress} rounded-full transition-all duration-500`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="py-8 px-4 bg-canvas-deep">
        <div className="max-w-4xl mx-auto">
          <div className={`bg-canvas-raised border ${colors.border} rounded-xl p-6`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <svg className={`w-5 h-5 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-sm font-medium text-text-secondary mb-1">What you&apos;ll achieve</h3>
                <p className="text-lg text-white">{pathway.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 px-4 bg-canvas">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-white">Your Journey</h2>
            {nextStepIndex !== -1 && (
              <span className="text-sm text-text-secondary">
                Next: Step {nextStepIndex + 1}
              </span>
            )}
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {pathway.steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                isLast={index === pathway.steps.length - 1}
                isCompleted={completedSteps.includes(step.id)}
                onToggle={() => handleToggle(step.id)}
                color={pathway.color}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps */}
      {completedSteps.length === pathway.steps.length && (
        <section className="py-12 px-4 bg-canvas-deep">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-terra/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-terra-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">Pathway Complete!</h2>
            <p className="text-text-secondary mb-8">
              Congratulations! You&apos;ve completed all checkpoints in this pathway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/tech-sovereignty/pathways`}
                className="inline-flex items-center justify-center gap-2 bg-terra text-white px-6 py-3 rounded-lg font-semibold hover:bg-terra-light transition-colors"
              >
                Explore More Pathways
              </Link>
              <Link
                href={`/${locale}/tech-sovereignty#curriculum`}
                className="inline-flex items-center justify-center gap-2 border border-canvas-border text-text-heading px-6 py-3 rounded-lg font-semibold hover:bg-canvas-raised transition-colors"
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
