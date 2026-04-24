import type { Product } from './types';

/** The computed breakdown of a single product's costs */
export interface Breakdown {
  price_paid_usd: number;
  compute_usd: number;
  training_amortization_usd: number;
  energy_water_usd: number;
  investor_subsidy_usd: number;
  true_cost_usd: number;
  subsidy_usd: number;
  subsidy_multiple: number;
}

/** The stacked result when a wrapper product wraps an underlying product */
export interface StackedBreakdown {
  true_cost_usd: number;
  subsidy_usd: number;
  layers: [Breakdown, Breakdown];
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Compute the full cost breakdown for a product.
 * Missing components default to 0.
 * Uses Math.max(price, 0.01) as denominator for subsidy_multiple
 * to avoid divide-by-zero on free tiers.
 */
export function computeBreakdown(product: Product): Breakdown {
  const { cost_components, price_paid_usd } = product;

  const compute_usd = round2(cost_components.compute?.value_usd ?? 0);
  const training_amortization_usd = round2(cost_components.training_amortization?.value_usd ?? 0);
  const energy_water_usd = round2(cost_components.energy_water?.value_usd ?? 0);
  const investor_subsidy_usd = round2(cost_components.investor_subsidy?.value_usd ?? 0);

  const true_cost_usd = round2(
    compute_usd + training_amortization_usd + energy_water_usd + investor_subsidy_usd
  );
  const price = round2(price_paid_usd);
  const subsidy_usd = round2(true_cost_usd - price);
  const subsidy_multiple = round2(true_cost_usd / Math.max(price, 0.01));

  return {
    price_paid_usd: price,
    compute_usd,
    training_amortization_usd,
    energy_water_usd,
    investor_subsidy_usd,
    true_cost_usd,
    subsidy_usd,
    subsidy_multiple,
  };
}

/**
 * Stack a wrapper product's breakdown on top of a wrapped product's breakdown.
 * Returns combined true_cost_usd, subsidy_usd, and both layers.
 */
export function stackWrapper(wrapper: Breakdown, wrapped: Breakdown): StackedBreakdown {
  return {
    true_cost_usd: round2(wrapper.true_cost_usd + wrapped.true_cost_usd),
    subsidy_usd: round2(wrapper.subsidy_usd + wrapped.subsidy_usd),
    layers: [wrapper, wrapped],
  };
}
