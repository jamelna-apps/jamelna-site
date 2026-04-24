# AI True Cost — Changelog

This file records every substantive change to the numbers and methodology on this page. We believe public accountability requires a public record.

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
