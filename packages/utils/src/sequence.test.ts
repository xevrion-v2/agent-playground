import { describe, it, expect } from 'vitest';
import { createSequence, take } from './sequence';

describe('createSequence', () => {
  it('creates a sequence starting at 0 with step 1 by default', () => {
    const seq = createSequence();
    expect(take(seq, 5)).toEqual([0, 1, 2, 3, 4]);
  });

  it('creates a sequence with custom start', () => {
    const seq = createSequence({ start: 10 });
    expect(take(seq, 3)).toEqual([10, 11, 12]);
  });

  it('creates a sequence with custom step', () => {
    const seq = createSequence({ step: 5 });
    expect(take(seq, 4)).toEqual([0, 5, 10, 15]);
  });

  it('creates a sequence with custom start and step', () => {
    const seq = createSequence({ start: 100, step: -10 });
    expect(take(seq, 5)).toEqual([100, 90, 80, 70, 60]);
  });

  it('supports negative start values', () => {
    const seq = createSequence({ start: -5 });
    expect(take(seq, 3)).toEqual([-5, -4, -3]);
  });

  it('supports decimal step values', () => {
    const seq = createSequence({ start: 0, step: 0.5 });
    expect(take(seq, 4)).toEqual([0, 0.5, 1, 1.5]);
  });

  it('is lazy and generates values on demand', () => {
    const seq = createSequence();
    const iter = seq[Symbol.iterator]();

    expect(iter.next().value).toBe(0);
    expect(iter.next().value).toBe(1);
    expect(iter.next().value).toBe(2);
  });

  it('can be used in for...of with a break condition', () => {
    const seq = createSequence({ start: 5 });
    const results: number[] = [];

    for (const n of seq) {
      if (n > 8) break;
      results.push(n);
    }

    expect(results).toEqual([5, 6, 7, 8]);
  });
});

describe('take', () => {
  it('returns empty array for count of 0', () => {
    const seq = createSequence();
    expect(take(seq, 0)).toEqual([]);
  });

  it('throws for negative count', () => {
    const seq = createSequence();
    expect(() => take(seq, -1)).toThrow(RangeError);
  });

  it('works with finite iterables', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(take(arr, 3)).toEqual([1, 2, 3]);
  });

  it('does not exceed finite iterable length', () => {
    const arr = [1, 2];
    expect(take(arr, 10)).toEqual([1, 2]);
  });
});