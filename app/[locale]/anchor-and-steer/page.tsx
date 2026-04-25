// app/[locale]/anchor-and-steer/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = ref.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

const fc = {
  anchor: '#1a3a5c',
  anchorMid: '#2c5f8a',
  S: '#2d7d9a',
  T: '#3a8f6e',
  E1: '#c47a2a',
  E2: '#b85450',
  R: '#7b5ea7',
};

const dimensionColors = [fc.S, fc.T, fc.E1, fc.E2, fc.R];

const researchColors = [
  '#e5a03b',
  fc.anchor,
  fc.S,
  fc.T,
  fc.E1,
  fc.R,
];

type FailureItem = { type: 'failure' | 'success'; mode: string; description: string };
type AnchorQuestion = { number: string; question: string; detail: string };
type Dimension = {
  letter: string;
  title: string;
  subtitle: string;
  designThinking: string;
  description: string;
  keyInsight: string;
  example: string;
  coachExample?: string;
};
type SimpleItem = { title: string; text: string };
type AnchorCardField = { field: string; prompt: string };
type ResearchItem = { dimension: string; sources: string[] };
type UseCaseItem = { title: string; description: string };

export default function AnchorAndSteerPage() {
  const [expandedDimension, setExpandedDimension] = useState<number | null>(null);
  const containerRef = useScrollReveal();
  const t = useTranslations('anchorAndSteer');

  const failureModes = t.raw('failureModes.items') as FailureItem[];
  const anchorQuestions = t.raw('anchorSection.questions') as AnchorQuestion[];
  const dimensions = t.raw('dimensions') as Dimension[];
  const designImplications = t.raw('designImplications.items') as SimpleItem[];
  const anchorCardFields = t.raw('anchorCard.fields') as AnchorCardField[];
  const researchConnections = t.raw('researchConnections.items') as ResearchItem[];
  const useCases = t.raw('howToUse.items') as UseCaseItem[];

  return (
    <main ref={containerRef} className="min-h-screen bg-canvas pt-16">
      {/* Hero */}
      <section className="pt-10 pb-8 px-6 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <hr className="heading-rule" />
          <p className="reveal text-sm uppercase tracking-widest text-terra mb-4 font-mono">
            {t('hero.kicker')}
          </p>
          <h1 className="reveal text-display-section font-display font-extrabold text-text-heading mb-6 stagger-1">
            {t('hero.title')}
          </h1>
          <p className="reveal text-lg text-text-secondary max-w-2xl leading-relaxed mb-4 stagger-2">
            {t('hero.tagline')}
          </p>
          <p className="reveal text-sm text-text-muted stagger-3">
            {t('hero.byline')}
          </p>
          <p className="reveal text-sm text-text-muted/70 mt-1 stagger-3">
            {t('hero.credits')}
          </p>
        </div>
      </section>

      {/* Core Principle */}
      <section className="py-12 px-4 bg-canvas-deep border-t border-canvas-border">
        <div className="max-w-3xl mx-auto">
          <div
            className="reveal rounded-lg p-7 md:p-8 bg-canvas-elevated/60"
            style={{ borderLeft: `4px solid ${fc.anchorMid}` }}
          >
            <p className="text-sm uppercase tracking-widest mb-3 font-mono" style={{ color: fc.anchorMid }}>
              {t('corePrinciple.label')}
            </p>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              {t('corePrinciple.body')}
            </p>
            <div className="pt-5 border-t border-canvas-border">
              <p className="text-xs uppercase tracking-widest text-terra mb-4 font-mono">
                {t('corePrinciple.nonNegotiablesLabel')}
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="font-mono text-sm shrink-0 mt-0.5" style={{ color: fc.anchorMid }}>01</span>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    <strong className="text-text-heading">{t('corePrinciple.humanInLoopTitle')}</strong> {t('corePrinciple.humanInLoopBody')}
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-sm shrink-0 mt-0.5" style={{ color: fc.anchorMid }}>02</span>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    <strong className="text-text-heading">{t('corePrinciple.aiHonestTitle')}</strong> {t('corePrinciple.aiHonestBody')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-6">
            {t('problem.title')}
          </h2>
          <div className="reveal space-y-4 text-text-secondary leading-relaxed stagger-1">
            <p>
              {t('problem.p1Pre')}<em>&ldquo;{t('problem.p1Wrong')}&rdquo;</em>{t('problem.p1Mid')}<em>&ldquo;{t('problem.p1Right')}&rdquo;</em>
            </p>
            <p>{t('problem.p2')}</p>
            <p>{t('problem.p3')}</p>
            <p>
              {t('problem.p4Pre')}<em>{t('problem.p4Then')}</em>{t('problem.p4Post')}
            </p>
          </div>
        </div>
      </section>

      {/* Rooted in Design Thinking */}
      <section className="py-16 px-4 bg-canvas-deep">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-3 text-center">
            {t('designThinking.title')}
          </h2>
          <p className="reveal text-text-muted text-center mb-10 max-w-2xl mx-auto stagger-1">
            {t('designThinking.intro')}
          </p>

          <div className="reveal grid md:grid-cols-2 gap-6 stagger-2">
            <div className="bg-canvas-elevated border border-canvas-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-text-heading font-bold text-sm" style={{ background: fc.anchor }}>A</div>
                <div>
                  <h3 className="font-display font-semibold text-text-heading">{t('designThinking.anchorCardTitle')}</h3>
                  <p className="text-xs text-text-muted">{t('designThinking.anchorCardSubtitle')}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-terra text-sm font-semibold shrink-0">{t('designThinking.empathizeLabel')}</span>
                  <p className="text-sm text-text-muted">{t('designThinking.empathizeText')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-terra text-sm font-semibold shrink-0">{t('designThinking.defineLabel')}</span>
                  <p className="text-sm text-text-muted">{t('designThinking.defineText')}</p>
                </div>
              </div>
            </div>

            <div className="bg-canvas-elevated border border-canvas-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {['S','T','E','E','R'].map((l, i) => (
                    <div key={i} className="w-6 h-6 rounded flex items-center justify-center text-text-heading font-bold text-xs" style={{ background: dimensionColors[i] }}>{l}</div>
                  ))}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-text-heading">{t('designThinking.steerCardTitle')}</h3>
                  <p className="text-xs text-text-muted">{t('designThinking.steerCardSubtitle')}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-terra text-sm font-semibold shrink-0">{t('designThinking.ideateLabel')}</span>
                  <p className="text-sm text-text-muted">{t('designThinking.ideateText')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-terra text-sm font-semibold shrink-0">{t('designThinking.prototypeLabel')}</span>
                  <p className="text-sm text-text-muted">{t('designThinking.prototypeText')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-terra text-sm font-semibold shrink-0">{t('designThinking.testLabel')}</span>
                  <p className="text-sm text-text-muted">{t('designThinking.testText')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal mt-8 bg-canvas-elevated border border-canvas-border rounded-lg p-5 text-center stagger-3">
            <p className="text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed">
              <strong className="text-terra">{t('designThinking.keyDifferenceLabel')}</strong> {t('designThinking.keyDifferenceBody')}
            </p>
          </div>
        </div>
      </section>

      {/* Common Failure Modes */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-8 text-center">
            {t('failureModes.title')}
          </h2>
          <div className="reveal grid md:grid-cols-2 gap-4 stagger-1">
            {failureModes.map((fm, i) => (
              <div
                key={i}
                className={`rounded-lg p-5 border ${
                  fm.type === 'success'
                    ? 'bg-emerald-500/5 border-emerald-500/20'
                    : 'bg-red-500/5 border-red-500/15'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-lg ${fm.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {fm.type === 'success' ? '✓' : '✗'}
                  </span>
                  <h3 className={`font-display font-semibold ${fm.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {fm.mode}
                  </h3>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">{fm.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Structure Diagram */}
      <section className="py-16 px-4 bg-canvas-deep">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-10 text-center">
            {t('frameworkStructure.title')}
          </h2>

          <div className="reveal grid grid-cols-5 gap-2 md:gap-3 mb-3 stagger-1">
            {dimensions.map((d, i) => (
              <div
                key={i}
                className="rounded-t-lg p-3 md:p-4 text-center"
                style={{ background: `${dimensionColors[i]}15`, borderTop: `3px solid ${dimensionColors[i]}` }}
              >
                <span className="text-2xl md:text-3xl font-bold" style={{ color: dimensionColors[i] }}>{d.letter}</span>
                <p className="text-xs text-text-muted mt-1 hidden md:block leading-tight">{d.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center text-xs text-text-muted uppercase tracking-widest mb-4 font-mono">{t('frameworkStructure.designLayer')}</div>

          <div className="reveal rounded-lg p-6 text-center stagger-2" style={{ background: `${fc.anchor}20`, border: `1px solid ${fc.anchor}40` }}>
            <p className="text-sm uppercase tracking-widest mb-2 font-mono" style={{ color: fc.anchorMid }}>{t('frameworkStructure.foundationLabel')}</p>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              {t('frameworkStructure.foundationBody')}
            </p>
          </div>
        </div>
      </section>

      {/* ANCHOR: Ground Before You Build */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-3xl mx-auto">
          <div className="reveal flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-text-heading font-bold" style={{ background: fc.anchor }}>A</div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-heading">{t('anchorSection.title')}</h2>
          </div>
          <p className="reveal text-text-muted mb-6 stagger-1">
            {t('anchorSection.intro1')}
          </p>
          <p className="reveal text-text-muted mb-8 stagger-2">
            {t('anchorSection.intro2')}
          </p>

          <h3 className="reveal text-xl font-display font-semibold text-text-heading mb-6 stagger-3">{t('anchorSection.questionsTitle')}</h3>
          <div className="space-y-4">
            {anchorQuestions.map((q, i) => (
              <div key={q.number} className={`reveal rounded-lg p-5 stagger-${i + 2}`} style={{ background: `${fc.anchor}10`, borderLeft: `3px solid ${fc.anchorMid}` }}>
                <div className="flex items-start gap-3">
                  <span className="text-lg font-bold font-mono" style={{ color: fc.anchorMid }}>{q.number}</span>
                  <div>
                    <p className="font-medium text-text-heading mb-2">{q.question}</p>
                    <p className="text-sm text-text-muted leading-relaxed">{q.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-8 bg-canvas-elevated border border-canvas-border rounded-lg p-6">
            <h4 className="font-display font-semibold text-terra mb-3">{t('anchorSection.criticalDistinctionTitle')}</h4>
            <p className="text-sm text-text-secondary mb-2">
              {t('anchorSection.criticalDistinction1Pre')}<em>&ldquo;{t('anchorSection.criticalDistinction1Quote')}&rdquo;</em> <strong className="text-red-400">{t('anchorSection.criticalDistinction1Verb')}</strong>{t('anchorSection.criticalDistinction1Post')}
            </p>
            <p className="text-sm text-text-secondary">
              {t('anchorSection.criticalDistinction2Pre')}<em>&ldquo;{t('anchorSection.criticalDistinction2Quote')}&rdquo;</em> <strong className="text-emerald-400">{t('anchorSection.criticalDistinction2Verb')}</strong>{t('anchorSection.criticalDistinction2Post')}
            </p>
          </div>
        </div>
      </section>

      {/* STEER Dimensions */}
      <section className="py-16 px-4 bg-canvas-deep">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-3 text-center">
            {t('steerSection.title')}
          </h2>
          <p className="reveal text-text-muted text-center mb-10 stagger-1">
            {t('steerSection.intro')}
          </p>

          <div className="space-y-3">
            {dimensions.map((d, i) => {
              const color = dimensionColors[i];
              return (
                <div key={i} className={`reveal rounded-lg overflow-hidden border border-canvas-border stagger-${(i % 3) + 1}`}>
                  <button
                    onClick={() => setExpandedDimension(expandedDimension === i ? null : i)}
                    className="w-full p-5 flex items-center gap-4 text-left hover:bg-canvas-elevated/50 transition-colors"
                    style={{ borderLeft: `4px solid ${color}` }}
                  >
                    <span className="text-3xl font-bold shrink-0" style={{ color }}>{d.letter}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-text-heading">{d.title}</h3>
                      <p className="text-sm text-text-muted">{d.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline-block text-xs font-mono px-2 py-0.5 rounded bg-canvas-elevated text-text-muted">{d.designThinking}</span>
                      <svg
                        className={`w-4 h-4 text-text-muted transition-transform ${expandedDimension === i ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {expandedDimension === i && (
                    <div className="px-5 pb-5 space-y-4 bg-canvas-elevated/30" style={{ borderLeft: `4px solid ${color}` }}>
                      <p className="text-text-secondary text-sm leading-relaxed">{d.description}</p>
                      <p className="text-text-muted text-sm italic border-l-2 border-canvas-border pl-3">{d.keyInsight}</p>
                      <div className="rounded-lg p-4 bg-canvas-elevated/60 border border-canvas-border">
                        <p className="text-xs uppercase tracking-wider mb-2 font-mono" style={{ color }}>{t('steerSection.exampleLabel')}</p>
                        <p className="text-sm text-text-secondary leading-relaxed">{d.example}</p>
                      </div>
                      {d.coachExample && (
                        <div className="rounded-lg p-4 border border-terra/20 bg-terra/5">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs uppercase tracking-wider font-mono text-terra">{t('steerSection.seeInPracticeLabel')}</span>
                            <span className="text-xs text-text-muted">{t('steerSection.coachPlatformLabel')}</span>
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed">{d.coachExample}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Continuous Cycle */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-4">
            {t('cycle.title')}
          </h2>
          <p className="reveal text-text-muted mb-10 stagger-1">
            {t('cycle.intro')}
          </p>

          <div className="reveal flex items-center justify-center gap-4 md:gap-8 mb-10 stagger-2">
            <div className="rounded-lg p-4 md:p-6 text-center bg-canvas-elevated border border-canvas-border" style={{ borderTop: `3px solid ${fc.anchorMid}` }}>
              <p className="font-display font-bold text-text-heading text-sm md:text-base">{t('cycle.anchor')}</p>
              <p className="text-xs text-text-muted mt-1">{t('cycle.anchorDesc')}</p>
            </div>
            <svg className="w-6 h-6 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="rounded-lg p-4 md:p-6 text-center bg-canvas-elevated border border-canvas-border" style={{ borderTop: `3px solid ${fc.S}` }}>
              <p className="font-display font-bold text-text-heading text-sm md:text-base">{t('cycle.steer')}</p>
              <p className="text-xs text-text-muted mt-1">{t('cycle.steerDesc')}</p>
            </div>
            <svg className="w-6 h-6 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="rounded-lg p-4 md:p-6 text-center bg-canvas-elevated border border-canvas-border" style={{ borderTop: `3px solid ${fc.R}` }}>
              <p className="font-display font-bold text-text-heading text-sm md:text-base">{t('cycle.reanchor')}</p>
              <p className="text-xs text-text-muted mt-1">{t('cycle.reanchorDesc')}</p>
            </div>
          </div>

          <p className="reveal text-text-muted text-sm italic max-w-xl mx-auto stagger-3">
            {t('cycle.footer')}
          </p>
        </div>
      </section>

      {/* Design Implications */}
      <section className="py-16 px-4 bg-canvas-deep">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-8">
            {t('designImplications.title')}
          </h2>
          <div className="reveal grid md:grid-cols-2 gap-4 stagger-1">
            {designImplications.map((item, i) => (
              <div
                key={i}
                className={`bg-canvas-elevated border border-canvas-border rounded-lg p-5 ${i === 0 ? 'md:col-span-2 border-l-2' : ''}`}
                style={i === 0 ? { borderLeftColor: fc.anchorMid } : undefined}
              >
                <h3 className="font-display font-semibold text-text-heading mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Anchor Card */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-3">
            {t('anchorCard.title')}
          </h2>
          <p className="reveal text-text-muted mb-8 stagger-1">{t('anchorCard.intro')}</p>

          <div className="reveal rounded-lg p-6 space-y-4 bg-canvas-elevated/50 border-2 border-dashed border-canvas-border stagger-2">
            {anchorCardFields.map((f, i) => (
              <div key={i}>
                <label className="text-sm font-mono font-medium text-terra">{f.field}</label>
                <div className="mt-1 rounded-lg px-4 py-3 text-sm text-text-muted italic bg-canvas-deep/50 border border-canvas-border" style={{ minHeight: '44px' }}>
                  {f.prompt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Connections */}
      <section className="py-16 px-4 bg-canvas-deep">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-8">
            {t('researchConnections.title')}
          </h2>
          <div className="reveal grid md:grid-cols-2 gap-4 stagger-1">
            {researchConnections.map((rc, i) => {
              const color = researchColors[i];
              return (
                <div key={i} className="bg-canvas-elevated border border-canvas-border rounded-lg p-4" style={{ borderLeft: `3px solid ${color}` }}>
                  <p className="text-sm font-display font-semibold mb-2" style={{ color }}>{rc.dimension}</p>
                  <ul className="space-y-1">
                    {rc.sources.map((s, j) => (
                      <li key={j} className="text-xs text-text-muted leading-relaxed">{s}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Use This Framework */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-8">
            {t('howToUse.title')}
          </h2>
          <div className="reveal grid md:grid-cols-2 gap-4 stagger-1">
            {useCases.map((uc, i) => (
              <div key={i} className="bg-canvas-elevated border border-canvas-border rounded-lg p-5">
                <h3 className="font-display font-semibold text-text-heading mb-2">{uc.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Attribution */}
      <section className="py-12 px-4 bg-canvas border-t border-canvas-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-text-muted text-sm">
            {t('footer.share')}
          </p>
          <p className="text-text-muted mt-4 font-display font-medium">
            {t('footer.attribution')}
          </p>
        </div>
      </section>
    </main>
  );
}
