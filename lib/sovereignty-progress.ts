const STORAGE_KEY = 'tech-sovereignty-progress';

export interface PathwayProgress {
  [pathwaySlug: string]: {
    completedSteps: string[];
    lastVisited: string;
  };
}

function getProgress(): PathwayProgress {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: PathwayProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function getPathwayProgress(pathwaySlug: string): string[] {
  const progress = getProgress();
  return progress[pathwaySlug]?.completedSteps || [];
}

export function getCompletedCount(pathwaySlug: string): number {
  return getPathwayProgress(pathwaySlug).length;
}

export function isStepCompleted(pathwaySlug: string, stepId: string): boolean {
  const completedSteps = getPathwayProgress(pathwaySlug);
  return completedSteps.includes(stepId);
}

export function toggleStepCompletion(pathwaySlug: string, stepId: string): boolean {
  const progress = getProgress();

  if (!progress[pathwaySlug]) {
    progress[pathwaySlug] = {
      completedSteps: [],
      lastVisited: new Date().toISOString(),
    };
  }

  const completedSteps = progress[pathwaySlug].completedSteps;
  const index = completedSteps.indexOf(stepId);

  if (index === -1) {
    // Mark as completed
    completedSteps.push(stepId);
    progress[pathwaySlug].lastVisited = new Date().toISOString();
    saveProgress(progress);
    return true;
  } else {
    // Unmark as completed
    completedSteps.splice(index, 1);
    saveProgress(progress);
    return false;
  }
}

export function markStepCompleted(pathwaySlug: string, stepId: string): void {
  const progress = getProgress();

  if (!progress[pathwaySlug]) {
    progress[pathwaySlug] = {
      completedSteps: [],
      lastVisited: new Date().toISOString(),
    };
  }

  if (!progress[pathwaySlug].completedSteps.includes(stepId)) {
    progress[pathwaySlug].completedSteps.push(stepId);
    progress[pathwaySlug].lastVisited = new Date().toISOString();
    saveProgress(progress);
  }
}

export function unmarkStepCompleted(pathwaySlug: string, stepId: string): void {
  const progress = getProgress();

  if (!progress[pathwaySlug]) return;

  const index = progress[pathwaySlug].completedSteps.indexOf(stepId);
  if (index !== -1) {
    progress[pathwaySlug].completedSteps.splice(index, 1);
    saveProgress(progress);
  }
}

export function resetPathwayProgress(pathwaySlug: string): void {
  const progress = getProgress();
  delete progress[pathwaySlug];
  saveProgress(progress);
}

export function resetAllProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getAllProgress(): PathwayProgress {
  return getProgress();
}

// Hook for React components
export function usePathwayProgress(pathwaySlug: string) {
  // This is a simple implementation - for real-time updates across tabs,
  // you might want to use a more sophisticated state management solution
  return {
    getCompleted: () => getPathwayProgress(pathwaySlug),
    isCompleted: (stepId: string) => isStepCompleted(pathwaySlug, stepId),
    toggle: (stepId: string) => toggleStepCompletion(pathwaySlug, stepId),
    mark: (stepId: string) => markStepCompleted(pathwaySlug, stepId),
    unmark: (stepId: string) => unmarkStepCompleted(pathwaySlug, stepId),
    reset: () => resetPathwayProgress(pathwaySlug),
    count: () => getCompletedCount(pathwaySlug),
  };
}
