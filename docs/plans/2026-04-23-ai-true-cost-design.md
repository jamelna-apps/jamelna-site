# AI True Cost — Design

**Status:** Validated design, ready for implementation plan
**Date:** 2026-04-23
**Location:** `jamelna-site/app/[locale]/tech-sovereignty/ai-true-cost/`

## Thesis

People don't understand that the AI tools they use every day — ChatGPT Free, Claude Pro, MagicSchool for teachers — are heavily subsidized. If the subsidy stopped tomorrow, a $20/month ChatGPT Plus subscription would cost somewhere in the range of $287/month. This tool makes that gap visible, personal, and citable.

The project is a natural extension of jamelna's existing `tech-sovereignty/` content, which already argues for local-first AI and independence from centralized providers. Tech sovereignty is what you do *after* you realize the subsidized version has a hidden price.

## Goals

- Let any visitor see the true unsubsidized cost of the specific AI tool they currently use.
- Cite every number against primary sources (SemiAnalysis, Epoch AI, peer-reviewed papers, financial reporting).
- Be shareable — teachers pasting into school board emails, people quote-tweeting on X.
- Survive public scrutiny: publish methodology, acknowledge limits, accept corrections via public changelog.

## Non-Goals

- Not a prediction of future AI prices.
- Not an argument that AI is "bad" — purely a visibility tool about actual economics.
- Not a full academic paper. Blunt, visual, numbers-forward.
- Not an MVP throwaway — launching with full citations and changelog from day one.

## User Experience

### Hero (above the fold)

- Headline: "The True Cost of AI"
- Tagline (featured scenario): "You pay $20/month for ChatGPT Plus. Without subsidies, it would cost you $287/month."
- CTA: "See your true cost →" (scrolls to calculator)
- Subsidy counter card: "Since you opened this page, AI companies have subsidized users like you: $ 1,427.93 ▲" ticking in real-time.

**Visual tone:** Matches existing tech-sovereignty dark canvas (`bg-canvas-raised`, `border-canvas-border`). Red/orange accent for the counter (debt/burn feeling). Monospace digits. Subtle tick animation.

**Counter math:** Annual loss of OpenAI + Anthropic + Google AI division ÷ 31,557,600 seconds/year. Client-side `setInterval`. Constant computed at build time from `sources.yaml`.

### Calculator — scenario grid

Grouped into three tiers:

**Free tiers:** ChatGPT Free · Claude Free · Gemini Free · MagicSchool (teacher) · SchoolAI · Khanmigo

**Paid consumer ($20 tier):** ChatGPT Plus · Claude Pro · Gemini Advanced · Cursor Pro

**Education / institutional:** ChatGPT Edu · MagicSchool Plus · SchoolAI Pro

Plus a "Customize your own →" link for power users.

### Result view

Shows the five-line breakdown: price paid + 4 cost components = true cost. Highlights subsidy amount and multiple. Every number has a [cite] affordance revealing source + pull-quote. Wrapper products show a double-subsidy stack card (MagicSchool subsidy + underlying OpenAI subsidy).

### Customize mode

Dropdowns for model / query mix / volume. Sliders for key assumptions (GPU cost basis: on-demand / reserved / spot). Every slider has a `[?]` tooltip linking to the methodology section.

## Cost Components (the five)

Each scenario resolves to a breakdown of these five components. Every number is cited.

1. **What you pay** — published price from provider pricing pages.
2. **Compute** — GPU-hours × cloud rate. Sources: SemiAnalysis, Epoch AI.
3. **Training amortization** — training cost ÷ estimated lifetime tokens served. Sources: Epoch AI, company disclosures.
4. **Energy + water** — kWh and liters per query × market rate. Sources: Luccioni et al., University of Washington water studies.
5. **Investor subsidy** — company's annual loss ÷ paying users (or tokens served). Sources: The Information, FT reporting.

## Data Model

Content-first, YAML files compiled to JSON at build time. No database.

```
/content/ai-true-cost/
  ├── scenarios.yaml          # Scenario list + grouping
  ├── products/
  │   ├── chatgpt-plus.yaml
  │   ├── chatgpt-free.yaml
  │   ├── claude-pro.yaml
  │   ├── magicschool-free.yaml
  │   └── ...
  ├── sources.yaml            # All citations, keyed by ID
  ├── methodology.md          # Public methodology essay
  ├── changelog.md            # Every numeric change, dated
  └── subsidy-constants.yaml  # Industry annual subsidy for counter
```

