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
      'The AI and teacher need to operate from a common understanding of what\'s happening in the classroom. The AI surfaces its reasoning and confidence levels transparently, and teachers can inspect, question, and correct the AI\'s understanding of student states.',
    keyInsight:
      'Mutual empathy made structural. The teacher reads the AI\'s confidence; the AI is designed around the teacher\'s context. Reasoning should be pedagogically educative, not just legible.',
    example:
      '"I recommended this problem set because 7 students struggled with fraction comparison on Tuesday\'s quiz. My confidence is moderate — three of those students may have been affected by the timed format rather than conceptual misunderstanding."',
  },
  {
    letter: 'T',
    title: 'Teacher-Set Guardrails',
    subtitle: 'The policy layer teachers author themselves',
    color: fc.T,
    designThinking: 'Define',
    description:
      'Teachers define the boundaries within which the AI operates autonomously. This includes scope controls (what can the AI do without asking?), pedagogical preferences (when should the AI intervene?), and content boundaries (what materials can the AI draw from?).',
    keyInsight:
      'Constraints fuel creativity. The teacher\'s pedagogical constraints become the AI\'s operating parameters — and articulating them is itself professional development.',
    example:
      'A teacher who values productive struggle configures: "Wait at least 3 attempts before offering scaffolding. Never give direct answers — always use guiding questions. Allow students to select their own problem difficulty."',
  },
  {
    letter: 'E',
    title: 'Escalation Pathways',
    subtitle: 'Knowing when to hand off, not just hand over',
    color: fc.E1,
    designThinking: 'Prototype',
    description:
      'Not everything should be automated. The framework needs clearly designed moments where the AI hands off to the teacher: uncertainty escalation, emotional and social escalation, and pedagogical judgment calls.',
    keyInsight:
      'Escalation pathways must be tested and refined through real use. The design question is friction: lightweight enough that it actually happens, visible enough that teachers feel informed.',
    example:
      '"Flagging: Maria has submitted and deleted her response three times in the last 5 minutes. Her error pattern doesn\'t match a clear misconception — this might be a confidence issue rather than a knowledge gap. Routing to you for a check-in."',
  },
  {
    letter: 'E',
    title: 'Evolving Delegation',
    subtitle: 'Trust that deepens — and stays reversible',
    color: fc.E2,
    designThinking: 'Iterate',
    description:
      'Trust between teacher and AI should deepen over time. Start with high oversight and low autonomy. As the teacher validates the AI\'s judgment, they can gradually expand its scope. Critically, delegation must be reversible.',
    keyInsight:
      'You never "finish" designing the human-AI relationship. Delegate only tasks where the teacher genuinely doesn\'t need the practice — never outsource what builds professional skill.',
    example:
      'September: AI suggests differentiated homework, teacher reviews each recommendation. November: Teacher has approved 90% — system asks, "Would you like me to assign these automatically and flag only exceptions?" January: Teacher pulls back to review mode for two weeks.',
  },
  {
    letter: 'R',
    title: 'Reflective Feedback Loops',
    subtitle: 'Learning that flows both ways',
    color: fc.R,
    designThinking: 'Test',
    description:
      'The system generates opportunities for the teacher to reflect on and learn from the AI\'s data — and vice versa. Weekly digests surface patterns. Every teacher override is training signal. Structured moments invite annotation.',
    keyInsight:
      'Every override, every dismissed suggestion, every moment of surprise is data flowing both ways. The question shifts from "did the AI get it right" to "what did I learn from this interaction."',
    example:
      '"Weekly insight: Students who attempted the optional challenge problem before the quiz scored 23% higher on related questions. 14 of your 28 students attempted it. Would you like to explore making it a recommended warm-up?"',
  },
];

