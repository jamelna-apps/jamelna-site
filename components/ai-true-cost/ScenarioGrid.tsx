'use client';

import React from 'react';
import type { ScenariosFile } from '@/lib/ai-true-cost/types';

interface ScenarioGridProps {
  scenarios: ScenariosFile;
  selectedId: string | null;
  onSelect: (productId: string) => void;
}

/**
 * Renders scenario groups (free / paid-consumer / education) each with a
 * label heading followed by a responsive grid of scenario buttons.
 * Gracefully handles empty scenario lists.
 */
export function ScenarioGrid({ scenarios, selectedId, onSelect }: ScenarioGridProps) {
  return (
    <div className="space-y-8">
      {scenarios.groups.map((group) => (
        <div key={group.tier}>
          {/* Group heading */}
          <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">
            {group.label}
          </h3>

          {group.scenarios.length === 0 ? (
            <p className="text-sm text-text-muted italic">
              No scenarios yet — content coming in Phase B.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {group.scenarios.map((scenario) => {
                const isActive = scenario.id === selectedId;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    onClick={() => onSelect(scenario.id)}
                    aria-pressed={isActive}
                    className={`
                      text-left px-4 py-3 rounded-lg border text-sm font-medium
                      transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
                      ${isActive
                        ? 'bg-orange-500/10 border-orange-500/60 text-orange-200'
                        : 'bg-canvas-raised border-canvas-border text-text-secondary hover:border-orange-500/30 hover:text-white'
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
