import { describe, it, expect } from 'vitest';
import { SECONDS_PER_YEAR, subsidyPerSecond, subsidySince } from './counter';

describe('SECONDS_PER_YEAR', () => {
  it('equals 31_557_600', () => {
    expect(SECONDS_PER_YEAR).toBe(31_557_600);
  });
});

describe('subsidyPerSecond', () => {
  it('divides annual subsidy by seconds per year', () => {
    const annual = 31_557_600; // 1 per second
    expect(subsidyPerSecond(annual)).toBeCloseTo(1, 10);
  });

  it('returns 0 for annual of 0', () => {
    expect(subsidyPerSecond(0)).toBe(0);
  });

  it('returns correct rate for a realistic annual value', () => {
    const annual = 10_000_000_000; // $10B
    const expected = 10_000_000_000 / 31_557_600;
    expect(subsidyPerSecond(annual)).toBeCloseTo(expected, 6);
  });
});

describe('subsidySince', () => {
  it('returns 0 when elapsed is 0', () => {
    expect(subsidySince(1_000_000, 0)).toBe(0);
  });

  it('returns correct amount for 1 second elapsed', () => {
    const annual = 31_557_600; // 1 per second
    expect(subsidySince(annual, 1)).toBeCloseTo(1, 10);
  });

  it('returns correct amount for 60 seconds elapsed', () => {
    const annual = 31_557_600; // 1 per second
    expect(subsidySince(annual, 60)).toBeCloseTo(60, 10);
  });

  it('scales linearly with elapsed time', () => {
    const annual = 1_000_000;
    const one = subsidySince(annual, 1);
    const ten = subsidySince(annual, 10);
    expect(ten).toBeCloseTo(one * 10, 6);
  });

  it('is the product of subsidyPerSecond and elapsedSeconds', () => {
    const annual = 5_000_000_000;
    const elapsed = 3723; // 1 hour 2 min 3 sec
    expect(subsidySince(annual, elapsed)).toBeCloseTo(
      subsidyPerSecond(annual) * elapsed,
      6
    );
  });
});
