'use client';

import React from 'react';

interface ModeSelectorProps {
  onSelect: (mode: 'educator' | 'learner') => void;
}

export function ModeSelector({ onSelect }: ModeSelectorProps) {
  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
        How would you like to learn?
      </h2>
      <p className="text-zinc-400 text-center mb-8 max-w-xl mx-auto">
        Choose your path based on how you want to engage with the curriculum
      </p>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Educator Card */}
        <button
          onClick={() => onSelect('educator')}
          className="group bg-zinc-800 border-2 border-zinc-700 rounded-xl p-8 text-left hover:border-violet-500/50 hover:bg-zinc-800/80 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
          <div className="w-14 h-14 bg-violet-500/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-violet-500/30 transition-colors">
            <svg className="w-7 h-7 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
            I&apos;m Teaching
          </h3>
          <p className="text-zinc-400 text-sm mb-4">
            Structured curriculum with lesson plans, assessments, and UDL supports for your classroom
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-zinc-700/50 text-zinc-300 px-2 py-1 rounded">Lesson Plans</span>
            <span className="text-xs bg-zinc-700/50 text-zinc-300 px-2 py-1 rounded">Grade Bands</span>
            <span className="text-xs bg-zinc-700/50 text-zinc-300 px-2 py-1 rounded">Assessments</span>
          </div>
        </button>

        {/* Learner Card */}
        <button
          onClick={() => onSelect('learner')}
          className="group bg-zinc-800 border-2 border-zinc-700 rounded-xl p-8 text-left hover:border-sky-500/50 hover:bg-zinc-800/80 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
          <div className="w-14 h-14 bg-sky-500/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-sky-500/30 transition-colors">
            <svg className="w-7 h-7 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
            I&apos;m Learning
          </h3>
          <p className="text-zinc-400 text-sm mb-4">
            Goal-based paths with hands-on projects. &quot;I want to...&quot; approach with quick wins and checkpoints
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-zinc-700/50 text-zinc-300 px-2 py-1 rounded">Goal-Based</span>
            <span className="text-xs bg-zinc-700/50 text-zinc-300 px-2 py-1 rounded">Quick Wins</span>
            <span className="text-xs bg-zinc-700/50 text-zinc-300 px-2 py-1 rounded">Checkpoints</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ModeSelector;
