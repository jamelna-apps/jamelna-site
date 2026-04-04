// app/[locale]/anchor-and-steer/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';

// Scroll reveal (matches homepage pattern)
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

// Framework colors (from the Anchor & STEER design spec)
const fc = {
  anchor: '#1a3a5c',
  anchorMid: '#2c5f8a',
  S: '#2d7d9a',
  T: '#3a8f6e',
  E1: '#c47a2a',
  E2: '#b85450',
  R: '#7b5ea7',
};

const dimensions = [
  {
    letter: 'S',
    title: 'Shared Mental Model',
    subtitle: 'Transparency that teaches, not just tells',
    color: fc.S,
    designThinking: 'Empathize',
    description:
      'The AI and the teacher need to be working from the same understanding of what\'s happening. That means the AI doesn\'t just give recommendations. It shows its reasoning, its confidence level, and the data behind its conclusions. Teachers can inspect that reasoning, question it, and correct it when the AI gets something wrong.',
    keyInsight:
      'Transparency isn\'t just about being explainable. It\'s about being educative. The teacher should learn something from reading the AI\'s reasoning, not just verify that it ran.',
    example:
      '"I flagged these 7 students because their quiz responses suggest difficulty with fraction comparison. But I\'m only moderately confident. Three of them may have been affected by the timed format rather than a conceptual gap. You know your students better than I do."',
    coachExample:
      'In the Coach platform at coach.jamelna.com, the AI chat uses retrieval-augmented generation with visible citations. When a coach asks "How should I approach a teacher who\'s resistant to feedback?", the response includes bracketed references to specific knowledge base articles. The coach can click through to verify the source, question the recommendation, or explore further. The AI never presents its answers as authoritative conclusions.',
  },
  {
    letter: 'T',
    title: 'Teacher-Set Guardrails',
    subtitle: 'The policy layer teachers author themselves',
    color: fc.T,
    designThinking: 'Define',
    description:
      'Teachers define the boundaries the AI operates within. What can it do without asking? When should it intervene? What materials can it draw from? These aren\'t developer settings buried in a config file. They\'re pedagogical choices that belong to the teacher, and the act of articulating them is itself a form of professional development.',
    keyInsight:
      'Constraints aren\'t limitations. When a teacher defines their guardrails, they\'re clarifying their own teaching philosophy. The AI\'s operating parameters become a mirror for the teacher\'s pedagogical intent.',
    example:
      'A teacher who believes in productive struggle configures: "Wait at least 3 attempts before offering scaffolding. Never give direct answers. Let students choose their own problem difficulty." Those aren\'t restrictions on the AI. They\'re a teaching philosophy made executable.',
    coachExample:
      'Coach platform users set their own coaching context: which teachers they work with, which schools, which grade levels and subjects. The AI chat scopes its responses to that context rather than giving generic advice. When a coach asks about differentiation strategies, the system draws from their specific teacher relationships and observation history, not a one-size-fits-all knowledge base.',
  },
  {
    letter: 'E',
    title: 'Escalation Pathways',
    subtitle: 'Knowing when to hand off, not just hand over',
    color: fc.E1,
    designThinking: 'Prototype',
    description:
      'Not everything should be automated. Some moments require a human. The framework needs clearly designed points where the AI steps back and surfaces something to the teacher: when it\'s uncertain, when there\'s an emotional or social signal it can\'t interpret, or when a decision requires pedagogical judgment that no model should be making alone.',
    keyInsight:
      'The design challenge is friction. Escalations need to be lightweight enough that they actually happen, but visible enough that teachers feel informed rather than ambushed.',
    example:
      '"Maria has submitted and deleted her response three times in the last five minutes. Her error pattern doesn\'t match a clear misconception. This might be a confidence issue rather than a knowledge gap. Routing to you for a check-in."',
    coachExample:
      'The Coach platform\'s observation workflow is built around this principle. When a coach documents a classroom visit, the system captures notes, tags, and action items, but it never generates evaluative conclusions about the teacher. It surfaces patterns across visits and lets the coach decide what they mean. The judgment stays with the human who was in the room.',
  },
  {
    letter: 'E',
    title: 'Evolving Delegation',
    subtitle: 'Trust that deepens and stays reversible',
    color: fc.E2,
    designThinking: 'Iterate',
    description:
      'The relationship between a teacher and an AI tool should change over time. Start with high oversight and low autonomy. As the teacher validates the AI\'s judgment, they can gradually expand its scope. But delegation must always be reversible. A teacher who pulls back control isn\'t failing. They\'re exercising exactly the kind of professional judgment the system should support.',
    keyInsight:
      'Never automate something the teacher still needs practice doing. Delegation should free up time for higher-order work, not erode the skills that make the teacher effective.',
    example:
      'September: the AI suggests differentiated homework and the teacher reviews every recommendation. November: the teacher has approved 90% of suggestions, and the system asks, "Would you like me to assign these automatically and flag only the exceptions?" January: the teacher pulls back to full review for two weeks after a curriculum shift. The system adapts without friction.',
    coachExample:
      'The Coach platform tracks coaching relationships through stages. Early in a coaching cycle, the platform provides more structured prompts and suggested goals. As the coaching relationship matures, the coach has more flexibility to customize plans, skip scaffolding, and rely on their own judgment. The tool supports growth without creating a ceiling.',
  },
  {
    letter: 'R',
    title: 'Reflective Feedback Loops',
    subtitle: 'Learning that flows both ways',
    color: fc.R,
    designThinking: 'Test',
    description:
      'Every interaction between teacher and AI is a learning opportunity in both directions. The system surfaces patterns the teacher might not have seen. The teacher\'s overrides and corrections teach the system what it got wrong. Weekly digests, structured reflection prompts, and annotation moments turn routine use into professional growth.',
    keyInsight:
      'The question shifts from "Did the AI get it right?" to "What did I learn from this interaction?" Every dismissed suggestion, every override, every moment of surprise is data flowing both ways.',
    example:
      '"Students who attempted the optional challenge problem before the quiz scored 23% higher on related questions. 14 of your 28 students attempted it. Would you like to explore making it a recommended warm-up?"',
    coachExample:
      'The Coach platform\'s progress tracking for CT competencies works this way. The system aggregates student progress data across a teacher\'s classes, but the coach interprets the trends during their next conversation. A competency score dropping isn\'t an automated alert that triggers intervention. It\'s a data point the coach brings to a reflective discussion with the teacher about what might be happening and what to try next.',
  },
];