### Product file shape

```yaml
id: chatgpt-plus
name: ChatGPT Plus
vendor: OpenAI
tier: paid-consumer
price_paid_usd: 20.00
price_unit: monthly
assumed_usage:
  queries_per_month: 600
  avg_input_tokens: 800
  avg_output_tokens: 400
  primary_model: gpt-4o
cost_components:
  compute:
    value_usd: 94.12
    basis: "gpu_hours * cloud_rate_on_demand"
    sources: [semianalysis-2025-q1, epoch-2025-training]
  training_amortization:
    value_usd: 41.80
    basis: "training_cost / estimated_lifetime_tokens"
    sources: [epoch-2025-training, openai-gpt4-paper]
  energy_water:
    value_usd: 17.50
    sources: [luccioni-2024, uw-water-2024]
  investor_subsidy:
    value_usd: 113.75
    basis: "openai_annual_loss / paid_users / 12"
    sources: [the-information-2025-openai-finances]
last_verified: 2026-04-23
```

### Sources file shape

```yaml
semianalysis-2025-q1:
  title: "Inference Economics of GPT-4 class models"
  author: SemiAnalysis
  url: https://...
  accessed: 2026-04-15
  pull_quote: "..."
```

### UI binding

Every number in the calculator renders via a `<Citation>` component. Hover / tap reveals the source with direct link and exact pull-quote. No unsourced numbers anywhere on the page.

## Methodology & Trust

Public methodology page at `/tech-sovereignty/ai-true-cost/methodology`.

Structured as a short essay:

1. **What "true cost" means here** — not a prediction, not accounting for strategic value; "if every input had to be paid for at market rates today, what would this cost?"
2. **The five components** — definition, formula, sources, assumptions, what could make it wrong.
3. **What we do not include** — R&D salaries, opportunity cost of capital, safety/alignment spending. Explicit so critics can't claim cherry-picking.
4. **Assumptions & sensitivity** — table showing how final numbers move when key assumptions change (e.g., on-demand vs reserved GPU pricing).
5. **Honest caveats** — company losses aren't 100% AI-attributable; token-volume estimates come from third parties; sources rot.

### Trust UI elements on the main page

- Footer stamp: `Last verified: 2026-04-23 · [methodology] · [changelog] · [challenge a number →]`
- "Challenge a number" opens a GitHub issue template pre-filled with the specific number, source, and product.
- Every citation includes accessed-date and pull-quote, not just URL.
- Versioned share URLs (`?v=2026-04-23`) so old social shares stay reproducible even after number updates.

## Tech Stack

All within the existing `jamelna-site` Next.js app.

- **Framework:** Next.js App Router (existing), `next-intl` for i18n.
- **Route:** `/[locale]/tech-sovereignty/ai-true-cost/`
- **Content loader:** `lib/ai-true-cost/*` parses YAML at build time, emits typed data.
- **Calculator:** client component. All math in-browser.
- **Counter:** client `setInterval`. Annual-loss constant from `sources.yaml` at build time. No network calls.
- **OG images:** `@vercel/og` at `/api/og/true-cost?scenario=chatgpt-plus&v=2026-04-23`.
- **Analytics:** existing jamelna `/api/analytics` pipeline — project ID `jamelna`. Custom events: `scenario_picked`, `share_clicked`, `methodology_viewed`, `challenge_clicked`.

## Sharing & SEO

- Dynamic OG images per scenario (1200×630 PNG).
- Versioned share URLs so shared state is reproducible.
- Copy-as-text button outputs a tweet-length summary.
- SEO targets: "true cost of ChatGPT", "how much does ChatGPT really cost", "AI subsidy", "is MagicSchool really free", etc.
- `FAQPage` structured data on the methodology page.
- Internal linking: hero card on `/tech-sovereignty` landing, link from existing `/tech-sovereignty/ai-llm`.

## Build Estimate

~2–3 weekends. Week 1: content + data model + static layout. Week 2: calculator + counter + citations. Week 3: OG images, methodology, changelog, polish.

## Open Questions

- Arabic translation: defer to after English launch.
- "Customize your own" mode: ship at launch since same math engine.
- Homepage integration: depends on whether jamelna has a visible "tools" or "experiments" section.
