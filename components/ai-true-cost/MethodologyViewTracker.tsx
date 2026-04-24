'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/analytics/tracker';

/**
 * Fires a methodology_viewed analytics event once on mount.
 * Drop this into the methodology page as a thin client island.
 */
export function MethodologyViewTracker() {
  useEffect(() => {
    trackEvent('jamelna', 'methodology_viewed');
  }, []);

  return null;
}
