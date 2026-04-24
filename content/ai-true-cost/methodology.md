# Methodology

Every number on [The True Cost of AI](../ai-true-cost) resolves to a primary source. Every assumption is disclosed here. If you think a number is wrong, [challenge it](https://github.com/jamelna-apps/jamelna-site/issues/new?template=true-cost-challenge.md) — the methodology is public and the changelog is append-only.

## What "true cost" means here

Not a prediction of future prices. Not an accounting of strategic value, option premium, or investor expectations about monopoly economics. A single question:

> *If every input had to be paid for at market rates today, what would this product cost?*

The published subscription price plus the four cost components that investors, cloud providers, and unpriced externalities currently absorb on your behalf.

## The five components

**1. What you pay.** The published subscription or per-seat price. Sourced from vendor pricing pages, published district contracts, and third-party aggregators where vendors do not disclose (SchoolAI Pro is the clearest example of deliberate price opacity).

**2. Compute.** The retail API cost of the queries you send per month, using each vendor's published pricing (OpenAI GPT-4o at $2.50 input / $10 output per 1M tokens; Claude Sonnet 4.5 at $3 / $15; Gemini 2.5 Pro at $1.25 / $10). Retail API pricing — not cost-to-serve — because the thesis is "what you would pay at market rates" rather than "what the provider's raw cost is."

**3. Training amortization.** The cost of training the model, divided by an estimate of its useful lifetime and paying user base. Frontier training costs from [Epoch AI](https://epoch.ai/blog/how-much-does-it-cost-to-train-frontier-ai-models) ($78M for GPT-4 class; $100-500M for more recent frontier models). Amortization is inherently approximate — companies do not publish per-model useful life or per-user attribution — so this line is usually the smallest contributor and the most uncertain.

**4. Energy + water externalities.** Per-query electricity and water use × market rates. We use two bounds: the peer-reviewed [Luccioni et al. FAccT 2024 paper](https://arxiv.org/abs/2311.16863) (0.047 Wh/query lower bound for smaller models), and [Sam Altman's self-reported](https://blog.samaltman.com/the-gentle-singularity) 0.34 Wh/query figure for ChatGPT (unaudited but the most specific vendor disclosure available). Water cost uses [Li et al.'s peer-reviewed study](https://arxiv.org/abs/2304.03271). In dollar terms these externalities are trivial — typically under $0.20/month — but we surface them because aggregate load, not per-user dollars, is the real environmental argument.

**5. Investor subsidy.** The company's annual cash burn or net loss, divided by its paying user base, divided by 12. OpenAI's FY2024 net loss was [$5B ex stock-based compensation](https://fortune.com/2024/09/28/openai-5-billion-loss-2024-revenue-forecasts-fundraising-chapgpt-fee-hikes/) against 11M paying subscribers — yielding $37.88 per paid user per month. Anthropic's FY2024 cash burn was $5.6B against an estimated 3M paying consumer subs — yielding $14-23/month after proportional attribution for Anthropic's 70-75% enterprise revenue mix. Google is a separate case (see Sensitivity).

## What we do not include

- R&D salaries beyond what's captured in training compute costs
- Opportunity cost of invested capital
- Safety and alignment research spending
- Sales, marketing, and customer acquisition costs
- Office, infrastructure, and corporate overhead

We list these explicitly so the page cannot be accused of cherry-picking. Adding them would make the numbers larger, not smaller.

## Assumptions and sensitivity

**Usage varies.** Each product's true cost is calculated at a fixed monthly usage assumption (600 chat queries of ~1,200 tokens each for Pro-tier consumer; 400 for education seats; **5,000 queries × 2,000 tokens for Cursor Pro** to represent the heavy-dev case). Your actual usage can be 10× higher or lower. The assumption is disclosed in each product's YAML for reproducibility.

**Cursor Pro is the most sensitive scenario.** At the power-dev assumption, Anthropic retail compute alone is $78/month against a $20 subscription — a 3.9× gap before anything else. A casual user at 1M tokens/month would see compute under $10. The 10M-token assumption is deliberate: Cursor's own reported AWS costs and the observation that ["Cursor spends 100% of its revenue on Anthropic"](https://www.wheresyoured.at/costs/) make heavy usage the load-bearing case.

**ChatGPT Edu pricing has a huge range.** The calculator uses $12/seat/month as a typical institutional mid-case. The outlier is Cal State University's [$16.9M / 533,000-seat contract](https://laist.com/news/education/chatgpt-california-state-university-csu-ai-deal), which works out to $2.11 per seat per month — below what OpenAI spends on compute alone for those seats. CSU is the clearest public case of "sell below cost to capture the market."

**Google is genuinely different.** Google Cloud is profitable. Alphabet does not disclose a Gemini-specific P&L. The investor subsidy component for Gemini Free and Gemini Advanced is listed as $0 — not because providing the service is free, but because no quotable cash loss exists that can be honestly attributed per user. Alphabet spent roughly $91B on AI infrastructure capex in 2025 and has guided $175-185B for 2026, internally subsidized by Search ad profits. This is surfaced as supplementary context rather than rolled into the counter.

**Wrapper products are modeled with a simplification.** MagicSchool, SchoolAI, Khanmigo, and Cursor all buy API tokens directly from OpenAI or Anthropic, not consumer subscriptions. The calculator stacks them against ChatGPT Plus or Claude Pro via the `wraps:` field as a visible shorthand for "there is an underlying subsidy layer." A fully accurate model would use API-layer reference products; we chose clarity of the stacking visualization over precise attribution.

**The industry counter mixes metrics.** The $10.6B/year figure on the hero sums OpenAI's net loss (excluding stock-based compensation) with Anthropic's cash burn (which includes a one-time data-center prepayment). Mixing concepts. A skeptic could argue comparable operating losses are meaningfully smaller. We surface the caveat here rather than pretend the two numbers are identical.

## Honest caveats

**Primary sources are often paywalled.** The Information's reporting on OpenAI and Anthropic financials is behind a paywall. We cite matching figures from Reuters, Fortune, NYT-derived coverage, and CNBC — but the primary articles themselves were not read directly. Cited as such throughout.

**Nothing is audited.** Neither OpenAI nor Anthropic files public financials. Every company loss figure here comes from leaked investor documents. Education pricing data is partially from third-party aggregators. Wrapper company burn rates are inferred from VC funding totals and estimated runways, not disclosed. When Anthropic or OpenAI publish audited annual figures we will update via the [changelog](../ai-true-cost/changelog).

**"Subsidy" is a framing choice.** These companies burn cash to grow, not because unit economics are structurally broken. Anthropic's gross margins went positive in 2025. OpenAI's paying subscriber base grew from 11M to ~35M in a year. The "subsidy" framing reflects current cash-flow reality, not a claim that any of these products are doomed.

**Subscriber denominators age fast.** We pair 2024 loss figures with 2024 subscriber counts for internal consistency. When 2025 actuals land (expected mid-2026), the numbers will shift — possibly both higher (losses grew) and lower (paying base doubled). Changelog entries will document each revision.

## Found a mistake?

[Open a "Challenge a number" issue](https://github.com/jamelna-apps/jamelna-site/issues/new?template=true-cost-challenge.md) with the specific product, component, current value, and the source you believe is stronger. Corrections land publicly in the changelog.
