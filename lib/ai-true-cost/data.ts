import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs/promises';
import type { Product, SourcesMap, ScenariosFile, SubsidyConstants } from './types';
import { loadSources, loadAllProducts } from './loader';

export interface TrueCostData {
  sources: SourcesMap;
  products: Product[];
  scenarios: ScenariosFile;
  subsidyConstants: SubsidyConstants;
}

/** Module-level cache so the data is only loaded once per process */
let cache: TrueCostData | null = null;

/**
 * Load all AI true cost content from the content directory.
 * Results are cached at module level for subsequent calls.
 */
export async function getTrueCostData(): Promise<TrueCostData> {
  if (cache) return cache;

  const contentDir = path.join(process.cwd(), 'content', 'ai-true-cost');

  const [sources, products, scenariosRaw, subsidyRaw] = await Promise.all([
    loadSources(path.join(contentDir, 'sources.yaml')),
    loadAllProducts(path.join(contentDir, 'products')),
    fs.readFile(path.join(contentDir, 'scenarios.yaml'), 'utf-8'),
    fs.readFile(path.join(contentDir, 'subsidy-constants.yaml'), 'utf-8'),
  ]);

  const scenarios = yaml.load(scenariosRaw) as ScenariosFile;
  const subsidyConstants = yaml.load(subsidyRaw) as SubsidyConstants;

  cache = { sources, products, scenarios, subsidyConstants };
  return cache;
}

/** Clear the module-level cache (useful in tests or after content updates) */
export function clearTrueCostCache(): void {
  cache = null;
}
