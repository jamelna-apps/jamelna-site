'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface LessonResource {
  title: string;
  track: string;
  duration: string;
  hasAssessment: boolean;
  link: string;
}

interface GradeBand {
  id: string;
  label: string;
  ageRange: string;
  description: string;
  color: string;
  lessons: LessonResource[];
}

interface EducatorHubProps {
  locale: string;
}

export function EducatorHub({ locale }: EducatorHubProps) {
  const [selectedBand, setSelectedBand] = useState<string>('all');

  const gradeBands: GradeBand[] = [
    {
      id: 'elementary',
      label: 'Elementary',
      ageRange: 'K-5 (Ages 5-11)',
      description: 'Foundational concepts through exploration and play',
      color: 'green',
      lessons: [
        { title: 'What is Privacy?', track: 'Digital Rights', duration: '30 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/digital-rights?project=1&grade=elementary` },
        { title: 'My Digital Footprint', track: 'Digital Rights', duration: '45 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/digital-rights?project=1&grade=elementary&lesson=2` },
        { title: 'Exploring Linux (Scratch)', track: 'Linux & FOSS', duration: '45 min', hasAssessment: false, link: `/${locale}/tech-sovereignty/linux-foss?project=1&grade=elementary` },
        { title: 'How Networks Work (Unplugged)', track: 'Networking', duration: '40 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/networking?project=1&grade=elementary` },
      ],
    },
    {
      id: 'middle',
      label: 'Middle School',
      ageRange: '6-8 (Ages 11-14)',
      description: 'Hands-on projects building technical foundations',
      color: 'sky',
      lessons: [
        { title: 'Understanding Digital Privacy', track: 'Digital Rights', duration: '50 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/digital-rights?project=1&grade=middle` },
        { title: 'Introduction to Linux', track: 'Linux & FOSS', duration: '60 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/linux-foss?project=1&grade=middle` },
        { title: 'Build Your Own Network', track: 'Networking', duration: '90 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/networking?project=1&grade=middle` },
        { title: 'What is AI?', track: 'AI/LLM', duration: '45 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/ai-llm?project=1&grade=middle` },
        { title: 'HTML Basics', track: 'App Dev', duration: '60 min', hasAssessment: false, link: `/${locale}/tech-sovereignty/app-dev?project=1&grade=middle` },
        { title: 'Open Source Exploration', track: 'Linux & FOSS', duration: '50 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/linux-foss?project=3&grade=middle` },
      ],
    },
    {
      id: 'high',
      label: 'High School',
      ageRange: '9-12 (Ages 14-18)',
      description: 'Advanced projects with real-world applications',
      color: 'violet',
      lessons: [
        { title: 'Digital Rights & Advocacy', track: 'Digital Rights', duration: '75 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/digital-rights?project=3&grade=high` },
        { title: 'Linux System Administration', track: 'Linux & FOSS', duration: '90 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/linux-foss?project=4&grade=high` },
        { title: 'Network Security Fundamentals', track: 'Networking', duration: '90 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/networking?project=2&grade=high` },
        { title: 'Self-Hosted Cloud Setup', track: 'Self-Hosted', duration: '120 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/self-hosted?project=2&grade=high` },
        { title: 'Running Local LLMs', track: 'AI/LLM', duration: '90 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/ai-llm?project=2&grade=high` },
        { title: 'Building Community Apps', track: 'App Dev', duration: '120 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/app-dev?project=2&grade=high` },
        { title: 'Mesh Networking Project', track: 'Networking', duration: '150 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/networking?project=3&grade=high` },
        { title: 'Community Tech Workshop Design', track: 'Community', duration: '90 min', hasAssessment: true, link: `/${locale}/tech-sovereignty/community?project=1&grade=high` },
      ],
    },
  ];

  const filteredBands = selectedBand === 'all'
    ? gradeBands
    : gradeBands.filter(b => b.id === selectedBand);

  const colorClasses: Record<string, { bg: string; border: string; text: string; pill: string }> = {
    green: { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-400', pill: 'bg-green-500/20 text-green-300' },
    sky: { bg: 'bg-sky-500/20', border: 'border-sky-500/30', text: 'text-sky-400', pill: 'bg-sky-500/20 text-sky-300' },
    violet: { bg: 'bg-violet-500/20', border: 'border-violet-500/30', text: 'text-violet-400', pill: 'bg-violet-500/20 text-violet-300' },
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Educator Resources by Grade Band
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Access UDL-aligned lesson plans organized by grade level. Each lesson includes learning objectives, materials, and optional assessments.
        </p>
      </div>

      {/* Grade Band Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setSelectedBand('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedBand === 'all'
              ? 'bg-violet-500 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          All Grades
        </button>
        {gradeBands.map((band) => (
          <button
            key={band.id}
            onClick={() => setSelectedBand(band.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedBand === band.id
                ? `${colorClasses[band.color].bg} ${colorClasses[band.color].text} ring-1 ring-${band.color}-500/50`
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {band.label}
          </button>
        ))}
      </div>

      {/* Grade Bands */}
      <div className="space-y-8">
        {filteredBands.map((band) => {
          const colors = colorClasses[band.color];
          return (
            <div key={band.id} className={`bg-zinc-800 border ${colors.border} rounded-xl p-6`}>
              <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={`text-xl font-semibold ${colors.text}`}>{band.label}</h3>
                    <span className="text-xs text-zinc-500">{band.ageRange}</span>
                  </div>
                  <p className="text-sm text-zinc-400">{band.description}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${colors.pill}`}>
                  {band.lessons.length} lessons
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {band.lessons.map((lesson, idx) => (
                  <Link
                    key={idx}
                    href={lesson.link}
                    className="group bg-zinc-900/50 border border-zinc-700 hover:border-zinc-600 rounded-lg p-4 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white text-sm group-hover:text-violet-300 transition-colors mb-1">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-zinc-500">
                          <span>{lesson.track}</span>
                          <span>·</span>
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {lesson.hasAssessment && (
                          <span className="bg-violet-500/20 text-violet-300 text-xs px-2 py-0.5 rounded">
                            Assessment
                          </span>
                        )}
                        <svg className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* UDL Info */}
      <div className="mt-8 bg-zinc-900/50 border border-zinc-700 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Universal Design for Learning (UDL)</h4>
            <p className="text-sm text-zinc-400 mb-3">
              All lessons are designed with UDL principles: multiple means of engagement, representation, and action/expression. Each includes adaptations for diverse learners.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">Multiple entry points</span>
              <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">Flexible assessment</span>
              <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">Scaffolded support</span>
              <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">Culturally responsive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <button className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg p-4 text-left transition-all group">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-5 h-5 text-zinc-400 group-hover:text-violet-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium text-white text-sm">Scope & Sequence</span>
          </div>
          <p className="text-xs text-zinc-500">Full curriculum overview PDF</p>
        </button>
        <button className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg p-4 text-left transition-all group">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-5 h-5 text-zinc-400 group-hover:text-violet-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="font-medium text-white text-sm">Assessment Rubrics</span>
          </div>
          <p className="text-xs text-zinc-500">Standards-aligned rubrics</p>
        </button>
        <button className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg p-4 text-left transition-all group">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-5 h-5 text-zinc-400 group-hover:text-violet-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="font-medium text-white text-sm">Materials List</span>
          </div>
          <p className="text-xs text-zinc-500">Hardware & software needs</p>
        </button>
      </div>
    </div>
  );
}