const anchorQuestions = [
  {
    number: '01',
    question: 'What specific professional skill or judgment does this enhance?',
    detail:
      'Not "helps teachers" generically, but something concrete — like noticing which students are falling behind before it shows up on a test, differentiating instruction across 30 kids with different needs, or giving timely feedback on writing when you have 150 essays to grade.',
  },
  {
    number: '02',
    question: 'What\'s the current workaround, and why is it inadequate?',
    detail:
      'If a teacher is already solving this problem with sticky notes and intuition, the AI tool needs to be meaningfully better — not just fancier. This question forces you to understand the real workflow rather than inventing a new one.',
  },
  {
    number: '03',
    question: 'Does using this tool make the teacher more skilled over time, or more dependent?',
    detail:
      'A well-designed AI tool should be like a great teaching coach — it helps you see things you wouldn\'t have seen, and over time you internalize some of those patterns. A poorly designed one creates learned helplessness.',
  },
];

const failureModes = [
  {
    mode: 'Steer Without Anchoring',
    description: 'Builds impressive AI that teachers don\'t use. The technology is sophisticated, but it doesn\'t solve a real problem or it solves it in a way that doesn\'t fit actual practice.',
    type: 'failure' as const,
  },
  {
    mode: 'Anchor Without Steering',
    description: 'Understands the problem deeply but designs clumsy human-AI interaction. Teachers trust the intent but can\'t work with the tool efficiently day-to-day.',
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
    <main ref={containerRef} className="min-h-screen bg-zinc-900 pt-16">
      {/* Draft Banner */}
      <div className="bg-zinc-800/60 border-b border-zinc-700">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-3">
          <span className="text-xs font-mono font-medium text-orange-400 uppercase tracking-wider">Draft</span>
          <span className="text-zinc-500 text-sm">This page is a work in progress and not yet published.</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-zinc-900 to-zinc-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(44, 95, 138, 0.5), transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(123, 94, 167, 0.4), transparent)' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="reveal text-sm uppercase tracking-widest text-blue-400 mb-4 font-mono">
            A Human-Centered Design Framework for AI in Education
          </p>
          <h1 className="reveal text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 stagger-1">
            <span className="text-blue-400">/</span> Anchor <span className="text-zinc-500">&amp;</span> STEER
          </h1>
          <p className="reveal text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-4 stagger-2">
            AI in education should extend a teacher&apos;s reach, judgment, and pedagogical intent — never bypass it.
          </p>
          <p className="reveal text-sm text-zinc-500 stagger-3">
            By Joe Alexander Mel&eacute;ndez-Naharro
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-white mb-6">
            The Problem
          </h2>
          <div className="reveal space-y-4 text-zinc-300 leading-relaxed stagger-1">
            <p>
              Too much AI-powered education technology begins with &ldquo;what can AI do?&rdquo; rather than &ldquo;what do teachers actually need to be better at, and where are they bottlenecked?&rdquo;
            </p>
            <p>
              The result is a landscape of impressive technical demos that teachers don&apos;t use — tools that automate the wrong things, create dependency instead of capability, and treat educators as passive recipients of algorithmic decisions about their students.
            </p>
            <p>
              The Anchor &amp; STEER framework offers a different approach — one rooted in design thinking. It begins where human-centered design begins: with empathy. Observe teachers. Understand their real constraints. Define the problem from their perspective. Only then do you ideate, prototype, and test AI features — with the teacher always in the loop, always in control, and always growing more skilled through the interaction.
            </p>
          </div>
        </div>
      </section>

      {/* Rooted in Design Thinking */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-white mb-3 text-center">
            Rooted in Design Thinking
          </h2>
          <p className="reveal text-zinc-400 text-center mb-10 max-w-2xl mx-auto stagger-1">
            Each layer of the framework maps to a design thinking mindset — grounding AI-teacher collaboration in human-centered principles.
          </p>

          <div className="reveal grid md:grid-cols-2 gap-6 stagger-2">
            {/* Anchor = Empathize + Define */}
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: fc.anchor }}>A</div>
                <div>
                  <h3 className="font-display font-semibold text-white">ANCHOR = Empathize + Define</h3>
                  <p className="text-xs text-zinc-500">Before you build, understand</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 text-sm font-semibold shrink-0">Empathize</span>
                  <p className="text-sm text-zinc-400">Shadow teachers. Observe their workarounds. Understand what 150 essays on a Sunday night actually feels like.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 text-sm font-semibold shrink-0">Define</span>
                  <p className="text-sm text-zinc-400">Frame the problem from the teacher&apos;s perspective. &ldquo;How might we help teachers give timely, personalized writing feedback without sacrificing their weekends?&rdquo;</p>
                </div>
              </div>
            </div>

            {/* STEER = Ideate + Prototype + Test */}
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {['S','T','E','E','R'].map((l, i) => (
                    <div key={i} className="w-6 h-6 rounded flex items-center justify-center text-white font-bold text-xs" style={{ background: [fc.S, fc.T, fc.E1, fc.E2, fc.R][i] }}>{l}</div>
                  ))}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white">STEER = Ideate + Prototype + Test</h3>
                  <p className="text-xs text-zinc-500">Design the collaboration, then keep learning</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 text-sm font-semibold shrink-0">Ideate</span>
                  <p className="text-sm text-zinc-400">Explore how the AI and teacher might share mental models, set guardrails, and handle moments the AI should step back.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 text-sm font-semibold shrink-0">Prototype</span>
                  <p className="text-sm text-zinc-400">Design escalation pathways and delegation arcs. Test them with real teachers before scaling.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 text-sm font-semibold shrink-0">Test</span>
                  <p className="text-sm text-zinc-400">Build reflective feedback loops so every interaction teaches the system and the teacher. Iterate continuously.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key insight */}
          <div className="reveal mt-8 bg-zinc-800 border border-zinc-700 rounded-lg p-5 text-center stagger-3">
            <p className="text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              <strong className="text-orange-400">The key difference:</strong> Design thinking typically empathizes with <em>end users</em>. Anchor &amp; STEER insists you empathize with <em>teachers</em> — because in AI EdTech, the teacher is the designer of the learning experience, not a passive intermediary.
            </p>
          </div>
        </div>
      </section>

      {/* Common Failure Modes */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-white mb-8 text-center">
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
                <p className="text-sm text-zinc-400 leading-relaxed">{fm.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Structure Diagram */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-white mb-10 text-center">
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
                <p className="text-xs text-zinc-500 mt-1 hidden md:block leading-tight">{d.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center text-xs text-zinc-500 uppercase tracking-widest mb-4 font-mono">Design Layer</div>

          {/* Anchor Foundation */}
          <div className="reveal rounded-lg p-6 text-center stagger-2" style={{ background: `${fc.anchor}20`, border: `1px solid ${fc.anchor}40` }}>
            <p className="text-sm uppercase tracking-widest mb-2 font-mono" style={{ color: fc.anchorMid }}>Anchor — Foundation Layer</p>
            <p className="text-zinc-300 text-sm max-w-lg mx-auto">
              Ground every AI feature in real teacher needs. Does it enhance a professional skill? Does it solve a felt problem? Does it build capability, not dependency?
            </p>
          </div>
        </div>
      </section>

      {/* ANCHOR: Ground Before You Build */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-3xl mx-auto">
          <div className="reveal flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ background: fc.anchor }}>A</div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">ANCHOR: Ground Before You Build</h2>
          </div>
          <p className="reveal text-zinc-400 mb-8 stagger-1">
            Before applying STEER, every AI feature must pass a threshold test. Think of it in nautical terms — a ship that only steers drifts without purpose. You anchor to understand your position, then steer with intention.
          </p>

          <h3 className="reveal text-xl font-display font-semibold text-white mb-6 stagger-2">The Three Anchor Questions</h3>
          <div className="space-y-4">
            {anchorQuestions.map((q, i) => (
              <div key={q.number} className={`reveal rounded-lg p-5 stagger-${i + 2}`} style={{ background: `${fc.anchor}10`, borderLeft: `3px solid ${fc.anchorMid}` }}>
                <div className="flex items-start gap-3">
                  <span className="text-lg font-bold font-mono" style={{ color: fc.anchorMid }}>{q.number}</span>
                  <div>
                    <p className="font-medium text-white mb-2">{q.question}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{q.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Critical Distinction */}
          <div className="reveal mt-8 bg-zinc-800 border border-zinc-700 rounded-lg p-6">
            <h4 className="font-display font-semibold text-orange-400 mb-3">The Critical Distinction</h4>
            <p className="text-sm text-zinc-300 mb-2">
              An AI that says <em>&ldquo;Student X is struggling with fractions&rdquo;</em> <strong className="text-red-400">replaces</strong> teacher judgment.
            </p>
            <p className="text-sm text-zinc-300">
              An AI that says <em>&ldquo;Here&apos;s the pattern in Student X&apos;s errors — they&apos;re consistently treating the numerator and denominator as independent numbers. Here&apos;s a diagnostic task you could try&rdquo;</em> <strong className="text-emerald-400">sharpens</strong> it.
            </p>
          </div>
        </div>
      </section>

      {/* STEER Dimensions */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-white mb-3 text-center">
            STEER: Five Dimensions of Teacher-AI Collaboration
          </h2>
          <p className="reveal text-zinc-400 text-center mb-10 stagger-1">
            Once value is anchored, design the interaction. Each dimension shapes a different facet of how the AI and teacher work together.
          </p>

          <div className="space-y-3">
            {dimensions.map((d, i) => (
              <div key={i} className={`reveal rounded-lg overflow-hidden border border-zinc-700 stagger-${(i % 3) + 1}`}>
                <button
                  onClick={() => setExpandedDimension(expandedDimension === i ? null : i)}
                  className="w-full p-5 flex items-center gap-4 text-left hover:bg-zinc-800/50 transition-colors"
                  style={{ borderLeft: `4px solid ${d.color}` }}
                >
                  <span className="text-3xl font-bold shrink-0" style={{ color: d.color }}>{d.letter}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-white">{d.title}</h3>
                    <p className="text-sm text-zinc-500">{d.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{d.designThinking}</span>
                    <svg
                      className={`w-4 h-4 text-zinc-500 transition-transform ${expandedDimension === i ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {expandedDimension === i && (
                  <div className="px-5 pb-5 space-y-4 bg-zinc-800/30" style={{ borderLeft: `4px solid ${d.color}` }}>
                    <p className="text-zinc-300 text-sm leading-relaxed">{d.description}</p>
                    <p className="text-zinc-400 text-sm italic border-l-2 border-zinc-600 pl-3">{d.keyInsight}</p>
                    <div className="rounded-lg p-4 bg-zinc-800/60 border border-zinc-700">
                      <p className="text-xs uppercase tracking-wider mb-2 font-mono" style={{ color: d.color }}>In Practice</p>
                      <p className="text-sm text-zinc-300 leading-relaxed">{d.example}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Continuous Cycle */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-white mb-4">
            The Continuous Cycle
          </h2>
          <p className="reveal text-zinc-400 mb-10 stagger-1">
            The framework isn&apos;t linear — it&apos;s cyclical. You anchor before a new feature. You re-anchor when user research reveals you&apos;ve drifted from real needs.
          </p>

          {/* Cycle Diagram */}
          <div className="reveal flex items-center justify-center gap-4 md:gap-8 mb-10 stagger-2">
            <div className="rounded-lg p-4 md:p-6 text-center bg-zinc-800 border border-zinc-700" style={{ borderTop: `3px solid ${fc.anchorMid}` }}>
              <p className="font-display font-bold text-white text-sm md:text-base">ANCHOR</p>
              <p className="text-xs text-zinc-500 mt-1">Identify real needs</p>
            </div>
            <svg className="w-6 h-6 text-zinc-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="rounded-lg p-4 md:p-6 text-center bg-zinc-800 border border-zinc-700" style={{ borderTop: `3px solid ${fc.S}` }}>
              <p className="font-display font-bold text-white text-sm md:text-base">STEER</p>
              <p className="text-xs text-zinc-500 mt-1">Design &amp; build</p>
            </div>
            <svg className="w-6 h-6 text-zinc-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="rounded-lg p-4 md:p-6 text-center bg-zinc-800 border border-zinc-700" style={{ borderTop: `3px solid ${fc.R}` }}>
              <p className="font-display font-bold text-white text-sm md:text-base">RE-ANCHOR</p>
              <p className="text-xs text-zinc-500 mt-1">Validate &amp; refine</p>
            </div>
          </div>

          <p className="reveal text-zinc-500 text-sm italic max-w-xl mx-auto stagger-3">
            Resist the urge to STEER before you&apos;ve anchored. That&apos;s the message the edtech industry needs most — because so much AI-powered product development skips straight to &ldquo;look what the AI can do&rdquo; without ever grounding in &ldquo;but should it.&rdquo;
          </p>
        </div>
      </section>

      {/* Design Implications */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-white mb-8">
            Design Implications
          </h2>
          <div className="reveal grid md:grid-cols-2 gap-4 stagger-1">
            {[
              { title: 'On Transparency', text: 'The interface shouldn\'t bury the AI\'s logic. The biggest trust-killer in edtech is a black box. Teachers should understand why in under 10 seconds.' },
              { title: 'On Defaults', text: 'Defaults are pedagogical choices. If the AI defaults to giving hints quickly, that embodies a philosophy. Defaults must be intentional, documented, and overridable.' },
              { title: 'On Equity', text: 'Teacher-in-the-loop means the AI doesn\'t silently create different learning experiences for different students without the teacher knowing. Differential treatment should always be visible and endorsed.' },
              { title: 'On Time', text: 'The biggest constraint teachers face. If oversight burden is too high, teachers will either rubber-stamp everything or disengage — both defeat the purpose.' },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-800 border border-zinc-700 rounded-lg p-5">
                <h3 className="font-display font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Anchor Card */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-white mb-3">
            The Anchor Card
          </h2>
          <p className="reveal text-zinc-400 mb-8 stagger-1">A feature validation template. Fill this in before writing a single line of code.</p>

          <div className="reveal rounded-lg p-6 space-y-4 bg-zinc-800/50 border-2 border-dashed border-zinc-600 stagger-2">
            {anchorCardFields.map((f, i) => (
              <div key={i}>
                <label className="text-sm font-mono font-medium text-blue-400">{f.field}</label>
                <div className="mt-1 rounded-lg px-4 py-3 text-sm text-zinc-500 italic bg-zinc-900/50 border border-zinc-700" style={{ minHeight: '44px' }}>
                  {f.prompt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Connections */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-white mb-8">
            Research Connections
          </h2>
          <div className="reveal grid md:grid-cols-2 gap-4 stagger-1">
            {researchConnections.map((rc, i) => (
              <div key={i} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4" style={{ borderLeft: `3px solid ${rc.color}` }}>
                <p className="text-sm font-display font-semibold mb-2" style={{ color: rc.color }}>{rc.dimension}</p>
                <ul className="space-y-1">
                  {rc.sources.map((s, j) => (
                    <li key={j} className="text-xs text-zinc-400 leading-relaxed">{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use This Framework */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-display font-bold text-white mb-8">
            How to Use This Framework
          </h2>
          <div className="reveal grid md:grid-cols-2 gap-4 stagger-1">
            {useCases.map((uc, i) => (
              <div key={i} className="bg-zinc-800 border border-zinc-700 rounded-lg p-5">
                <h3 className="font-display font-semibold text-white mb-2">{uc.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Attribution */}
      <section className="py-12 px-4 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            This framework is shared for the benefit of the education community.<br />
            If you use or adapt it, please attribute accordingly.
          </p>
          <p className="text-zinc-400 mt-4 font-display font-medium">
            Anchor &amp; STEER — By Joe Alexander Mel&eacute;ndez-Naharro
          </p>
        </div>
      </section>
    </main>
  );
}
