import type { Metadata } from 'next';
import { getTrueCostData } from '@/lib/ai-true-cost/data';

export const metadata: Metadata = {
  title: 'The True Cost of AI | Jamelna',
  description:
    'Discover the real, unsubsidized cost of the AI tools you use every day. Interactive calculator with cited sources for ChatGPT, Claude, Gemini, and more.',
};

export default async function AiTrueCostPage() {
  const data = await getTrueCostData();
  const productCount = data.products.length;
  const subsidyUsd = data.subsidyConstants.annual_industry_subsidy_usd;

  return (
    <main className="min-h-screen bg-canvas-deep text-white">
      {/* Placeholder hero — replaced in Task 19 */}
      <section className="pt-16 pb-12 px-6 bg-canvas-deep border-b border-canvas-border">
        <div className="max-w-5xl mx-auto">
          <hr className="heading-rule mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            The True Cost of AI
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mb-2">
            AI tools are heavily subsidized. This calculator shows what you&apos;d actually pay
            without investor and infrastructure subsidies.
          </p>
          {productCount > 0 && (
            <p className="text-sm text-text-muted mt-4">
              {productCount} product{productCount !== 1 ? 's' : ''} loaded
            </p>
          )}
          {subsidyUsd > 0 && (
            <p className="text-sm text-text-muted">
              Annual industry subsidy: ${subsidyUsd.toLocaleString()}
            </p>
          )}
        </div>
      </section>

      {/* Calculator placeholder — replaced in Task 17 */}
      <section id="calculator" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-text-muted text-sm font-mono">
            [Calculator coming in Task 17]
          </p>
        </div>
      </section>
    </main>
  );
}
