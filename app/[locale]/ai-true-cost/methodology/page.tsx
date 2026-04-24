import React from 'react';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { MethodologyViewTracker } from '@/components/ai-true-cost/MethodologyViewTracker';

export const metadata: Metadata = {
  title: 'Methodology | AI True Cost | Jamelna',
  description:
    'How we calculate the true unsubsidized cost of AI products — definitions, formulas, sources, and assumptions.',
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractText(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map((c) => (typeof c === 'string' ? c : ''))
    .join('');
}

interface Section {
  title: string;
  slug: string;
}

export default function MethodologyPage() {
  const filePath = path.join(process.cwd(), 'content', 'ai-true-cost', 'methodology.md');
  const raw = fs.readFileSync(filePath, 'utf-8');

  const sections: Section[] = [...raw.matchAll(/^## (.+)$/gm)]
    .map((m) => m[1].trim())
    .filter((t) => t.length > 0)
    .map((title) => ({ title, slug: slugify(title) }));

  return (
    <main className="min-h-screen bg-canvas-deep text-white">
      <MethodologyViewTracker />
      <div className="max-w-6xl mx-auto px-6 py-10 lg:py-16">
        {/* Back nav */}
        <nav className="mb-10">
          <Link
            href=".."
            className="text-sm text-text-muted hover:text-orange-300 transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to True Cost Calculator
          </Link>
        </nav>

        {/* Page header */}
        <header className="mb-12 pb-10 border-b border-canvas-border">
          <div className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-3">
            True Cost of AI
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Methodology
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
            How each number on the calculator is calculated, sourced, and verified — plus
            honest caveats about what could make them wrong.
          </p>
        </header>

        {/* Mobile TOC */}
        <details className="lg:hidden mb-10 bg-canvas-raised border border-canvas-border rounded-lg">
          <summary className="px-4 py-3 cursor-pointer font-semibold text-white select-none">
            <span className="text-sm uppercase tracking-wider text-orange-400">On this page</span>
          </summary>
          <ul className="px-4 pb-4 space-y-2">
            {sections.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="block py-1 text-sm text-text-secondary hover:text-orange-300 transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </details>

        <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12">
          {/* Desktop TOC sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <div className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-4">
                On this page
              </div>
              <ul className="space-y-2 border-l border-canvas-border">
                {sections.map((s) => (
                  <li key={s.slug}>
                    <a
                      href={`#${s.slug}`}
                      className="block -ml-px pl-4 py-1 text-sm text-text-secondary border-l border-transparent hover:border-orange-400 hover:text-orange-300 transition-colors leading-snug"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <article
            className="
              prose prose-invert prose-orange max-w-none
              prose-headings:scroll-mt-24
              prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:font-bold prose-h2:text-white
              prose-h2:mt-24 prose-h2:mb-8 prose-h2:pb-4
              prose-h2:border-b prose-h2:border-canvas-border
              prose-h2:first:mt-0
              prose-h3:text-xl md:prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-white
              prose-h3:mt-16 prose-h3:mb-5
              prose-p:text-lg prose-p:leading-[1.8] prose-p:text-text-secondary prose-p:my-6
              prose-li:text-lg prose-li:text-text-secondary prose-li:leading-[1.75] prose-li:my-2
              prose-ul:my-6 prose-ol:my-6
              prose-strong:text-white
              prose-a:text-orange-300 prose-a:no-underline hover:prose-a:text-orange-200 hover:prose-a:underline
              prose-hr:border-canvas-border prose-hr:my-20
              prose-table:text-base prose-table:my-10
              prose-table:border prose-table:border-canvas-border prose-table:rounded-lg prose-table:overflow-hidden
              prose-th:bg-canvas-raised prose-th:text-white prose-th:font-semibold
              prose-th:px-5 prose-th:py-4 prose-th:text-left
              prose-td:px-5 prose-td:py-4 prose-td:border-t prose-td:border-canvas-border
              prose-td:text-text-secondary
              prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-orange-500
              prose-blockquote:bg-orange-500/5 prose-blockquote:rounded-r-lg
              prose-blockquote:px-7 prose-blockquote:py-4 prose-blockquote:my-8
              prose-blockquote:text-text-primary prose-blockquote:text-lg
              prose-blockquote:font-normal prose-blockquote:leading-[1.75]
              prose-code:bg-canvas-raised prose-code:text-orange-200 prose-code:px-1.5 prose-code:py-0.5
              prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-code:before:content-none prose-code:after:content-none
            "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children, ...props }) => {
                  const text = extractText(children);
                  return (
                    <h2 id={slugify(text)} {...props}>
                      {children}
                    </h2>
                  );
                },
                h3: ({ children, ...props }) => {
                  const text = extractText(children);
                  return (
                    <h3 id={slugify(text)} {...props}>
                      {children}
                    </h3>
                  );
                },
              }}
            >
              {raw}
            </ReactMarkdown>
          </article>
        </div>

        {/* Footer actions */}
        <div className="mt-16 pt-8 border-t border-canvas-border flex flex-wrap gap-4 justify-between items-center">
          <Link
            href=".."
            className="text-sm text-text-muted hover:text-orange-300 transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Calculator
          </Link>
          <a
            href="https://github.com/jamelna-apps/jamelna-site/issues/new?template=true-cost-challenge.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-orange-400 hover:text-orange-300 transition-colors inline-flex items-center gap-1"
          >
            Challenge a number
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}
