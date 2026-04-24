# Methodology

Every number on [The True Cost of AI](../ai-true-cost) resolves to a primary source. Every assumption is disclosed on this page. If a number looks wrong, [challenge it](https://github.com/jamelna-apps/jamelna-site/issues/new?template=true-cost-challenge.md) — corrections land publicly in the [changelog](../ai-true-cost/changelog).

---

## At a glance

| The question | The answer |
|---|---|
| What is "true cost"? | What you'd pay at market rates if no one else absorbed the difference |
| Where do numbers come from? | Primary sources only — every `[cite]` opens the source |
| What's not included? | R&D salaries, marketing, overhead, opportunity cost of capital |
| How often is it updated? | Whenever a better source appears — see the changelog |
| Can the numbers be wrong? | Yes — that's why the methodology is public |

---

## What "true cost" means here

Not a prediction of future prices. Not an accounting of strategic value or investor expectations about monopoly economics. One question:

> **If every input had to be paid for at market rates today, what would this product cost?**

The published subscription price plus the four cost components that investors, cloud providers, and unpriced externalities currently absorb on your behalf.

---

## The five components

### 1. What you pay

The published subscription or per-seat price. Sourced from vendor pricing pages, published district contracts, and third-party aggregators where vendors do not disclose (SchoolAI Pro is the clearest case of deliberate price opacity).

### 2. Compute

The retail API cost of the queries you send per month, using each vendor's published pricing:

| Model | Input / 1M tokens | Output / 1M tokens |
|---|---|---|
| OpenAI GPT-4o | $2.50 | $10.00 |
| OpenAI GPT-4o-mini | $0.15 | $0.60 |
| OpenAI o1 (+ o1 Pro mode) | $15.00 | $60.00 |
| Claude Opus 4.1 | $15.00 | $75.00 |
| Claude Sonnet 4.5 | $3.00 | $15.00 |
| Claude Haiku 4.5 | $1.00 | $5.00 |
| Gemini 2.5 Pro | $1.25 | $10.00 |
| Gemini 2.0 Flash | $0.10 | $0.40 |

Retail API pricing — not cost-to-serve — because the thesis is "what you would pay at market rates," not "what the provider's raw cost is."

### 3. Training amortization

Training cost ÷ useful lifetime ÷ paying user base. Frontier training costs from [Epoch AI](https://epoch.ai/blog/how-much-does-it-cost-to-train-frontier-ai-models) — $78M for GPT-4 class; $100–500M for more recent frontier models. This line is usually the smallest contributor and the most approximate.

### 4. Energy + water externalities

Per-query electricity and water use × market rates. Two bounds:

- **Lower bound:** [Luccioni et al. FAccT 2024](https://arxiv.org/abs/2311.16863) — 0.047 Wh/query for smaller peer-reviewed models
- **Upper bound:** [Sam Altman's self-reported](https://blog.samaltman.com/the-gentle-singularity) 0.34 Wh/query for ChatGPT (unaudited, most specific vendor disclosure available)

Water cost from [Li et al.'s peer-reviewed study](https://arxiv.org/abs/2304.03271).

> In dollar terms these externalities are trivial — typically under $0.20/month. We surface them because aggregate load, not per-user dollars, is the real environmental argument.

### 5. Investor subsidy

The company's annual cash burn or net loss ÷ paying user base ÷ 12 months.

| Company | Period | Loss/Burn | Paying base | Per-user |
|---|---|---|---|---|
| OpenAI | FY2024 | $5B net (ex-SBC) | 11M | $37.88/mo |
| Anthropic | FY2024 | $5.6B cash burn | ~3M consumer | $14/mo (proportional) |
| Google AI | FY2024 | not disclosed | N/A | N/A |

---

## What we do not include

- R&D salaries beyond what's captured in training compute costs
- Opportunity cost of invested capital
- Safety and alignment research spending
- Sales, marketing, and customer acquisition costs
- Office, infrastructure, and corporate overhead

> **Why call this out?** Adding these would make the numbers *larger*, not smaller. We list what's excluded so the page cannot be accused of cherry-picking.

---

## Assumptions and sensitivity

### Usage varies

Each product's true cost uses a fixed usage assumption:

| Tier | Queries/month | Tokens/query |
|---|---|---|
| Consumer chat (Plus / Claude Pro / Gemini Advanced) | 600 | 1,200 |
| Free tier | 200 | 1,200 |
| Education seat | 400 | 1,200 |
| **Cursor Pro (heavy dev)** | **5,000** | **2,000** |

Your actual usage can be 10× higher or lower. Each product's YAML discloses its assumption.

### Reasoning tokens on o1 and Opus

OpenAI's o1 Pro mode and similar reasoning models generate **hidden reasoning tokens** — internal chain-of-thought that OpenAI bills as output tokens but are not visible to the user. Community reports put the multiplier at **3–10× the visible output**.

For products that use o1 heavily (ChatGPT Pro at 30% o1 Pro mix, ChatGPT Edu at 20% o1), compute uses a conservative **3× reasoning multiplier**. At 5–10× multipliers these numbers roughly double or triple. This is disclosed in each product's `basis:` field.

Claude Opus 4.1 is priced at $15/M input and $75/M output — 5× Sonnet 4.5 rates. Products heavy on Opus (Claude Max 5× and 20×) assume a **30% Opus mix**, same across both tiers (tier differences drive volume, not model mix).

### Cursor Pro is the most sensitive scenario

At the power-dev assumption, Anthropic retail compute alone is **$78/month** against a $20 subscription — a 3.9× gap before anything else. The 10M-token assumption is deliberate: Cursor's own reported AWS costs and the observation that ["Cursor spends 100% of its revenue on Anthropic"](https://www.wheresyoured.at/costs/) make heavy usage the load-bearing case.

A casual user at 1M tokens/month would see compute under $10.

### ChatGPT Edu has a huge price range

The calculator uses $12/seat/month as a typical institutional mid-case. The outlier is Cal State's [$16.9M / 533,000-seat contract](https://laist.com/news/education/chatgpt-california-state-university-csu-ai-deal) — **$2.11 per seat per month**. That's below what OpenAI spends on compute for those seats. Clearest public "sell below cost to capture the market" case.

### Google is genuinely different

Google Cloud is profitable. Alphabet does not disclose a Gemini P&L. The investor-subsidy line for both Gemini Free and Gemini Advanced is **$0** — not because providing the service is free, but because **no quotable cash loss exists that can be honestly attributed per user**.

Alphabet spent roughly **$91B** on AI infrastructure capex in 2025 (guided $175–185B for 2026), internally subsidized by Search ad profits. This is supplementary context rather than rolled into the counter.

### Wrapper products use a simplification

MagicSchool, SchoolAI, Khanmigo, and Cursor all buy API tokens directly, not consumer subscriptions. The calculator stacks them against ChatGPT Plus or Claude Pro via the `wraps:` field as a visible shorthand. A fully accurate model would use API-layer reference products; we chose clarity of the stacking visualization over precise attribution.

### The industry counter mixes metrics

The $10.6B/year figure on the hero sums OpenAI's net loss (excluding stock-based comp) with Anthropic's cash burn (which includes a one-time data-center prepayment). Mixing concepts. A skeptic could argue comparable operating losses are meaningfully smaller.

---

## Honest caveats

### Primary sources are often paywalled

The Information's reporting on OpenAI and Anthropic financials is behind a paywall. We cite matching figures from Reuters, Fortune, NYT-derived coverage, and CNBC — but the primary articles themselves were not read directly.

### Nothing is audited

Neither OpenAI nor Anthropic files public financials. Every company loss figure here comes from leaked investor documents. Education pricing data is partially from third-party aggregators. Wrapper company burn rates are inferred from VC funding totals and estimated runways.

> When Anthropic or OpenAI publish audited annual figures we will update via the changelog.

### "Subsidy" is a framing choice

These companies burn cash to grow, not because unit economics are structurally broken. Anthropic's gross margins went positive in 2025. OpenAI's paying subscriber base grew from 11M to ~35M in a year.

The "subsidy" framing reflects current cash-flow reality, not a claim that any of these products are doomed.

### Subscriber denominators age fast

We pair 2024 loss figures with 2024 subscriber counts for internal consistency. When 2025 actuals land (expected mid-2026), numbers will shift — possibly both higher (losses grew) and lower (paying base doubled).

---

## Found a mistake?

[Open a "Challenge a number" issue](https://github.com/jamelna-apps/jamelna-site/issues/new?template=true-cost-challenge.md) with the specific product, component, current value, and the source you believe is stronger. Corrections land publicly in the changelog.
