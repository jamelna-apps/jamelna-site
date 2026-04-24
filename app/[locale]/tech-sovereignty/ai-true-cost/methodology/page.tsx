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
  description: 'How we calculate the true unsubsidized cost of AI products — definitions, formulas, sources, and assumptions.',
};

export default function MethodologyPage() {
  const filePath = path.join(process.cwd(), 'content', 'ai-true-cost', 'methodology.md');
  const fileExists = fs.existsSync(filePath);

  return (
    <main className="min-h-screen bg-canvas-deep text-white">
      <MethodologyViewTracker />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <nav className="mb-8">
          <Link
            href="../ai-true-cost"
            className="text-sm text-text-muted hover:text-orange-300 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to True Cost Calculator
          </Link>
        </nav>

        {fileExists ? (
          <article className="prose prose-invert prose-orange max-w-none prose-table:text-sm prose-table:border prose-table:border-canvas-border prose-th:bg-canvas-raised prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:text-white prose-td:px-3 prose-td:py-2 prose-td:border-t prose-td:border-canvas-border prose-blockquote:border-l-orange-500 prose-blockquote:bg-canvas-raised/50 prose-blockquote:not-italic prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r prose-headings:scroll-mt-20 prose-h2:mt-12 prose-h3:mt-8 prose-hr:border-canvas-border">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{fs.readFileSync(filePath, 'utf-8')}</ReactMarkdown>
          </article>
        ) : (
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-4">Methodology</h1>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
              <p className="text-orange-200 font-semibold mb-2">Methodology is being drafted (Phase B)</p>
              <p className="text-text-secondary text-sm leading-relaxed">
                The full methodology essay — covering how we calculate each of the five cost
                components, our assumptions, sensitivity analysis, and honest caveats — will
                be published alongside the first real cost numbers in Phase B.
              </p>
              <p className="text-text-secondary text-sm mt-4 leading-relaxed">
                In the meantime, you can review the{' '}
                <Link
                  href="../ai-true-cost/changelog"
                  className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors"
                >
                  changelog
                </Link>{' '}
                to see what has shipped so far, or{' '}
                <a
                  href="https://github.com/jamelna-apps/jamelna-site/issues/new?template=true-cost-challenge.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors"
                >
                  challenge a number
                </a>{' '}
                if you believe something is wrong.
              </p>
            </div>

            <div className="mt-12 space-y-8 text-text-secondary">
              <section>
                <h2 className="text-xl font-bold text-white mb-3">What &ldquo;true cost&rdquo; means here</h2>
                <p className="leading-relaxed">
                  Not a prediction of future prices. Not accounting for strategic value or
                  investor expectations. A single question: <em>if every input had to be paid
                  for at market rates today, what would this product cost?</em>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">The five components</h2>
                <ol className="list-decimal list-inside space-y-3 text-sm leading-relaxed">
                  <li><strong className="text-white">What you pay</strong> — the published subscription or usage price.</li>
                  <li><strong className="text-white">Compute</strong> — GPU-hours × cloud rate (on-demand, reserved, or spot).</li>
                  <li><strong className="text-white">Training amortization</strong> — training cost ÷ estimated lifetime tokens served.</li>
                  <li><strong className="text-white">Energy + water</strong> — kWh and liters per query × market rate.</li>
                  <li><strong className="text-white">Investor subsidy</strong> — company&apos;s annual loss ÷ paying users ÷ 12 months.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-3">What we do not include</h2>
                <p className="leading-relaxed text-sm">
                  R&amp;D salaries beyond compute, opportunity cost of capital, safety and
                  alignment spending, sales and marketing. We list these explicitly so critics
                  cannot claim cherry-picking.
                </p>
              </section>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
