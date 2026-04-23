import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import type { Product, Source, SourcesMap } from './types';

/**
 * Coerce a value that may be a Date object (from js-yaml unquoted ISO-8601)
 * or a string into a YYYY-MM-DD string.
 */
function coerceDate(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

/**
 * Load the sources YAML file and return a SourcesMap.
 * Normalizes any Date objects in `accessed` fields to ISO date strings.
 */
export async function loadSources(filePath: string): Promise<SourcesMap> {
  const raw = await fs.readFile(filePath, 'utf-8');
  const parsed = yaml.load(raw) as SourcesMap;
  for (const id of Object.keys(parsed)) {
    const source = parsed[id] as Source;
    source.accessed = coerceDate(source.accessed);
  }
  return parsed;
}

/**
 * Load a single product YAML file and return a Product.
 * Throws if the file does not exist, if a required field is missing,
 * or if date fields are coerced from Date objects.
 */
export async function loadProduct(filePath: string): Promise<Product> {
  const raw = await fs.readFile(filePath, 'utf-8');
  const parsed = yaml.load(raw) as Product;

  // Validate required fields
  const requiredFields = ['id', 'name', 'tier', 'price_paid_usd'] as const;
  for (const field of requiredFields) {
    if (parsed[field] === undefined || parsed[field] === null) {
      throw new Error(
        `Missing required field '${field}' in ${path.basename(filePath)}`
      );
    }
  }

  // Normalize last_verified to ISO date string
  if (parsed.last_verified !== undefined) {
    parsed.last_verified = coerceDate(parsed.last_verified);
  }

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