const anchorQuestions = [
  {
    number: '01',
    question: 'What specific professional skill or judgment does this enhance?',
    detail:
      'Be specific. Not "helps teachers" but something you can point to: noticing which students are falling behind before it shows up on a test, differentiating across 30 kids with different needs, or giving timely feedback on writing when there are 150 essays waiting to be graded. If you can\'t name the skill, the feature doesn\'t have a clear reason to exist.',
  },
  {
    number: '02',
    question: 'What\'s the current workaround, and why is it inadequate?',
    detail:
      'Teachers are already solving most of these problems. Sticky notes, spreadsheets, gut instinct built over years. If your AI tool isn\'t meaningfully better than what they\'re already doing, it\'s just a fancier version of the same thing. This question forces you to understand the real workflow before you try to replace it.',
  },
  {
    number: '03',
    question: 'Does using this tool make the teacher more skilled over time, or more dependent?',
    detail:
      'A well-designed AI tool works like a great mentor. It helps you notice things you would have missed, and over time you start seeing those patterns yourself. A poorly designed one does the opposite: it makes decisions for you until you stop developing the judgment to make them on your own. Every feature should pass this test.',
  },
];

const failureModes = [
  {
    mode: 'Steer Without Anchoring',
    description: 'Can result in impressive AI that teachers don\'t adopt. The technology may be sophisticated, but if it doesn\'t address a felt need or fit actual practice, it sits unused.',
    type: 'failure' as const,
  },
  {
    mode: 'Anchor Without Steering',
    description: 'Understands the problem deeply but designs clumsy human-AI interaction. Teachers may trust the intent but struggle to work with the tool efficiently day-to-day.',
    type: 'failure' as const,
  },
  {
    mode: 'Anchor & STEER Together',
    description: 'Grounds every feature in real teacher needs, then designs thoughtful human-AI collaboration across five dimensions. The teacher is amplified — more capable, more informed, more effective — without becoming dependent.',
    type: 'success' as const,
  },
];

