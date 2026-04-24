import React from 'react';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog | AI True Cost | Jamelna',
  description: 'A public record of every change to the numbers and methodology on the AI True Cost calculator.',
};

export default function ChangelogPage() {
  const filePath = path.join(process.cwd(), 'content', 'ai-true-cost', 'changelog.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  return (
    <main className="min-h-screen bg-canvas-deep text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <nav className="mb-8">
          <Link
            href=".."
            className="text-sm text-text-muted hover:text-orange-300 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to True Cost Calculator
          </Link>
        </nav>

        <article className="prose prose-invert prose-orange max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
