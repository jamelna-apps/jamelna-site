# AI True Cost Implementation Plan

**Goal:** Ship `/ai-true-cost/` on jamelna.com — a cited, interactive calculator that shows the true unsubsidized cost of common AI products, with a live subsidy counter, methodology page, and changelog.

**Architecture:** YAML content files compiled at build time into typed JSON. Client-side Next.js page renders scenario grid → result view. All math in-browser. Citations are a custom component wired to a central sources file. Live counter runs off a build-time constant. Dynamic OG images via `@vercel/og`. No database.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, next-intl, js-yaml, Vitest, @vercel/og.

**Working directory:** `jamelna-site/` — all commands run from the worktree at `.worktrees/ai-true-cost/`.

**Design reference:** `docs/plans/2026-04-23-ai-true-cost-design.md`

---

## Conventions

- **File paths are relative to `jamelna-site/`** (i.e. the worktree root) unless noted.
- **All user-facing copy** eventually lands in all 5 locale files (`messages/{en,es,de,pt,zh}.json`). English first; other locales stubbed with English text + `[TODO-TRANSLATE]` suffix.
- **Commits after every task.** Message format: `feat(ai-true-cost): <what>` or `test(ai-true-cost): <what>`.
- **Testing philosophy:** TDD for pure logic (YAML loader, cost math, counter math). Visual verification for UI — no snapshot tests.
- **Do not invent numbers.** Content-population tasks (Task 9, 12–14, 20) are deferred to Phase B (separate collaborative session). Phase A ships with one `placeholder` source + stub product files only, so the engineering can be wired up end-to-end.

---

## Phase A — Engineering (subagent-driven, this session)

Each task bundles setup → TDD where applicable → implement → verify → commit.

### Task 1: Install dependencies
- `npm install js-yaml && npm install --save-dev @types/js-yaml vitest @vitest/ui && npm install @vercel/og`
- Add `test` + `test:watch` scripts to `package.json`.
- Create `vitest.config.ts` at worktree root with `@` → worktree-root alias.
- Verify `npm run test` runs and prints "no test files found."
- Commit.

### Task 2: Types & content dirs
- Create `content/ai-true-cost/` and `content/ai-true-cost/products/` with `.gitkeep` files.
- Create `lib/ai-true-cost/types.ts` with `Tier`, `ComponentKey`, `Source`, `CostComponent`, `AssumedUsage`, `Product`, `Scenario`, `ScenariosFile`, `SubsidyConstants` types (shapes documented in the design doc).
- Commit.

### Task 3: YAML loader — failing tests
- Create `lib/ai-true-cost/__fixtures__/sources.yaml` and `__fixtures__/products/test-product.yaml` with minimal valid content.
- Create `lib/ai-true-cost/loader.test.ts` covering: `loadSources`, `loadProduct` (happy path + missing file), `loadAllProducts`, `resolveCitations` (happy path + unknown id throws).
- Run `npm run test` to confirm failure (module not found).
- Commit failing tests.

### Task 4: YAML loader — implement
- Create `lib/ai-true-cost/loader.ts` implementing the four functions above using `js-yaml`.
- Run `npm run test` — all tests pass.
- Commit.

### Task 5: Content scaffolding + data loader
- Create placeholder `content/ai-true-cost/sources.yaml` with one `placeholder:` entry.
- Create `content/ai-true-cost/scenarios.yaml` with three empty group entries (free, paid-consumer, education).
- Create `content/ai-true-cost/subsidy-constants.yaml` with `annual_industry_subsidy_usd: 0`, today's `last_verified`, empty sources list, and a note saying these are placeholders to be populated in Phase B.
- Create `lib/ai-true-cost/data.ts` exporting `getTrueCostData()` that loads everything from `process.cwd() + '/content/ai-true-cost/'` with module-level cache.
- `npm run build` to verify nothing breaks.
- Commit.

### Task 6: Cost math — failing tests
- Create `lib/ai-true-cost/math.test.ts` covering `computeBreakdown` (sum of 4 components → true cost, subsidy amount, subsidy multiple, divide-by-zero safety for free tier) and `stackWrapper` (wrapper cost stacks on wrapped product).
- `npm run test` — failures expected.
- Commit failing tests.

### Task 7: Cost math — implement
- Create `lib/ai-true-cost/math.ts` with `computeBreakdown(product: Product): Breakdown` and `stackWrapper(wrapper, wrapped): StackedBreakdown`. All values rounded to 2 decimal places.
- `npm run test` — all pass.
- Commit.

### Task 8: Counter math
- Write `lib/ai-true-cost/counter.test.ts` + implement `lib/ai-true-cost/counter.ts` with `SECONDS_PER_YEAR`, `subsidyPerSecond(annual)`, `subsidySince(annual, elapsedSeconds)`.
- Commit.

---

### Task 10: Route scaffold
- Create `app/[locale]/ai-true-cost/page.tsx` as a server component that reads `getTrueCostData()` and renders a placeholder hero with product count + subsidy constant. Include `metadata` export with title/description.
- `npm run dev` → visit `/en/ai-true-cost`. Should render without errors.
- Commit.

### Task 11: Citation component
- Create `components/ai-true-cost/Citation.tsx` as a client component — inline `[cite]` button that reveals a hover/tap card with source title, author, accessed date, URL, pull-quote. Accessible (focus ring, aria-label).
- Verify in the browser with a temporary wiring to the placeholder source; revert the temporary wire after confirming the hover card appears.
- Commit.

---

