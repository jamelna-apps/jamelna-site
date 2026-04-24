'use client';

import React from 'react';
import type { ScenariosFile } from '@/lib/ai-true-cost/types';

interface ScenarioGridProps {
  scenarios: ScenariosFile;
  selectedId: string | null;
  onSelect: (productId: string) => void;
}

/**
 * Renders scenario groups (free / paid-consumer / developer-tools / education)
 * each with a label heading followed by a responsive grid of scenario buttons.
 */
export function ScenarioGrid({ scenarios, selectedId, onSelect }: ScenarioGridProps) {
  return (
    <div className="space-y-12">
      {scenarios.groups.map((group) => (
        <div key={group.tier}>
          {/* Group heading */}
          <h3 className="text-base font-semibold text-white mb-5 pb-2 border-b border-canvas-border">
            {group.label}
          </h3>

          {group.scenarios.length === 0 ? (
            <p className="text-sm text-text-muted italic">
              No scenarios yet — content coming in Phase B.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {group.scenarios.map((scenario) => {
                const isActive = scenario.id === selectedId;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    onClick={() => onSelect(scenario.id)}
                    aria-pressed={isActive}
                    className={`
                      text-left px-5 py-4 rounded-xl border text-base font-medium leading-snug
                      transition-all duration-150
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
                      ${isActive
                        ? 'bg-orange-500/15 border-orange-500 text-orange-200 shadow-lg shadow-orange-500/10'
                        : 'bg-canvas-raised border-canvas-border text-text-secondary hover:border-orange-500/40 hover:bg-canvas-raised/60 hover:text-white'
                      }
                    `}
                  >
                    {scenario.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
