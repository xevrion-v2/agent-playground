import { describe, it, expect } from 'vitest';
import { InfiniteSequence, naturalNumbers, repeat, generate } from '../src/infiniteSequence';

describe('InfiniteSequence', () => {
  describe('basic iteration', () => {
    it('should generate a sequence based on previous value', () => {
      const seq = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1);
      const result = seq.take(5);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle non-numeric sequences', () => {
      const seq = new InfiniteSequence<string>((prev) => {
        const next = prev ? parseInt(prev) + 1 : 1;
        return `Item ${next}`;
      });
      const result = seq.take(3);
      expect(result).toEqual(['Item 1', 'Item 2', 'Item 3']);
    });

    it('should throw on negative take count', () => {
      const seq = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1);
      expect(() => seq.take(-1)).toThrow('Count must be non-negative');
    });

    it('should return empty array for take(0)', () => {
      const seq = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1);
      expect(seq.take(0)).toEqual([]);
    });
  });

  describe('safety limits', () => {
    it('should throw when exceeding maxIterations with for...of', () => {
      const seq = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1, {
        maxIterations: 3,
      });
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _ of seq) {
          // This should throw after 3 iterations
        }
      }).toThrow('Reached maximum iteration limit');
    });

    it('should not throw when throwOnLimit is false', () => {
      const seq = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1, {
        maxIterations: 3,
        throwOnLimit: false,
      });
      const values: number[] = [];
      for (const val of seq) {
        values.push(val);
        if (values.length >= 5) break;
      }
      // Should have stopped at 3 due to limit
      expect(values).toEqual([1, 2, 3]);
    });

    it('should use default maxIterations of 1,000,000', () => {
      const seq = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1);
      expect((seq as any).options.maxIterations).toBe(1_000_000);
    });
  });

  describe('map', () => {
    it('should transform values', () => {
      const seq = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1);
      const doubled = seq.map((x) => x * 2);
      expect(doubled.take(4)).toEqual([2, 4, 6, 8]);
    });

    it('should preserve the sequence order', () => {
      const seq = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1);
      const mapped = seq.map((x, i) => `${i}: ${x}`);
      expect(mapped.take(3)).toEqual(['0: 1', '1: 2', '2: 3']);
    });
  });

  describe('filter', () => {
    it('should filter values based on predicate', () => {
      const seq = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1);
      const evens = seq.filter((x) => x % 2 === 0);
      expect(evens.take(4)).toEqual([2, 4, 6, 8]);
    });

    it('should handle filter with index', () => {
      const seq = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1);
      const firstThree = seq.filter((_, i) => i < 3);
      expect(firstThree.take(5)).toEqual([1, 2, 3]);
    });
  });
});

describe('helper functions', () => {
  describe('naturalNumbers', () => {
    it('should generate natural numbers starting from 1', () => {
      const nums = naturalNumbers();
      expect(nums.take(5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should accept options', () => {
      const nums = naturalNumbers({ maxIterations: 10 });
      expect(nums.take(3)).toEqual([1, 2, 3]);
    });
  });

  describe('repeat', () => {
    it('should repeat the same value', () => {
      const ones = repeat(1);
      expect(ones.take(4)).toEqual([1, 1, 1, 1]);
    });

    it('should work with objects', () => {
      const obj = { a: 1 };
      const seq = repeat(obj);
      const result = seq.take(2);
      expect(result[0]).toBe(obj);
      expect(result[1]).toBe(obj);
    });
  });

  describe('generate', () => {
    it('should generate values based on index', () => {
      const squares = generate((i) => (i + 1) ** 2);
      expect(squares.take(4)).toEqual([1, 4, 9, 16]);
    });

    it('should start from index 0', () => {
      const seq = generate((i) => i);
      expect(seq.take(3)).toEqual([0, 1, 2]);
    });
  });
});