### Task 15: ScenarioGrid component
- Create `components/ai-true-cost/ScenarioGrid.tsx` (client). Props: `scenarios`, `selectedId`, `onSelect`. Renders three tier groups with buttons per scenario. Highlights the active one.
- Commit.

### Task 16: ResultView component
- Create `components/ai-true-cost/ResultView.tsx` (client). Props: `product`, `wrapped?`, `sources`. Renders the five-row breakdown table with Citation components per row, subsidy summary callout, and double-subsidy stack card when `wrapped` is provided.
- Commit.

### Task 17: Calculator wiring + URL state
- Create `components/ai-true-cost/Calculator.tsx` (client). Combines ScenarioGrid + ResultView. Uses `useSearchParams` + `useRouter` for `?scenario=` URL sync. When selected product has `wraps:`, looks up the wrapped product and passes to ResultView.
- Modify `page.tsx` to render `<Calculator>`.
- Verify in browser: clicking scenarios shows result view, URL updates, refresh preserves selection.
- Commit.

### Task 18: SubsidyCounter component
- Create `components/ai-true-cost/SubsidyCounter.tsx` (client). Uses a 100ms `setInterval` + `useRef` for start time. Renders `${amount.toLocaleString(...)}` with monospace tabular-nums. `aria-live="polite"` on the counter.
- Commit.

### Task 19: Hero + page composition
- Create `components/ai-true-cost/Hero.tsx` (server component with client counter inside). Accepts `annualSubsidyUsd` + `tagline` (featured product name + paid + true cost).
- Modify `page.tsx`: compute featured ChatGPT Plus breakdown when the product exists, render `<Hero>` + `<Calculator>` in a scroll-linked layout.
- Verify in browser.
- Commit.

---

### Task 21: Changelog page + TrustStamp footer
- Create `content/ai-true-cost/changelog.md` with initial entry.
- Create `app/[locale]/ai-true-cost/changelog/page.tsx` that reads and renders the markdown via `react-markdown`.
- Create `components/ai-true-cost/TrustStamp.tsx` with four links: `Last verified: <date>`, methodology, changelog, challenge-a-number (GitHub issue deep-link — use the repo URL resolved from `git remote -v`).
- Render `<TrustStamp>` at the bottom of the main page.
- Commit.

### Task 22: GitHub issue template
- Create `.github/ISSUE_TEMPLATE/true-cost-challenge.md` at the repo root with `---` frontmatter (name, about, labels) and fields: product, which number, what it should be, other context.
- Commit.

### Task 23: Dynamic OG image
- Create `app/api/og/true-cost/route.tsx` using `ImageResponse` from `@vercel/og`. `runtime = 'nodejs'` because the data loader uses `fs`. Reads `?scenario=` param; falls back to `chatgpt-plus` when missing. Renders product name, paid price, true cost, subsidy multiple, jamelna.com watermark at 1200×630.
- Modify main page `metadata` to become `generateMetadata` that builds an `openGraph.images` URL using the current `?scenario=` param.
- Verify by hitting `/api/og/true-cost` and `/api/og/true-cost?scenario=chatgpt-plus` in the dev server.
- Commit.

### Task 24: Share bar
- Create `components/ai-true-cost/ShareBar.tsx`: Copy result button (navigator.clipboard), X intent URL, LinkedIn share URL. Tweet-length line includes price, true cost, subsidy multiple, and canonical URL with `?scenario=`.
- Wire into `ResultView.tsx` near the breakdown.
- Verify copy works in browser.
- Commit.

### Task 25: Analytics events
- Read `analytics/` helpers in the existing codebase to find the current event-emit function shape.
- Emit `scenario_picked` from `Calculator.tsx` onSelect, `share_clicked` from `ShareBar.tsx` with channel (copy/x/linkedin), `methodology_viewed` on the methodology page (wrap client), `challenge_clicked` when the trust stamp link is clicked.
- Verify network requests fire in dev tools.
- Commit.

### Task 26: Cross-links
- Add a card linking to `/ai-true-cost` on `app/[locale]/tech-sovereignty/page.tsx` matching existing pathway-card visual language.
- Add a callout on `app/[locale]/tech-sovereignty/ai-llm/page.tsx` linking to the new page.
- Commit.

### Task 27: i18n scaffold
- Extract user-facing strings from all new components into `messages/en.json` under a `trueCost` namespace. Wire `useTranslations('trueCost')` where applicable.
- Duplicate the `trueCost` block to `es.json`, `de.json`, `pt.json`, `zh.json` with English values suffixed `[TODO-TRANSLATE]`.
- Verify English loads identically; switch to another locale and confirm no crash.
- Commit.

### Task 28: Final verification
- `npm run lint && npm run test && npm run build` — all green.
- Manual browser walkthrough: hero counter ticks, every scenario resolves, citations hover cards work, share URL round-trips, OG image renders, methodology + changelog load, trust stamp links work, no console errors, mobile viewport clean.
- Commit any polish.
- Report Phase A complete.

---

## Phase B — Content research (deferred, collaborative)

Separate human-in-the-loop session to research and cite:

- **Task 9** — Industry annual subsidy (OpenAI + Anthropic + Google AI losses) with three primary-source citations.
- **Task 12** — Six free-tier product YAMLs with sourced cost components.
- **Task 13** — Four paid-consumer product YAMLs with sourced cost components.
- **Task 14** — Three education/institutional product YAMLs with sourced cost components.
- **Task 20** — Methodology essay + FAQ schema entries.

Each number must resolve to a primary source with pull-quote in `sources.yaml`. No guessing; fields that can't be sourced stay unset with a `TODO` basis note.
