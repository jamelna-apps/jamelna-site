// app/[locale]/computational-collaboration/page.tsx
'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const cc = {
  ai: '#3D5A6E',       // ink — what AI supplies
  aiLight: '#5A7A8E',
  human: '#C4703F',    // terra — what you supply
  humanLight: '#D4896A',
};

// Verification / Growth / Contribution
const principleColors = ['#2d7d9a', '#3a8f6e', '#c47a2a'];

// Decomposition / Abstraction / Pattern Recognition / Algorithmic Thinking
const crosswalkColors = ['#2c5f8a', '#2d7d9a', '#3a8f6e', '#7b5ea7'];

// Define / Decompose / Direct / Discern / Develop
const cycleColors = ['#2c5f8a', '#2d7d9a', '#3a8f6e', '#c47a2a', '#7b5ea7'];

type SideItem = { term: string; desc: string };
type Principle = { number: string; name: string; quote: string; paragraphs: string[]; test: string };
type CrosswalkRow = { practice: string; traditional: string; ai: string };
type CycleStep = { name: string; tag: string; body: string };

export default function ComputationalCollaborationPage() {
  const t = useTranslations('computationalCollaboration');
  const locale = useLocale();

  const threeCs = t.raw('premise.threeCs') as string[];
  const aiItems = t.raw('coreArgument.aiSide.items') as SideItem[];
  const humanItems = t.raw('coreArgument.humanSide.items') as SideItem[];
  const principles = t.raw('principles.items') as Principle[];
  const crosswalkRows = t.raw('crosswalk.rows') as CrosswalkRow[];
  const cycleSteps = t.raw('cycle.steps') as CycleStep[];

  return (
    <main className="min-h-screen bg-canvas">
      {/* Hero */}
      <section className="pt-10 pb-12 px-6 bg-canvas-deep">
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
        </div>
      </section>

      {/* The Premise */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-8">
            {t('premise.title')}
          </h2>
          <p className="reveal text-xl md:text-2xl font-display text-text-heading leading-snug italic mb-6 stagger-1">
            &ldquo;{t('premise.lead')}&rdquo;
          </p>
          <div className="reveal flex flex-wrap items-center gap-2 mb-8 stagger-2">
            <span className="text-xs uppercase tracking-widest text-text-muted font-mono mr-1">
              {t('premise.threeCsLabel')}
            </span>
            {threeCs.map((c) => (
              <span
                key={c}
                className="px-3 py-1 rounded-full text-sm font-medium border"
                style={{ color: cc.aiLight, borderColor: `${cc.ai}80`, background: `${cc.ai}1A` }}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="reveal space-y-4 text-text-secondary leading-relaxed stagger-3">
            <p>{t('premise.p1')}</p>
            <p>{t('premise.p2')}</p>
            <p className="text-text-primary font-medium">{t('premise.p3')}</p>
            <p>{t('premise.p4')}</p>
          </div>
        </div>
      </section>

      {/* The Core Argument — team equation */}
      <section className="py-16 px-4 bg-canvas-deep">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-6 text-center">
            {t('coreArgument.title')}
          </h2>
          <p className="reveal text-text-secondary leading-relaxed text-center max-w-2xl mx-auto mb-4 stagger-1">
            {t('coreArgument.intro')}
          </p>
          <p className="reveal text-xl md:text-2xl font-display font-semibold text-terra text-center mb-4 stagger-2">
            {t('coreArgument.pullLine')}
          </p>
          <p className="reveal text-text-secondary leading-relaxed text-center max-w-2xl mx-auto mb-12 stagger-3">
            {t('coreArgument.bridge')}
          </p>

          <div className="reveal grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-stretch stagger-3">
            {/* AI side */}
            <div
              className="rounded-lg p-6 bg-canvas-raised border border-canvas-border"
              style={{ borderTop: `3px solid ${cc.ai}` }}
            >
              <p className="text-xs uppercase tracking-widest font-mono mb-4" style={{ color: cc.aiLight }}>
                {t('coreArgument.aiSide.label')}
              </p>
              <div className="space-y-4">
                {aiItems.map((item) => (
                  <div key={item.term} className="flex gap-3">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 text-text-heading"
                      style={{ background: cc.ai }}
                    >
                      {item.term.charAt(0)}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-text-heading text-sm">{item.term}</p>
                      <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plus */}
            <div className="flex md:flex-col items-center justify-center">
              <span className="text-4xl font-display font-bold text-text-muted">+</span>
            </div>

            {/* Human side */}
            <div
              className="rounded-lg p-6 bg-canvas-raised border border-canvas-border"
              style={{ borderTop: `3px solid ${cc.human}` }}
            >
              <p className="text-xs uppercase tracking-widest font-mono text-terra mb-4">
                {t('coreArgument.humanSide.label')}
              </p>
              <div className="space-y-4">
                {humanItems.map((item) => (
                  <div key={item.term} className="flex gap-3">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 text-canvas-deep"
                      style={{ background: cc.human }}
                    >
                      {item.term.charAt(0)}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-text-heading text-sm">{item.term}</p>
                      <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Equals */}
          <div className="reveal flex flex-col items-center mt-6 stagger-4">
            <span className="text-4xl font-display font-bold text-text-muted mb-4">=</span>
            <div
              className="rounded-lg px-8 py-4 text-center border"
              style={{
                background: `linear-gradient(135deg, ${cc.ai}26, ${cc.human}26)`,
                borderColor: `${cc.human}40`,
              }}
            >
              <p className="font-display font-bold text-text-heading text-lg">
                {t('coreArgument.equalsLabel')}
              </p>
            </div>
          </div>

          <p className="reveal text-text-secondary leading-relaxed text-center max-w-2xl mx-auto mt-10 stagger-5">
            {t('coreArgument.closing')}
          </p>

          <aside
            className="reveal max-w-2xl mx-auto mt-10 rounded-lg bg-canvas-raised/50 border border-canvas-border p-6 md:p-7"
            style={{ borderLeft: `3px solid ${cc.human}` }}
          >
            <p className="text-xs uppercase tracking-widest text-terra font-mono mb-3">
              {t('coreArgument.note.label')}
            </p>
            <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
              <p>{t('coreArgument.note.p1')}</p>
              <p>{t('coreArgument.note.p2')}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Three Principles */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-10 text-center">
            {t('principles.title')}
          </h2>
          <div className="space-y-8">
            {principles.map((p, i) => {
              const color = principleColors[i];
              return (
                <article
                  key={p.number}
                  className={`reveal relative overflow-hidden rounded-lg bg-canvas-raised border border-canvas-border p-6 md:p-8 stagger-${i + 1}`}
                  style={{ borderLeft: `4px solid ${color}` }}
                >
                  <span
                    aria-hidden
                    className="absolute -top-6 right-2 font-display font-extrabold select-none pointer-events-none"
                    style={{ fontSize: '7rem', lineHeight: 1, color: `${color}14` }}
                  >
                    {p.number}
                  </span>
                  <p className="text-xs uppercase tracking-widest font-mono mb-2" style={{ color }}>
                    {p.number}
                  </p>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-text-heading mb-3">
                    {p.name}
                  </h3>
                  <p className="text-lg md:text-xl font-display italic mb-5" style={{ color }}>
                    &ldquo;{p.quote}&rdquo;
                  </p>
                  <div className="space-y-4 text-sm md:text-base text-text-secondary leading-relaxed mb-6">
                    {p.paragraphs.map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                  <div
                    className="rounded-lg p-4 border"
                    style={{ background: `${color}10`, borderColor: `${color}30` }}
                  >
                    <p className="text-xs uppercase tracking-widest font-mono mb-2" style={{ color }}>
                      {t('principles.testLabel')}
                    </p>
                    <p className="text-sm md:text-base text-text-primary font-medium">{p.test}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Computational Thinking Crosswalk */}
      <section className="py-16 px-4 bg-canvas-deep">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-3 text-center">
            {t('crosswalk.title')}
          </h2>
          <p className="reveal text-text-muted text-center max-w-2xl mx-auto mb-10 stagger-1">
            {t('crosswalk.intro')}
          </p>

          <div className="space-y-3">
            {crosswalkRows.map((row, i) => {
              const color = crosswalkColors[i];
              return (
                <div
                  key={row.practice}
                  className={`reveal rounded-lg bg-canvas-raised border border-canvas-border p-5 md:p-6 stagger-${(i % 3) + 1}`}
                  style={{ borderLeft: `4px solid ${color}` }}
                >
                  <p className="font-display font-bold mb-4" style={{ color }}>
                    {row.practice}
                  </p>
                  <div className="grid md:grid-cols-[1fr_auto_1.4fr] gap-3 md:gap-5 items-start">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-1.5">
                        {t('crosswalk.colTraditional')}
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed">{row.traditional}</p>
                    </div>
                    <svg
                      className="hidden md:block w-5 h-5 mt-5 shrink-0 text-text-muted"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-mono mb-1.5" style={{ color }}>
                        {t('crosswalk.colAI')}
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed">{row.ai}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="reveal text-text-secondary leading-relaxed max-w-2xl mx-auto text-center mt-10 stagger-3">
            {t('crosswalk.outro')}
          </p>
        </div>
      </section>

      {/* The Practice Cycle: The Five Ds */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-3 text-center">
            {t('cycle.title')}
          </h2>
          <p className="reveal text-text-muted text-center mb-12 stagger-1">
            {t('cycle.intro')}
          </p>

          <ol className="relative">
            {cycleSteps.map((step, i) => {
              const color = cycleColors[i];
              const isLast = i === cycleSteps.length - 1;
              return (
                <li key={step.name} className={`reveal relative flex gap-5 pb-10 stagger-${(i % 3) + 1}`}>
                  {!isLast && (
                    <span
                      aria-hidden
                      className="absolute left-5 top-12 bottom-0 w-px"
                      style={{ background: `linear-gradient(${color}, ${cycleColors[i + 1]})` }}
                    />
                  )}
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-text-heading shrink-0 z-10"
                    style={{ background: color }}
                  >
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-display font-bold text-text-heading">{step.name}</h3>
                      <span
                        className="text-[0.65rem] uppercase tracking-wider font-mono px-2 py-0.5 rounded"
                        style={{ color, background: `${color}1A` }}
                      >
                        {step.tag}
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed">{step.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Loop back */}
          <div className="reveal flex items-center gap-3 pl-1 mb-10 stagger-2">
            <svg className="w-8 h-8 shrink-0" style={{ color: cycleColors[0] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M4 9a8 8 0 1 1-1 7" />
            </svg>
            <p className="text-sm text-text-muted italic">{t('cycle.outro')}</p>
          </div>
        </div>
      </section>

      {/* Why This Framework, Why Now */}
      <section className="py-16 px-4 bg-canvas-deep">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-6 text-center">
            {t('whyNow.title')}
          </h2>
          <p className="reveal text-text-secondary leading-relaxed max-w-2xl mx-auto text-center mb-12 stagger-1">
            {t('whyNow.p1')}
          </p>

          <div className="reveal grid md:grid-cols-3 gap-4 items-stretch mb-16 stagger-2">
            <div className="rounded-lg p-5 bg-canvas-raised/50 border border-dashed border-canvas-border text-center">
              <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-2">
                {t('whyNow.poleTutorials.label')}
              </p>
              <p className="text-sm text-text-muted italic">&ldquo;{t('whyNow.poleTutorials.quote')}&rdquo;</p>
            </div>
            <div
              className="rounded-lg p-5 text-center border-2"
              style={{ borderColor: cc.human, background: `${cc.human}10` }}
            >
              <p className="text-xs uppercase tracking-widest text-terra font-mono mb-2">
                {t('whyNow.middle.label')}
              </p>
              <p className="text-sm text-text-primary">{t('whyNow.middle.desc')}</p>
            </div>
            <div className="rounded-lg p-5 bg-canvas-raised/50 border border-dashed border-canvas-border text-center">
              <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-2">
                {t('whyNow.poleGuardrails.label')}
              </p>
              <p className="text-sm text-text-muted italic">&ldquo;{t('whyNow.poleGuardrails.quote')}&rdquo;</p>
            </div>
          </div>

          <p className="reveal text-text-secondary leading-relaxed max-w-2xl mx-auto text-center mb-8 stagger-1">
            {t('whyNow.bet')}
          </p>
          <div className="reveal text-center stagger-2">
            <hr className="heading-rule mx-auto" />
            <p className="text-display-section font-display font-extrabold text-text-heading">
              {t('whyNow.bigQuestion')}
            </p>
          </div>
        </div>
      </section>

      {/* Footer attribution */}
      <section className="py-12 px-4 bg-canvas border-t border-canvas-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-text-muted text-sm">{t('footer.share')}</p>
          <p className="text-text-muted mt-4 font-display font-medium">{t('footer.attribution')}</p>
          <p className="mt-6 text-sm">
            <span className="text-text-muted font-mono text-xs uppercase tracking-widest mr-2">
              {t('footer.relatedLabel')}
            </span>
            <Link
              href={`/${locale}/anchor-and-steer`}
              className="text-terra hover:text-terra-light transition-colors link-underline"
            >
              {t('footer.relatedText')}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
