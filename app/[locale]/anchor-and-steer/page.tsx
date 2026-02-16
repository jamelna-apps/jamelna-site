// app/[locale]/anchor-and-steer/page.tsx
'use client';

import React, { useState } from 'react';

// STEER dimension colors (from the framework's design notes)
const colors = {
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
    color: colors.S,
    designThinking: 'Empathize — See through each other\'s lens',
    description:
      'The AI and teacher need to operate from a common understanding of what\'s happening in the classroom. The AI surfaces its reasoning and confidence levels transparently, and teachers can inspect, question, and correct the AI\'s understanding of student states.',
    keyInsight:
      'In design thinking terms, this is mutual empathy made structural. The teacher empathizes with the AI\'s perspective (its confidence, its reasoning) and the AI is designed to empathize with the teacher\'s context (their classroom, their students, their constraints). When anchored in practice, the AI\'s reasoning should be pedagogically educative for the teacher, not just legible.',
    example:
      '"I recommended this problem set because 7 students struggled with fraction comparison on Tuesday\'s quiz. My confidence is moderate — three of those students may have been affected by the timed format rather than conceptual misunderstanding."',
  },
  {
    letter: 'T',
    title: 'Teacher-Set Guardrails',
    subtitle: 'The policy layer teachers author themselves',
    color: colors.T,
    designThinking: 'Define — Articulate constraints as design values',
    description:
      'Teachers define the boundaries within which the AI operates autonomously. This includes scope controls (what can the AI do without asking?), pedagogical preferences (when should the AI intervene?), and content boundaries (what materials can the AI draw from?).',
    keyInsight:
      'In design thinking, constraints fuel creativity. Here, the teacher\'s pedagogical constraints become the AI\'s operating parameters. Configuring the AI becomes an exercise in professional reflection — articulating your pedagogical philosophy is itself valuable professional development.',
    example:
      'A teacher who values productive struggle configures: "Wait at least 3 attempts before offering scaffolding. Never give direct answers — always use guiding questions. Allow students to select their own problem difficulty."',
  },
  {
    letter: 'E',
    title: 'Escalation Pathways',
    subtitle: 'Knowing when to hand off, not just hand over',
    color: colors.E1,
    designThinking: 'Prototype — Design the handoff, not just the handout',
    description:
      'Not everything should be automated. The framework needs clearly designed moments where the AI hands off to the teacher: uncertainty escalation, emotional and social escalation, and pedagogical judgment calls.',
    keyInsight:
      'Like prototyping in design thinking, escalation pathways must be tested and refined through real use. The critical design question is about friction — making escalation lightweight enough that it actually happens, but visible enough that teachers feel informed. These are designed seams, not failures.',
    example:
      '"Flagging: Maria has submitted and deleted her response three times in the last 5 minutes. Her error pattern doesn\'t match a clear misconception — this might be a confidence issue rather than a knowledge gap. Routing to you for a check-in."',
  },
  {
    letter: 'E',
    title: 'Evolving Delegation',
    subtitle: 'Trust that deepens — and stays reversible',
    color: colors.E2,
    designThinking: 'Iterate — Trust as a design material',
    description:
      'Trust between teacher and AI should deepen over time. Start with high oversight and low autonomy. As the teacher validates the AI\'s judgment, they can gradually expand its scope. Critically, delegation must be reversible.',
    keyInsight:
      'Design thinking is iterative by nature — you ship, observe, adjust, repeat. Evolving delegation applies this same principle to trust. You never "finish" designing the human-AI relationship; you only delegate tasks where the teacher genuinely doesn\'t need the practice — not outsourcing the very activities that build professional skill.',
    example:
      'September: AI suggests differentiated homework, teacher reviews each recommendation. November: Teacher has approved 90% — system asks, "Would you like me to assign these automatically and flag only exceptions?" January: Teacher pulls back to review mode for two weeks.',
  },
  {
    letter: 'R',
    title: 'Reflective Feedback Loops',
    subtitle: 'Learning that flows both ways',
    color: colors.R,
    designThinking: 'Test — Every interaction is a learning signal',
    description:
      'The system generates opportunities for the teacher to reflect on and learn from the AI\'s data — and vice versa. Weekly digests surface patterns. Every teacher override is training signal. Structured moments invite annotation.',
    keyInsight:
      'In design thinking, testing isn\'t a final gate — it\'s a continuous practice. Every teacher override, every dismissed suggestion, every moment of surprise is data that flows both ways. When anchored, these loops shift from "did the AI get it right" to "what did I learn about my students and my practice from this interaction."',
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
    description: 'Grounds every feature in real teacher needs, then designs thoughtful human-AI collaboration across five dimensions. The teacher is amplified — more capable, more informed, more effective — without becoming dependent on the tool.',
    type: 'success' as const,
  },
];

