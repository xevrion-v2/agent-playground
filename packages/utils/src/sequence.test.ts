import { describe, it, expect } from 'vitest';
import { natur, iterate } from './sequence';

describe('infinite sequence utilities', () => {
  describe('natur', () => {
    it('generates natural numbers with default options', () => {
      const result = [...natur(1, 1, { maxIterations: 5 })];
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('generates sequence with custom start and step', () => {
      const result = [...natur(10, 2, { maxIterations: 4 })];
      expect(result).toEqual([10, 12, 14, 16]);
    });

    it('respects maxIterations safety limit', () => {
      const result = [...natur(1, 1, { maxIterations: 3 })];
      expect(result).toHaveLength(3);
    });

    it('defaults to safe iteration limit when not specified', () => {
      const gen = natur();
      let count = 0;
      for (const _ of gen) {
        count++;
        if (count >= 100) break; // Manual break for test
      }
      expect(count).toBe(100);
    });
  });

  describe('iterate', () => {
    it('generates sequence with custom function', () => {
      let val = 1;
      const result = [...iterate(() => {
        val *= 2;
        return val;
      }, undefined, { maxIterations: 5 })];
      expect(result).toEqual([2, 4, 8, 16, 32]);
    });

    it('passes previous value to generator function', () => {
      const result = [...iterate((prev) => {
        return (prev ?? 0) + 1;
      }, 0, { maxIterations: 5 })];
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('respects maxIterations safety limit', () => {
      let count = 0;
      const gen = iterate(() => {
        count++;
        return count;
      }, undefined, { maxIterations: 3 });
      
      const result = [...gen];
      expect(result).toHaveLength(3);
    });
  });
});