const anchorCardFields = [
  { field: 'How Might We...', prompt: 'Frame the teacher\'s need as a "How might we..." question.' },
  { field: 'Teacher Skill Enhanced', prompt: 'What specific professional skill does this feature enhance — not replace?' },
  { field: 'Observed Workaround', prompt: 'How are teachers solving this now? Why is their current approach inadequate?' },
  { field: 'Evidence of Demand', prompt: 'What evidence do we have that teachers actually want this solved?' },
  { field: 'Time & Cognitive Load Reclaimed', prompt: 'What time or mental energy does this free up, and what does the teacher reinvest it in?' },
  { field: 'Capability After Removal', prompt: 'Is the teacher more capable without the tool after having used it? Does the design build skill or dependency?' },
];

const researchConnections = [
  { dimension: 'Design Thinking', color: '#e5a03b', sources: ['Stanford d.school — Empathize, Define, Ideate, Prototype, Test', 'Tim Brown (IDEO) — Human-centered design as innovation method', 'Participatory Design — Users as co-designers, not just informants'] },
  { dimension: 'Anchor', color: fc.anchor, sources: ['TPACK Framework — Technological Pedagogical Content Knowledge', 'Design Thinking: Empathize & Define — Grounding in observed needs'] },
  { dimension: 'S — Shared Mental Model', color: fc.S, sources: ['Endsley\'s Situational Awareness — Shared mental models and team cognition', 'Empathy Maps — Structured tools for understanding perspectives'] },
  { dimension: 'T — Guardrails', color: fc.T, sources: ['Dillenbourg\'s Orchestration — Teacher coordination of complex activity', 'Kapur\'s Productive Failure — When struggle is beneficial'] },
  { dimension: 'E — Escalation & Delegation', color: fc.E1, sources: ['Lee & See on Trust in Automation', 'Shneiderman\'s Human-Centered AI (HCAI)', 'Sheridan & Verplank\'s Levels of Automation'] },
  { dimension: 'R — Reflective Loops', color: fc.R, sources: ['Sch\u00f6n\'s Reflective Practice', 'LATUX Workflow — Learning analytics with teacher validation'] },
];

const useCases = [
  { title: 'As an audit lens', description: 'Does your existing product have each of these layers? Where are the gaps?' },
  { title: 'As a design checklist', description: 'For new features, start with the Anchor Card. If it passes, use STEER to shape interaction design.' },
  { title: 'As a maturity model', description: 'Where is your product on the delegation spectrum? Are your escalation pathways well-designed or ad hoc?' },
  { title: 'As a critique shorthand', description: '"Have we anchored this?" becomes a way of asking whether a feature is grounded in real teacher value.' },
  { title: 'As a procurement framework', description: 'Schools evaluating AI tools can use Anchor & STEER to ask the right questions of vendors.' },
  { title: 'As a research scaffold', description: 'Map user research interviews to each dimension separately for structured insight gathering.' },
];