const anchorCardFields = [
  { field: 'How Might We...', prompt: 'Frame the teacher\'s need as a "How might we..." question. E.g., "How might we help teachers give timely writing feedback across 150 students without sacrificing quality?"' },
  { field: 'Teacher Skill Enhanced', prompt: 'What specific professional skill does this feature enhance — not replace?' },
  { field: 'Observed Workaround', prompt: 'How are teachers solving this now? What did you learn from watching them? Why is their current approach inadequate?' },
  { field: 'Evidence of Demand', prompt: 'What evidence do we have that teachers actually want this solved — not that we think they should? (Interviews, observations, co-design sessions?)' },
  { field: 'Time & Cognitive Load Reclaimed', prompt: 'What time or mental energy does this free up, and what does the teacher reinvest it in?' },
  { field: 'Capability After Removal', prompt: 'Is the teacher more capable without the tool after having used it for a year? Does the design build skill or create dependency?' },
];

const researchConnections = [
  { dimension: 'Design Thinking Foundations', color: '#e5a03b', sources: ['Stanford d.school — Empathize, Define, Ideate, Prototype, Test', 'Tim Brown (IDEO) — human-centered design as innovation method', 'Participatory Design — users as co-designers, not just informants'] },
  { dimension: 'Anchor', color: colors.anchor, sources: ['TPACK Framework — Technological Pedagogical Content Knowledge', 'Design Thinking: Empathize & Define — grounding solutions in observed human needs'] },
  { dimension: 'S — Shared Mental Model', color: colors.S, sources: ['Endsley\'s Situational Awareness — shared mental models and team cognition', 'Empathy Maps — structured tools for understanding user perspectives'] },
  { dimension: 'T — Guardrails', color: colors.T, sources: ['Dillenbourg\'s Orchestration — teacher coordination of complex activity', 'Kapur\'s Productive Failure — when struggle is beneficial', 'Constraint-Driven Design — how limitations focus creative problem-solving'] },
  { dimension: 'E — Escalation & Delegation', color: colors.E1, sources: ['Lee & See on Trust in Automation', 'Shneiderman\'s Human-Centered AI (HCAI)', 'Sheridan & Verplank\'s Levels of Automation', 'Rapid Prototyping — testing handoff points before scaling'] },
  { dimension: 'R — Reflective Loops', color: colors.R, sources: ['Schön\'s Reflective Practice', 'LATUX Workflow — learning analytics with teacher validation', 'Design Thinking: Test & Iterate — continuous learning from user feedback'] },
];

const useCases = [
  { title: 'As an audit lens', description: 'Does your existing product have each of these layers? Where are the gaps? Use STEER to systematically evaluate what\'s missing.' },
  { title: 'As a design checklist', description: 'For new features, start with the Anchor Card. If it passes, use STEER\'s five dimensions to shape the interaction design.' },
  { title: 'As a maturity model', description: 'Where is your product on the delegation spectrum? Are your escalation pathways well-designed or ad hoc?' },
  { title: 'As a critique shorthand', description: '"Have we anchored this?" becomes a way of asking whether a feature is grounded in real teacher value.' },
  { title: 'As a procurement framework', description: 'Schools and districts evaluating AI tools can use Anchor & STEER to ask the right questions of vendors.' },
  { title: 'As a research scaffold', description: 'Map user research interviews to each dimension separately for structured insight gathering.' },
];

