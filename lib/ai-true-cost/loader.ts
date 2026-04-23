import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import type { Product, Source, SourcesMap } from './types';

/**
 * Load the sources YAML file and return a SourcesMap.
 */
export async function loadSources(filePath: string): Promise<SourcesMap> {
  const raw = await fs.readFile(filePath, 'utf-8');
  const parsed = yaml.load(raw) as SourcesMap;
  return parsed;
}

/**
 * Load a single product YAML file and return a Product.
 * Throws if the file does not exist.
 */
export async function loadProduct(filePath: string): Promise<Product> {
  const raw = await fs.readFile(filePath, 'utf-8');
  const parsed = yaml.load(raw) as Product;
  return parsed;
}

/**
 * Load all product YAML files from a directory.
 * Returns an array of Product objects.
 */
export async function loadAllProducts(dir: string): Promise<Product[]> {
  const entries = await fs.readdir(dir);
  const yamlFiles = entries.filter(
    (f) => f.endsWith('.yaml') || f.endsWith('.yml')
  );
  const products = await Promise.all(
    yamlFiles.map((f) => loadProduct(path.join(dir, f)))
  );
  return products;
}

/**
 * Resolve an array of source IDs to Source objects using the provided SourcesMap.
 * Throws if any ID is not found in the map.
 */
export function resolveCitations(ids: string[], sources: SourcesMap): Source[] {
  return ids.map((id) => {
    const source = sources[id];
    if (!source) {
      throw new Error(`Unknown source ID: "${id}"`);
    }
    return source;
  });
}