export default function AnchorAndSteerPage() {
  const [expandedDimension, setExpandedDimension] = useState<number | null>(null);
  const containerRef = useScrollReveal();

  return (
    <main ref={containerRef} className="min-h-screen bg-canvas pt-16">
      {/* Hero */}
      <section className="pt-10 pb-8 px-6 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <hr className="heading-rule" />
          <p className="reveal text-sm uppercase tracking-widest text-terra mb-4 font-mono">
            A Human-Centered Design Framework for AI in Education
          </p>
          <h1 className="reveal text-display-section font-display font-extrabold text-text-heading mb-6 stagger-1">
            Anchor &amp; STEER
          </h1>
          <p className="reveal text-lg text-text-secondary max-w-2xl leading-relaxed mb-4 stagger-2">
            AI in education should extend a teacher&apos;s reach, judgment, and pedagogical intent — never bypass it.
          </p>
          <p className="reveal text-sm text-text-muted stagger-3">
            By Joe Alexander Mel&eacute;ndez-Naharro
          </p>
          <p className="reveal text-sm text-text-muted/70 mt-1 stagger-3">
            Developed from experience leading CS education programs, coaching teachers, and building AI-powered tools for K-12 classrooms.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-6">
            The Problem
          </h2>
          <div className="reveal space-y-4 text-text-secondary leading-relaxed stagger-1">
            <p>
              Most AI education tools start with the wrong question: <em>&ldquo;What can AI do?&rdquo;</em> instead of <em>&ldquo;Where are teachers actually struggling, and what would genuinely help?&rdquo;</em>
            </p>
            <p>
              I&apos;ve watched this play out firsthand. Tools that demo beautifully but collect dust in real classrooms. Tools that automate the wrong things. Tools that make decisions about students without the teacher understanding why, or worse, without the teacher even knowing.
            </p>
            <p>
              The problem isn&apos;t the technology. It&apos;s the starting point. When you begin with the AI&apos;s capabilities instead of the teacher&apos;s reality, you build impressive software that nobody trusts enough to use.
            </p>
            <p>
              Anchor &amp; STEER is the alternative I developed. A design framework rooted in design thinking that starts where human-centered design starts: with empathy. Observe teachers. Understand their real constraints. Define the problem from their perspective. <em>Then</em> build.
            </p>
          </div>
        </div>
      </section>

      {/* Rooted in Design Thinking */}
      <section className="py-16 px-4 bg-canvas-deep">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-3 text-center">
            Rooted in Design Thinking
          </h2>
          <p className="reveal text-text-muted text-center mb-10 max-w-2xl mx-auto stagger-1">
            Each layer of the framework maps to a design thinking mindset — grounding AI-teacher collaboration in human-centered principles.
          </p>

          <div className="reveal grid md:grid-cols-2 gap-6 stagger-2">
            {/* Anchor = Empathize + Define */}
            <div className="bg-canvas-elevated border border-canvas-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-text-heading font-bold text-sm" style={{ background: fc.anchor }}>A</div>
                <div>
                  <h3 className="font-display font-semibold text-text-heading">ANCHOR = Empathize + Define</h3>
                  <p className="text-xs text-text-muted">Before you build, understand</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-terra text-sm font-semibold shrink-0">Empathize</span>
                  <p className="text-sm text-text-muted">Shadow teachers. Observe their workarounds. Understand what 150 essays on a Sunday night actually feels like.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-terra text-sm font-semibold shrink-0">Define</span>
                  <p className="text-sm text-text-muted">Frame the problem from the teacher&apos;s perspective. &ldquo;How might we help teachers give timely, personalized writing feedback without sacrificing their weekends?&rdquo;</p>
                </div>
              </div>
            </div>

            {/* STEER = Ideate + Prototype + Test */}
            <div className="bg-canvas-elevated border border-canvas-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {['S','T','E','E','R'].map((l, i) => (
                    <div key={i} className="w-6 h-6 rounded flex items-center justify-center text-text-heading font-bold text-xs" style={{ background: [fc.S, fc.T, fc.E1, fc.E2, fc.R][i] }}>{l}</div>
                  ))}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-text-heading">STEER = Ideate + Prototype + Test</h3>
                  <p className="text-xs text-text-muted">Design the collaboration, then keep learning</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-terra text-sm font-semibold shrink-0">Ideate</span>
                  <p className="text-sm text-text-muted">Explore how the AI and teacher might share mental models, set guardrails, and handle moments the AI should step back.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-terra text-sm font-semibold shrink-0">Prototype</span>
                  <p className="text-sm text-text-muted">Design escalation pathways and delegation arcs. Test them with real teachers before scaling.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-terra text-sm font-semibold shrink-0">Test</span>
                  <p className="text-sm text-text-muted">Build reflective feedback loops so every interaction teaches the system and the teacher. Iterate continuously.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key insight */}
          <div className="reveal mt-8 bg-canvas-elevated border border-canvas-border rounded-lg p-5 text-center stagger-3">
            <p className="text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed">
              <strong className="text-terra">The key difference:</strong> Design thinking typically empathizes with <em>end users</em>. Anchor &amp; STEER asks you to empathize with <em>teachers</em> — because in AI EdTech, the teacher should be understood as the designer of the learning experience, not treated as a passive intermediary.
            </p>
          </div>
        </div>
      </section>

      {/* Common Failure Modes */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-8 text-center">
            Common Failure Modes
          </h2>
          <div className="reveal grid md:grid-cols-3 gap-4 stagger-1">
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
                    {fm.type === 'success' ? '\u2713' : '\u2717'}
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
            Framework Structure
          </h2>

          {/* STEER Pillars */}
          <div className="reveal grid grid-cols-5 gap-2 md:gap-3 mb-3 stagger-1">
            {dimensions.map((d, i) => (
              <div
                key={i}
                className="rounded-t-lg p-3 md:p-4 text-center"
                style={{ background: `${d.color}15`, borderTop: `3px solid ${d.color}` }}
              >
                <span className="text-2xl md:text-3xl font-bold" style={{ color: d.color }}>{d.letter}</span>
                <p className="text-xs text-text-muted mt-1 hidden md:block leading-tight">{d.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center text-xs text-text-muted uppercase tracking-widest mb-4 font-mono">Design Layer</div>

          {/* Anchor Foundation */}
          <div className="reveal rounded-lg p-6 text-center stagger-2" style={{ background: `${fc.anchor}20`, border: `1px solid ${fc.anchor}40` }}>
            <p className="text-sm uppercase tracking-widest mb-2 font-mono" style={{ color: fc.anchorMid }}>Anchor — Foundation Layer</p>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Ground every AI feature in real teacher needs. Does it enhance a professional skill? Does it solve a felt problem? Does it build capability, not dependency?
            </p>
          </div>
        </div>
      </section>

      {/* ANCHOR: Ground Before You Build */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-3xl mx-auto">
          <div className="reveal flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-text-heading font-bold" style={{ background: fc.anchor }}>A</div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-heading">ANCHOR: Ground Before You Build</h2>
          </div>
          <p className="reveal text-text-muted mb-8 stagger-1">
            Before applying STEER, every AI feature must pass a threshold test. Think of it in nautical terms — a ship that only steers drifts without purpose. You anchor to understand your position, then steer with intention.
          </p>

          <h3 className="reveal text-xl font-display font-semibold text-text-heading mb-6 stagger-2">The Three Anchor Questions</h3>
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

          {/* Critical Distinction */}
          <div className="reveal mt-8 bg-canvas-elevated border border-canvas-border rounded-lg p-6">
            <h4 className="font-display font-semibold text-terra mb-3">The Critical Distinction</h4>
            <p className="text-sm text-text-secondary mb-2">
              An AI that says <em>&ldquo;Student X is struggling with fractions&rdquo;</em> <strong className="text-red-400">replaces</strong> teacher judgment. It hands the teacher a conclusion.
            </p>
            <p className="text-sm text-text-secondary">
              An AI that says <em>&ldquo;Student X keeps treating numerators and denominators as separate numbers. Here&apos;s a diagnostic task that could confirm whether it&apos;s a conceptual gap or a notation habit&rdquo;</em> <strong className="text-emerald-400">sharpens</strong> it. The teacher still makes the call.
            </p>
          </div>
        </div>
      </section>

      {/* STEER Dimensions */}
      <section className="py-16 px-4 bg-canvas-deep">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-3 text-center">
            STEER: Five Dimensions of Teacher-AI Collaboration
          </h2>
          <p className="reveal text-text-muted text-center mb-10 stagger-1">
            Once value is anchored, design the interaction. Each dimension shapes a different facet of how the AI and teacher work together.
          </p>

          <div className="space-y-3">
            {dimensions.map((d, i) => (
              <div key={i} className={`reveal rounded-lg overflow-hidden border border-canvas-border stagger-${(i % 3) + 1}`}>
                <button
                  onClick={() => setExpandedDimension(expandedDimension === i ? null : i)}
                  className="w-full p-5 flex items-center gap-4 text-left hover:bg-canvas-elevated/50 transition-colors"
                  style={{ borderLeft: `4px solid ${d.color}` }}
                >
                  <span className="text-3xl font-bold shrink-0" style={{ color: d.color }}>{d.letter}</span>
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
                  <div className="px-5 pb-5 space-y-4 bg-canvas-elevated/30" style={{ borderLeft: `4px solid ${d.color}` }}>
                    <p className="text-text-secondary text-sm leading-relaxed">{d.description}</p>
                    <p className="text-text-muted text-sm italic border-l-2 border-canvas-border pl-3">{d.keyInsight}</p>
                    <div className="rounded-lg p-4 bg-canvas-elevated/60 border border-canvas-border">
                      <p className="text-xs uppercase tracking-wider mb-2 font-mono" style={{ color: d.color }}>Example</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{d.example}</p>
                    </div>
                    {d.coachExample && (
                      <div className="rounded-lg p-4 border border-terra/20 bg-terra/5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs uppercase tracking-wider font-mono text-terra">See It in Practice</span>
                          <span className="text-xs text-text-muted">— Coach Platform</span>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">{d.coachExample}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Continuous Cycle */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-4">
            The Continuous Cycle
          </h2>
          <p className="reveal text-text-muted mb-10 stagger-1">
            The framework isn&apos;t linear — it&apos;s cyclical. You anchor before a new feature. You re-anchor when user research reveals you&apos;ve drifted from real needs.
          </p>

          {/* Cycle Diagram */}
          <div className="reveal flex items-center justify-center gap-4 md:gap-8 mb-10 stagger-2">
            <div className="rounded-lg p-4 md:p-6 text-center bg-canvas-elevated border border-canvas-border" style={{ borderTop: `3px solid ${fc.anchorMid}` }}>
              <p className="font-display font-bold text-text-heading text-sm md:text-base">ANCHOR</p>
              <p className="text-xs text-text-muted mt-1">Identify real needs</p>
            </div>
            <svg className="w-6 h-6 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="rounded-lg p-4 md:p-6 text-center bg-canvas-elevated border border-canvas-border" style={{ borderTop: `3px solid ${fc.S}` }}>
              <p className="font-display font-bold text-text-heading text-sm md:text-base">STEER</p>
              <p className="text-xs text-text-muted mt-1">Design &amp; build</p>
            </div>
            <svg className="w-6 h-6 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="rounded-lg p-4 md:p-6 text-center bg-canvas-elevated border border-canvas-border" style={{ borderTop: `3px solid ${fc.R}` }}>
              <p className="font-display font-bold text-text-heading text-sm md:text-base">RE-ANCHOR</p>
              <p className="text-xs text-text-muted mt-1">Validate &amp; refine</p>
            </div>
          </div>

          <p className="reveal text-text-muted text-sm italic max-w-xl mx-auto stagger-3">
            Resist the urge to STEER before you&apos;ve anchored. This may be the most important discipline the framework asks of product teams — because it can be tempting to skip straight to &ldquo;look what the AI can do&rdquo; without first grounding in &ldquo;but should it.&rdquo;
          </p>
        </div>
      </section>

      {/* Design Implications */}
      <section className="py-16 px-4 bg-canvas-deep">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-8">
            Design Implications
          </h2>
          <div className="reveal grid md:grid-cols-2 gap-4 stagger-1">
            {[
              { title: 'On Transparency', text: 'The interface shouldn\'t bury the AI\'s logic. One of the fastest ways to lose teacher trust is a black box. Teachers should be able to understand why in under 10 seconds.' },
              { title: 'On Defaults', text: 'Defaults are pedagogical choices. If the AI defaults to giving hints quickly, that embodies a philosophy. Defaults must be intentional, documented, and overridable.' },
              { title: 'On Equity', text: 'Teacher-in-the-loop means the AI doesn\'t silently create different learning experiences for different students without the teacher knowing. Differential treatment should always be visible and endorsed.' },
              { title: 'On Time', text: 'One of the biggest constraints teachers face. If oversight burden is too high, teachers may end up rubber-stamping everything or disengaging — both of which defeat the purpose.' },
            ].map((item, i) => (
              <div key={i} className="bg-canvas-elevated border border-canvas-border rounded-lg p-5">
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
            The Anchor Card
          </h2>
          <p className="reveal text-text-muted mb-8 stagger-1">A feature validation template. Fill this in before writing a single line of code.</p>

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
            Research Connections
          </h2>
          <div className="reveal grid md:grid-cols-2 gap-4 stagger-1">
            {researchConnections.map((rc, i) => (
              <div key={i} className="bg-canvas-elevated border border-canvas-border rounded-lg p-4" style={{ borderLeft: `3px solid ${rc.color}` }}>
                <p className="text-sm font-display font-semibold mb-2" style={{ color: rc.color }}>{rc.dimension}</p>
                <ul className="space-y-1">
                  {rc.sources.map((s, j) => (
                    <li key={j} className="text-xs text-text-muted leading-relaxed">{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use This Framework */}
      <section className="py-16 px-4 bg-canvas">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-text-heading mb-8">
            How to Use This Framework
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
            This framework is shared for the benefit of the education community.<br />
            If you use or adapt it, please attribute accordingly.
          </p>
          <p className="text-text-muted mt-4 font-display font-medium">
            Anchor &amp; STEER — By Joe Alexander Mel&eacute;ndez-Naharro
          </p>
        </div>
      </section>
    </main>
  );
}
