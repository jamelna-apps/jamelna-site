'use client';

import React, { useState, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { ScenariosFile, Product, SourcesMap } from '@/lib/ai-true-cost/types';
import { ScenarioGrid } from './ScenarioGrid';
import { ResultView } from './ResultView';

interface CalculatorProps {
  scenarios: ScenariosFile;
  productsById: Record<string, Product>;
  sources: SourcesMap;
}

/**
 * Client-side calculator that combines the ScenarioGrid + ResultView.
 * Syncs selected scenario to the URL via ?scenario= param.
 */
export function Calculator({ scenarios, productsById, sources }: CalculatorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize from URL param if present and valid
  const initialId = searchParams.get('scenario');
  const [selectedId, setSelectedId] = useState<string | null>(
    initialId && productsById[initialId] ? initialId : null
  );

  const handleSelect = useCallback(
    (productId: string) => {
      setSelectedId(productId);

      // Update URL without scrolling
      const params = new URLSearchParams(searchParams.toString());
      params.set('scenario', productId);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const selectedProduct = selectedId ? productsById[selectedId] : null;

  // Resolve wrapped product if the selected one wraps another
  const wrappedProduct =
    selectedProduct?.wraps && productsById[selectedProduct.wraps]
      ? productsById[selectedProduct.wraps]
      : undefined;

  return (
    <div className="space-y-10">
      {/* Scenario picker */}
      <div>
        <h2 className="text-lg font-bold text-white mb-6">Select your AI tool</h2>
        <ScenarioGrid
          scenarios={scenarios}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </div>

      {/* Result view — only shown when a product is selected */}
      {selectedProduct && (
        <div>
          <ResultView
            product={selectedProduct}
            wrapped={wrappedProduct}
            sources={sources}
          />
        </div>
      )}

      {!selectedProduct && (
        <p className="text-text-muted text-sm italic">
          Select an AI tool above to see its true cost breakdown.
        </p>
      )}
    </div>
  );
}
