/** Tier classification for AI products */
export type Tier = 'free' | 'paid-consumer' | 'education';

/** Keys for the four cost components beyond the price paid */
export type ComponentKey =
  | 'compute'
  | 'training_amortization'
  | 'energy_water'
  | 'investor_subsidy';

/** A single citable source */
export interface Source {
  title: string;
  author: string;
  url: string;
  accessed: string;
  pull_quote: string;
}

/** A map of source IDs to Source objects (from sources.yaml) */
export type SourcesMap = Record<string, Source>;

/** A single cost component with its USD value, optional basis, and source IDs */
export interface CostComponent {
  value_usd: number;
  basis?: string;
  sources: string[];
}

/** Assumed usage parameters used in cost calculations */
export interface AssumedUsage {
  queries_per_month: number;
  avg_input_tokens: number;
  avg_output_tokens: number;
  primary_model: string;
}

/** A product (AI tool) with full cost breakdown data */
export interface Product {
  id: string;
  name: string;
  vendor: string;
  tier: Tier;
  price_paid_usd: number;
  price_unit: 'monthly' | 'annual' | 'per-query';
  assumed_usage: AssumedUsage;
  cost_components: Partial<Record<ComponentKey, CostComponent>>;
  last_verified: string;
  /** Optional: ID of a product this one wraps (e.g. MagicSchool wraps OpenAI) */
  wraps?: string;
}

/** A single scenario entry in scenarios.yaml */
export interface Scenario {
  id: string;
  name: string;
  tier: Tier;
}

/** The full scenarios.yaml structure */
export interface ScenariosFile {
  groups: Array<{
    tier: Tier;
    label: string;
    scenarios: Scenario[];
  }>;
}

/** The subsidy-constants.yaml structure */
export interface SubsidyConstants {
  annual_industry_subsidy_usd: number;
  last_verified: string;
  sources: string[];
  notes: string;
}
