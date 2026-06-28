# AI True Cost — Changelog

This file records every substantive change to the numbers and methodology on this page. We believe public accountability requires a public record.

---

## 2026-06-28 — Refreshed investor-subsidy financials to FY2025 actuals

Updated every `investor_subsidy` component to FY2025 actual figures. Compute, training-amortization, and energy/water components were **not** touched in this pass (compute pricing was already refreshed in the 2026-06-27 entry).

- **OpenAI: $5B (FY2024) → $20.9B operating loss (FY2025)**, on $13.07B revenue (up from an $8.78B operating loss in 2024). The figure uses the **operating loss**, excluding the one-time, non-cash ~$41.55B for-profit-conversion charge that inflates the widely quoted ~$38.5B net loss — consistent with this page's "exclude non-cash items" approach.
- **OpenAI paying base 11M → ~50M; WAU base → ~900M.** Per-paying-user subsidy **$37.88 → $34.83** (ChatGPT Plus and Edu); free-tier per-WAU subsidy **$1.17 → $1.94**; ChatGPT Pro **$50 → $60** (consumer-attributable burn rebased on the $20.9B actual loss).
- **Anthropic: $5.6B (FY2024) → $3.0B cash burn (FY2025)** as the company neared operating profitability. Claude consumer subsidies fell proportionally: **claude-pro $13.89 → $10.42**, **claude-free $3.60 → $2.08**, **Claude Max 5× $18 → $9.64**. Claude Max 20× stays **$54** (its basis already used the $3B 2025 figure, now reworded as actual rather than projected).
- **Industry counter $10.6B/year → $23.9B/year** = $20.9B OpenAI FY2025 operating loss + $3.0B Anthropic FY2025 cash burn.
- **Sources added:** `openai-loss-2025` (Fortune/FT), `anthropic-burn-2025` (The Information/Sacra), `openai-900m-users-2026`.

---

## 2026-06-27 — Refreshed all compute pricing to current models (June 2026)

Re-verified every product's `compute` component against current (June 2026) API rates and current flagship models. Training amortization, energy/water, and investor-subsidy components were **not** re-verified in this pass — only compute model names, arithmetic, and `last_verified` dates changed.

- **OpenAI → gpt-5.5 / gpt-5.5-pro.** gpt-5.5 (chat-latest) is now $5/$30 per 1M (in/out); gpt-5.4 $2.50/$15; gpt-5.4-mini $0.75/$4.50; gpt-5.5-pro (extended reasoning) $30/$180. Replaces the prior GPT-4o / GPT-4o-mini / o1-Pro lineup.
- **Anthropic → Opus 4.8 / Sonnet 4.6 / Haiku 4.5.** Opus repriced to **$5/$25, down sharply from Opus 4.1's $15/$75**. Sonnet 4.6 unchanged at $3/$15; Haiku 4.5 unchanged at $1/$5.
- **Google → Gemini 3.1 Pro** ($2/$12, replacing Gemini 2.5 Pro) and **Gemini 2.5 Flash-Lite** ($0.10/$0.40, replacing Gemini 2.0 Flash on the free tier).
- **Net effect on compute lines.** ChatGPT tools' compute **rose** (gpt-5.5 is pricier than GPT-4o, and gpt-5.5-pro's reasoning tokens are far pricier than o1 — e.g. ChatGPT Pro $126.68 → $363.15; ChatGPT Edu $12.03 → $33.46). Claude Max compute **fell sharply** on the Opus price collapse (Max 5× $51.48 → $28.08; Max 20× $128.70 → $70.20).
- **CSU below-cost gap widened.** ChatGPT Edu modeled compute is now ~$33/seat against the $2.11/seat CSU contract — an even larger "sell below cost" gap than before.
- **Note:** investor-subsidy financials were NOT re-verified in this pass; those figures still carry their April 2026 vintage and denominators.

---

## 2026-04-24 — Phase B content published

All 13 scenarios now ship with real, primary-source-cited cost components. The page is production-ready.

- **Industry subsidy counter live at $10.6B/year** — OpenAI FY2024 $5B net loss (ex stock-based comp) plus Anthropic FY2024 $5.6B cash burn. Google AI excluded because Alphabet's AI activity is cross-subsidized internally and no attributable loss figure exists. Caveats in methodology.
- **Free tier (6 products):** ChatGPT Free, Claude Free, Gemini Free, MagicSchool (teacher), SchoolAI, Khanmigo. Dominant cost component is investor/donor subsidy. Gemini Free shows N/A for subsidy (cross-subsidized by Google ad revenue — see methodology). Khanmigo modeled as a triple-stack (Khan Academy nonprofit + Microsoft Azure in-kind + underlying OpenAI).
- **Paid consumer (4 products):** ChatGPT Plus, Claude Pro, Gemini Advanced, Cursor Pro. Headline finding: Cursor Pro's retail compute ($78/month at power-dev usage) is 3.9× the subscription price before accounting for any other subsidy layer.
- **Education (3 products):** ChatGPT Edu, MagicSchool Plus, SchoolAI Pro. ChatGPT Edu's methodology notes Cal State University's extreme $2.11/seat contract — below OpenAI's own per-seat compute cost.
- **Methodology page published** — full essay covering definitions, the five components, what is excluded, sensitivity and assumptions, and honest caveats.
- **Hero reframed to annual** — "$240/year → $732/year" framing replaces the original illustrative monthly numbers.

Total sources cited: 33 primary and secondary entries across vendor pricing pages, financial reporting (Fortune, CNBC, Reuters, TechCrunch, CNBC, The Information), peer-reviewed research (Luccioni et al., Li et al.), Epoch AI analysis, Alphabet / OpenAI / Anthropic / Khan Academy primary disclosures, and district contract reporting (LAist, EdSource). Every number in the calculator has a `[cite]` affordance pointing to its source.

---

## 2026-04-23 — Initial scaffold (Phase A)

Phase A publication. Engineering complete; cost numbers were placeholder zeros pending Phase B research.

- Routes, calculator, subsidy counter, citation component, wrapper stacking, OG images, share bar, analytics, methodology + changelog pages, i18n scaffold.
- All `cost_components` values initialized to `0` pending Phase B research.
- `annual_industry_subsidy_usd` initialized to `0`.
- `sources.yaml` contained a single placeholder entry.

_Numbers in this version were placeholder. Do not cite Phase A snapshots as factual._
