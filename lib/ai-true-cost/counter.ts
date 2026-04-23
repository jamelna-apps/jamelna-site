/** Seconds in a Julian year (365.25 days × 24 × 60 × 60) */
export const SECONDS_PER_YEAR = 31_557_600;

/**
 * Compute the per-second subsidy rate from an annual total.
 */
export function subsidyPerSecond(annualSubsidyUsd: number): number {
  return annualSubsidyUsd / SECONDS_PER_YEAR;
}

/**
 * Compute the total subsidy accrued since a page load or reference point.
 * @param annualSubsidyUsd - The annual industry subsidy in USD
 * @param elapsedSeconds - How many seconds have elapsed since the counter started
 */
export function subsidySince(
  annualSubsidyUsd: number,
  elapsedSeconds: number
): number {
  return subsidyPerSecond(annualSubsidyUsd) * elapsedSeconds;
}
