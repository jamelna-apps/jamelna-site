import { describe, it, expect } from 'vitest';
import path from 'path';
import {
  loadSources,
  loadProduct,
  loadAllProducts,
  resolveCitations,
} from './loader';

const fixturesDir = path.resolve(__dirname, '__fixtures__');
const sourcesFile = path.join(fixturesDir, 'sources.yaml');
const productsDir = path.join(fixturesDir, 'products');

describe('loadSources', () => {
  it('loads a sources YAML file and returns a SourcesMap', async () => {
    const sources = await loadSources(sourcesFile);
    expect(sources).toHaveProperty('test-source-1');
    expect(sources['test-source-1'].title).toBe('Test Source One');
    expect(sources['test-source-1'].author).toBe('Test Author');
    expect(sources['test-source-1'].url).toBe('https://example.com/test-source-1');
    expect(sources['test-source-1'].accessed).toBe('2026-04-23');
    expect(sources['test-source-1'].pull_quote).toContain('source one');
  });

  it('returns all source entries', async () => {
    const sources = await loadSources(sourcesFile);
    expect(Object.keys(sources)).toHaveLength(2);
    expect(sources).toHaveProperty('test-source-2');
  });
});

describe('loadProduct', () => {
  it('loads a product YAML file and returns a Product', async () => {
    const product = await loadProduct(path.join(productsDir, 'test-product.yaml'));
    expect(product.id).toBe('test-product');
    expect(product.name).toBe('Test Product');
    expect(product.vendor).toBe('Test Vendor');
    expect(product.tier).toBe('paid-consumer');
    expect(product.price_paid_usd).toBe(20.00);
    expect(product.price_unit).toBe('monthly');
  });

  it('returns assumed_usage fields', async () => {
    const product = await loadProduct(path.join(productsDir, 'test-product.yaml'));
    expect(product.assumed_usage.queries_per_month).toBe(600);
    expect(product.assumed_usage.avg_input_tokens).toBe(800);
    expect(product.assumed_usage.avg_output_tokens).toBe(400);
    expect(product.assumed_usage.primary_model).toBe('test-model');
  });

  it('returns cost_components', async () => {
    const product = await loadProduct(path.join(productsDir, 'test-product.yaml'));
    expect(product.cost_components.compute?.value_usd).toBe(50.00);
    expect(product.cost_components.training_amortization?.value_usd).toBe(30.00);
    expect(product.cost_components.energy_water?.value_usd).toBe(10.00);
    expect(product.cost_components.investor_subsidy?.value_usd).toBe(40.00);
  });

  it('throws when file does not exist', async () => {
    await expect(
      loadProduct(path.join(productsDir, 'nonexistent.yaml'))
    ).rejects.toThrow();
  });
});

describe('loadAllProducts', () => {
  it('loads all product files in a directory', async () => {
    const products = await loadAllProducts(productsDir);
    expect(products).toHaveLength(1);
    expect(products[0].id).toBe('test-product');
  });

  it('returns an array of Product objects', async () => {
    const products = await loadAllProducts(productsDir);
    for (const product of products) {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('cost_components');
    }
  });
});

describe('resolveCitations', () => {
  it('resolves source IDs to Source objects', async () => {
    const sources = await loadSources(sourcesFile);
    const ids = ['test-source-1', 'test-source-2'];
    const resolved = resolveCitations(ids, sources);
    expect(resolved).toHaveLength(2);
    expect(resolved[0].title).toBe('Test Source One');
    expect(resolved[1].title).toBe('Test Source Two');
  });

  it('throws when a source ID is unknown', async () => {
    const sources = await loadSources(sourcesFile);
    expect(() =>
      resolveCitations(['unknown-id'], sources)
    ).toThrow(/unknown-id/);
  });

  it('handles empty array without error', async () => {
    const sources = await loadSources(sourcesFile);
    const resolved = resolveCitations([], sources);
    expect(resolved).toHaveLength(0);
  });
});