export default function AnchorAndSteerPage() {
  const [expandedDimension, setExpandedDimension] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      {/* Draft Banner */}
      <div className="bg-amber-500/20 border-b border-amber-500/30">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-2">
          <span className="text-amber-400 text-sm font-medium">DRAFT</span>
          <span className="text-amber-300/70 text-sm">This page is a work in progress and not yet published.</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c]/40 via-zinc-900 to-zinc-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(44, 95, 138, 0.5), transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(123, 94, 167, 0.4), transparent)' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-sm uppercase tracking-widest text-[#2c5f8a] mb-4 font-medium">A Human-Centered Design Framework for AI in Education</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Anchor <span className="text-[#2c5f8a]">&</span> STEER
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-4">
            AI in education should extend a teacher&apos;s reach, judgment, and pedagogical intent — never bypass it. Every AI action should be traceable back to a teacher&apos;s goals, preferences, or explicit approval.
          </p>
          <p className="text-sm text-zinc-500">
            By Joe Alexander Mel&eacute;ndez-Naharro
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            The Problem: Most AI EdTech Starts with the Wrong Question
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Too much AI-powered education technology begins with &ldquo;what can AI do?&rdquo; rather than &ldquo;what do teachers actually need to be better at, and where are they bottlenecked?&rdquo;
            </p>
            <p>
              The result is a landscape of impressive technical demos that teachers don&apos;t use — tools that automate the wrong things, create dependency instead of capability, and treat educators as passive recipients of algorithmic decisions about their students.
            </p>
            <p>
              The Anchor & STEER framework offers a different approach — one rooted in design thinking. It begins where human-centered design begins: with empathy. Observe teachers. Understand their real constraints. Define the problem from their perspective. Only then do you ideate, prototype, and test AI features — with the teacher always in the loop, always in control, and always growing more skilled through the interaction.
            </p>
          </div>
        </div>
      </section>

      {/* Rooted in Design Thinking */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">Rooted in Design Thinking</h2>
          <p className="text-zinc-400 text-center mb-10 max-w-2xl mx-auto">
            Anchor & STEER applies the principles of human-centered design to the specific challenge of AI-teacher collaboration. Each layer maps to a design thinking mindset.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Design Thinking → Anchor mapping */}
            <div className="rounded-xl p-6 space-y-4" style={{ background: `${colors.anchor}15`, border: `1px solid ${colors.anchor}40` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: colors.anchor }}>A</div>
                <div>
                  <h3 className="font-semibold text-white">ANCHOR = Empathize + Define</h3>
                  <p className="text-xs text-zinc-500">Before you build, understand</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#e5a03b] text-sm font-bold shrink-0">Empathize</span>
                  <p className="text-sm text-zinc-400">Shadow teachers. Observe their workarounds. Understand what 150 essays on a Sunday night actually feels like — not what you imagine it feels like.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#e5a03b] text-sm font-bold shrink-0">Define</span>
                  <p className="text-sm text-zinc-400">Frame the problem from the teacher&apos;s perspective. &ldquo;How might we help teachers give timely, personalized writing feedback without sacrificing their weekends?&rdquo;</p>
                </div>
              </div>
            </div>

            {/* Design Thinking → STEER mapping */}
            <div className="rounded-xl p-6 space-y-4" style={{ background: 'rgba(45, 125, 154, 0.08)', border: '1px solid rgba(45, 125, 154, 0.25)' }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {['S','T','E','E','R'].map((l, i) => (
                    <div key={i} className="w-6 h-6 rounded flex items-center justify-center text-white font-bold text-xs" style={{ background: [colors.S, colors.T, colors.E1, colors.E2, colors.R][i] }}>{l}</div>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold text-white">STEER = Ideate + Prototype + Test</h3>
                  <p className="text-xs text-zinc-500">Design the collaboration, then keep learning</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#e5a03b] text-sm font-bold shrink-0">Ideate</span>
                  <p className="text-sm text-zinc-400">Explore how the AI and teacher might share mental models, set guardrails, and handle the moments the AI should step back.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#e5a03b] text-sm font-bold shrink-0">Prototype</span>
                  <p className="text-sm text-zinc-400">Design escalation pathways and delegation arcs. Test them with real teachers before scaling.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#e5a03b] text-sm font-bold shrink-0">Test</span>
                  <p className="text-sm text-zinc-400">Build reflective feedback loops so every interaction teaches the system and the teacher. Iterate continuously.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key insight */}
          <div className="mt-8 rounded-xl p-5 text-center" style={{ background: 'rgba(229, 160, 59, 0.08)', border: '1px solid rgba(229, 160, 59, 0.2)' }}>
            <p className="text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              <strong className="text-[#e5a03b]">The key difference:</strong> Design thinking typically empathizes with <em>end users</em>. Anchor & STEER insists you empathize with <em>teachers</em> — because in AI EdTech, the teacher is the designer of the learning experience, not a passive intermediary. Skip the teacher, and you&apos;ve skipped empathy.
            </p>
          </div>
        </div>
      </section>

      {/* Failure Modes */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Common Failure Modes</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {failureModes.map((fm, i) => (
              <div
                key={i}
                className="rounded-xl p-5"
                style={{
                  background: fm.type === 'success' ? 'rgba(58, 143, 110, 0.1)' : 'rgba(184, 84, 80, 0.08)',
                  border: `1px solid ${fm.type === 'success' ? 'rgba(58, 143, 110, 0.3)' : 'rgba(184, 84, 80, 0.2)'}`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{fm.type === 'success' ? '✓' : '✗'}</span>
                  <h3 className={`font-semibold ${fm.type === 'success' ? 'text-[#3a8f6e]' : 'text-[#b85450]'}`}>
                    {fm.mode}
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{fm.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Overview Diagram */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Framework Structure</h2>

          {/* STEER Pillars */}
          <div className="grid grid-cols-5 gap-2 md:gap-3 mb-3">
            {dimensions.map((d, i) => (
              <div
                key={i}
                className="rounded-t-lg p-3 md:p-4 text-center"
                style={{ background: `${d.color}20`, borderTop: `3px solid ${d.color}` }}
              >
                <span className="text-2xl md:text-3xl font-bold" style={{ color: d.color }}>{d.letter}</span>
                <p className="text-xs text-zinc-400 mt-1 hidden md:block leading-tight">{d.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center text-xs text-zinc-500 uppercase tracking-widest mb-4">Design Layer</div>

          {/* Anchor Foundation */}
          <div className="rounded-xl p-6 text-center" style={{ background: `${colors.anchor}30`, border: `1px solid ${colors.anchor}60` }}>
            <p className="text-sm uppercase tracking-widest mb-2" style={{ color: colors.anchorMid }}>Anchor — Foundation Layer</p>
            <p className="text-zinc-300 text-sm max-w-lg mx-auto">
              Ground every AI feature in real teacher needs. Does it enhance a professional skill? Does it solve a felt problem? Does it build capability, not dependency?
            </p>
          </div>
        </div>
      </section>

      {/* ANCHOR Section */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ background: colors.anchor }}>A</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">ANCHOR: Ground Before You Build</h2>
          </div>
          <p className="text-zinc-400 mb-8">
            Before applying STEER, every AI feature must pass a threshold test. Think of it in nautical terms — a ship that only steers drifts without purpose. You anchor to understand your position, then steer with intention.
          </p>

          <h3 className="text-xl font-semibold text-white mb-6">The Three Anchor Questions</h3>
          <div className="space-y-4">
            {anchorQuestions.map((q) => (
              <div key={q.number} className="rounded-xl p-5" style={{ background: 'rgba(26, 58, 92, 0.15)', borderLeft: `3px solid ${colors.anchorMid}` }}>
                <div className="flex items-start gap-3">
                  <span className="text-lg font-bold" style={{ color: colors.anchorMid }}>{q.number}</span>
                  <div>
                    <p className="font-medium text-white mb-2">{q.question}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{q.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Critical Distinction */}
          <div className="mt-8 rounded-xl p-6" style={{ background: 'rgba(196, 122, 42, 0.1)', border: '1px solid rgba(196, 122, 42, 0.25)' }}>
            <h4 className="font-semibold text-[#c47a2a] mb-3">The Critical Distinction</h4>
            <p className="text-sm text-zinc-300 mb-2">
              An AI that says <em>&ldquo;Student X is struggling with fractions&rdquo;</em> <strong className="text-[#b85450]">replaces</strong> teacher judgment.
            </p>
            <p className="text-sm text-zinc-300">
              An AI that says <em>&ldquo;Here&apos;s the pattern in Student X&apos;s errors — they&apos;re consistently treating the numerator and denominator as independent numbers. Here&apos;s a diagnostic task you could try&rdquo;</em> <strong className="text-[#3a8f6e]">sharpens</strong> it.
            </p>
          </div>
        </div>
      </section>

      {/* STEER Dimensions */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">STEER: Five Dimensions of Teacher-AI Collaboration</h2>
          <p className="text-zinc-400 text-center mb-10">Once value is anchored, design the interaction. Each dimension shapes a different facet of how the AI and teacher work together.</p>

          <div className="space-y-4">
            {dimensions.map((d, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${d.color}30` }}>
                <button
                  onClick={() => setExpandedDimension(expandedDimension === i ? null : i)}
                  className="w-full p-5 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors"
                  style={{ borderLeft: `4px solid ${d.color}` }}
                >
                  <span className="text-3xl font-bold shrink-0" style={{ color: d.color }}>{d.letter}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white">{d.title}</h3>
                    <p className="text-sm text-zinc-500">{d.subtitle}</p>
                  </div>
                  <span className="text-zinc-600 shrink-0">{expandedDimension === i ? '▲' : '▼'}</span>
                </button>

                {expandedDimension === i && (
                  <div className="px-5 pb-5 space-y-4" style={{ borderLeft: `4px solid ${d.color}` }}>
                    <div className="inline-block px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(229, 160, 59, 0.12)', color: '#e5a03b', border: '1px solid rgba(229, 160, 59, 0.25)' }}>
                      {d.designThinking}
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">{d.description}</p>
                    <p className="text-zinc-400 text-sm italic">{d.keyInsight}</p>
                    <div className="rounded-lg p-4" style={{ background: `${d.color}10`, border: `1px solid ${d.color}20` }}>
                      <p className="text-xs uppercase tracking-wider mb-2" style={{ color: d.color }}>In Practice</p>
                      <p className="text-sm text-zinc-300 leading-relaxed">{d.example}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous Cycle */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">The Continuous Cycle</h2>
          <p className="text-zinc-400 mb-10">The framework isn&apos;t linear — it&apos;s cyclical. You anchor before a new feature. You re-anchor when user research reveals you&apos;ve drifted from real needs.</p>

          {/* Cycle Diagram */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-10">
            <div className="rounded-xl p-4 md:p-6 text-center" style={{ background: `${colors.anchor}30`, border: `1px solid ${colors.anchor}60` }}>
              <p className="font-bold text-white text-sm md:text-base">ANCHOR</p>
              <p className="text-xs text-zinc-500 mt-1">Identify real needs</p>
            </div>
            <span className="text-zinc-600 text-xl">→</span>
            <div className="rounded-xl p-4 md:p-6 text-center" style={{ background: 'rgba(45, 125, 154, 0.15)', border: '1px solid rgba(45, 125, 154, 0.3)' }}>
              <p className="font-bold text-white text-sm md:text-base">STEER</p>
              <p className="text-xs text-zinc-500 mt-1">Design & build</p>
            </div>
            <span className="text-zinc-600 text-xl">→</span>
            <div className="rounded-xl p-4 md:p-6 text-center" style={{ background: 'rgba(123, 94, 167, 0.15)', border: '1px solid rgba(123, 94, 167, 0.3)' }}>
              <p className="font-bold text-white text-sm md:text-base">RE-ANCHOR</p>
              <p className="text-xs text-zinc-500 mt-1">Validate & refine</p>
            </div>
          </div>

          <p className="text-zinc-400 text-sm italic max-w-xl mx-auto">
            Resist the urge to STEER before you&apos;ve anchored. That&apos;s the message the edtech industry needs most — because so much AI-powered product development skips straight to &ldquo;look what the AI can do&rdquo; without ever grounding in &ldquo;but should it.&rdquo;
          </p>
        </div>
      </section>

      {/* Design Implications */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Design Implications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'On Transparency', text: 'The interface shouldn\'t bury the AI\'s logic. The biggest trust-killer in edtech is a black box. Teachers should understand why in under 10 seconds.' },
              { title: 'On Defaults', text: 'Defaults are pedagogical choices. If the AI defaults to giving hints quickly, that embodies a philosophy. Defaults must be intentional, documented, and overridable.' },
              { title: 'On Equity', text: 'Teacher-in-the-loop means the AI doesn\'t silently create different learning experiences for different students without the teacher knowing. Differential treatment should always be visible and endorsed.' },
              { title: 'On Time', text: 'The biggest constraint teachers face. If oversight burden is too high, teachers will either rubber-stamp everything or disengage — both defeat the purpose.' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(44, 44, 46, 0.4)', border: '1px solid rgba(56, 56, 58, 0.5)' }}>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anchor Card Template */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">The Anchor Card</h2>
          <p className="text-zinc-400 mb-8">A feature validation template. Fill this in before writing a single line of code.</p>

          <div className="rounded-xl p-6 space-y-4" style={{ border: '2px dashed rgba(44, 95, 138, 0.4)', background: 'rgba(26, 58, 92, 0.08)' }}>
            {anchorCardFields.map((f, i) => (
              <div key={i}>
                <label className="text-sm font-medium" style={{ color: colors.anchorMid }}>{f.field}</label>
                <div
                  className="mt-1 rounded-lg px-4 py-3 text-sm text-zinc-500 italic"
                  style={{ border: '1px dashed rgba(44, 95, 138, 0.3)', background: 'rgba(26, 58, 92, 0.05)', minHeight: '44px' }}
                >
                  {f.prompt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Connections */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Research Connections</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {researchConnections.map((rc, i) => (
              <div key={i} className="rounded-xl p-4" style={{ borderLeft: `3px solid ${rc.color}`, background: 'rgba(44, 44, 46, 0.3)' }}>
                <p className="text-sm font-semibold mb-2" style={{ color: rc.color }}>{rc.dimension}</p>
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

      {/* How to Use */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">How to Use This Framework</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((uc, i) => (
              <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(44, 44, 46, 0.4)', border: '1px solid rgba(56, 56, 58, 0.5)' }}>
                <h3 className="font-semibold text-white mb-2">{uc.title}</h3>
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
          <p className="text-zinc-400 mt-4 font-medium">
            Anchor & STEER — By Joe Alexander Mel&eacute;ndez-Naharro
          </p>
        </div>
      </section>
    </main>
  );
}
