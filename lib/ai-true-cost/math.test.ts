import { describe, it, expect } from 'vitest';
import { computeBreakdown, stackWrapper } from './math';
import type { Product } from './types';

function makePaidProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 'test-paid',
    name: 'Test Paid Product',
    vendor: 'Test Vendor',
    tier: 'paid-consumer',
    price_paid_usd: 20.00,
    price_unit: 'monthly',
    assumed_usage: {
      queries_per_month: 600,
      avg_input_tokens: 800,
      avg_output_tokens: 400,
      primary_model: 'test-model',
    },
    cost_components: {
      compute: { value_usd: 50.00, sources: [] },
      training_amortization: { value_usd: 30.00, sources: [] },
      energy_water: { value_usd: 10.00, sources: [] },
      investor_subsidy: { value_usd: 40.00, sources: [] },
    },
    last_verified: '2026-04-23',
    ...overrides,
  };
}

describe('computeBreakdown', () => {
  it('sums the four cost components into true_cost_usd', () => {
    const product = makePaidProduct();
    const breakdown = computeBreakdown(product);
    // 50 + 30 + 10 + 40 = 130
    expect(breakdown.true_cost_usd).toBe(130.00);
  });

  it('computes subsidy_usd as true_cost_usd minus price_paid_usd', () => {
    const product = makePaidProduct();
    const breakdown = computeBreakdown(product);
    // 130 - 20 = 110
    expect(breakdown.subsidy_usd).toBe(110.00);
  });

  it('computes subsidy_multiple as true_cost_usd / price_paid_usd', () => {
    const product = makePaidProduct();
    const breakdown = computeBreakdown(product);
    // 130 / 20 = 6.5
    expect(breakdown.subsidy_multiple).toBe(6.50);
  });

  it('includes individual component values in result', () => {
    const product = makePaidProduct();
    const breakdown = computeBreakdown(product);
    expect(breakdown.compute_usd).toBe(50.00);
    expect(breakdown.training_amortization_usd).toBe(30.00);
    expect(breakdown.energy_water_usd).toBe(10.00);
    expect(breakdown.investor_subsidy_usd).toBe(40.00);
  });

  it('rounds all USD values to 2 decimal places', () => {
    const product = makePaidProduct({
      cost_components: {
        compute: { value_usd: 33.333, sources: [] },
        training_amortization: { value_usd: 11.111, sources: [] },
        energy_water: { value_usd: 5.555, sources: [] },
        investor_subsidy: { value_usd: 7.777, sources: [] },
      },
    });
    const breakdown = computeBreakdown(product);
    // Each value should be rounded to 2 decimals
    expect(breakdown.compute_usd).toBe(33.33);
    expect(breakdown.training_amortization_usd).toBe(11.11);
    expect(breakdown.energy_water_usd).toBe(5.56);
    expect(breakdown.investor_subsidy_usd).toBe(7.78);
    expect(breakdown.true_cost_usd).toBe(57.78);
  });

  it('handles free tier (price=0) without divide-by-zero', () => {
    const product = makePaidProduct({
      tier: 'free',
      price_paid_usd: 0,
    });
    const breakdown = computeBreakdown(product);
    expect(breakdown.true_cost_usd).toBe(130.00);
    expect(breakdown.subsidy_usd).toBe(130.00);
    // subsidy_multiple uses Math.max(price, 0.01) as denominator
    // 130 / 0.01 = 13000
    expect(breakdown.subsidy_multiple).toBe(13000.00);
    expect(Number.isFinite(breakdown.subsidy_multiple)).toBe(true);
  });

  it('handles missing cost components as 0', () => {
    const product = makePaidProduct({
      cost_components: {
        compute: { value_usd: 50.00, sources: [] },
        // training_amortization, energy_water, investor_subsidy missing
      },
    });
    const breakdown = computeBreakdown(product);
    expect(breakdown.true_cost_usd).toBe(50.00);
    expect(breakdown.training_amortization_usd).toBe(0);
    expect(breakdown.energy_water_usd).toBe(0);
    expect(breakdown.investor_subsidy_usd).toBe(0);
  });
});

describe('stackWrapper', () => {
  it('returns combined true_cost_usd for wrapper + wrapped', () => {
    const wrapper = makePaidProduct({ id: 'wrapper', price_paid_usd: 20 });
    const wrapped = makePaidProduct({ id: 'wrapped', price_paid_usd: 0, tier: 'free' });
    const wrapperBreakdown = computeBreakdown(wrapper);
    const wrappedBreakdown = computeBreakdown(wrapped);
    const stacked = stackWrapper(wrapperBreakdown, wrappedBreakdown);
    expect(stacked.true_cost_usd).toBe(
      Math.round((wrapperBreakdown.true_cost_usd + wrappedBreakdown.true_cost_usd) * 100) / 100
    );
  });

  it('returns combined subsidy_usd', () => {
    const wrapper = makePaidProduct({ id: 'wrapper' });
    const wrapped = makePaidProduct({ id: 'wrapped', price_paid_usd: 5, tier: 'free' });
    const wrapperBreakdown = computeBreakdown(wrapper);
    const wrappedBreakdown = computeBreakdown(wrapped);
    const stacked = stackWrapper(wrapperBreakdown, wrappedBreakdown);
    expect(stacked.subsidy_usd).toBe(
      Math.round((wrapperBreakdown.subsidy_usd + wrappedBreakdown.subsidy_usd) * 100) / 100
    );
  });

  it('includes layers array with wrapper first, then wrapped', () => {
    const wrapper = makePaidProduct({ id: 'wrapper' });
    const wrapped = makePaidProduct({ id: 'wrapped' });
    const wrapperBreakdown = computeBreakdown(wrapper);
    const wrappedBreakdown = computeBreakdown(wrapped);
    const stacked = stackWrapper(wrapperBreakdown, wrappedBreakdown);
    expect(stacked.layers).toHaveLength(2);
    expect(stacked.layers[0]).toEqual(wrapperBreakdown);
    expect(stacked.layers[1]).toEqual(wrappedBreakdown);
  });
});
