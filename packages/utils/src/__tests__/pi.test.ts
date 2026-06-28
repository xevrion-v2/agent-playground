import { describe, it, expect } from 'vitest';
import { piLeibniz, piBBP, piMonteCarlo } from '../pi';

describe('piLeibniz', () => {
  it('should approximate PI within 0.01 with 10000 terms', () => {
    const result = piLeibniz(10000);
    expect(Math.abs(result - Math.PI)).toBeLessThan(0.01);
  });

  it('should improve accuracy with more terms', () => {
    const low = piLeibniz(100);
    const high = piLeibniz(100000);
    expect(Math.abs(high - Math.PI)).toBeLessThan(
      Math.abs(low - Math.PI),
    );
  });

  it('should return a finite number', () => {
    const result = piLeibniz(1000);
    expect(Number.isFinite(result)).toBe(true);
  });

  it('should be close to 3.14 with 1M terms', () => {
    const result = piLeibniz(1_000_000);
    expect(result).toBeGreaterThan(3.14);
    expect(result).toBeLessThan(3.15);
  });
});

describe('piBBP', () => {
  it('should be extremely accurate with 10 iterations', () => {
    const result = piBBP(10);
    expect(Math.abs(result - Math.PI)).toBeLessThan(1e-10);
  });

  it('should converge quickly', () => {
    const r7 = piBBP(7);
    const r10 = piBBP(10);
    // 10 iterations should be more precise than 7
    expect(Math.abs(r10 - Math.PI)).toBeLessThanOrEqual(
      Math.abs(r7 - Math.PI),
    );
  });

  it('should return a finite number', () => {
    expect(Number.isFinite(piBBP(1))).toBe(true);
  });

  it('should work with 0 iterations', () => {
    // At k=0: 4/1 - 2/4 - 1/5 - 1/6 = 4 - 0.5 - 0.2 - 0.166... = 3.1333...
    const result = piBBP(1);
    expect(result).toBeGreaterThan(3.1);
    expect(result).toBeLessThan(3.2);
  });
});

describe('piMonteCarlo', () => {
  it('should approximate PI within 0.1 with 100000 samples', () => {
    const result = piMonteCarlo(100000);
    expect(Math.abs(result - Math.PI)).toBeLessThan(0.1);
  });

  it('should return a finite number', () => {
    expect(Number.isFinite(piMonteCarlo(1000))).toBe(true);
  });

  it('should be between 2 and 4', () => {
    const result = piMonteCarlo(50000);
    expect(result).toBeGreaterThan(2);
    expect(result).toBeLessThan(4);
  });
});
