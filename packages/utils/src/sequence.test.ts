import { describe, it, expect } from 'vitest';
import { createSequence, naturals, take } from './sequence';

describe('createSequence', () => {
  it('generates natural numbers by default', () => {
    const result = [...take(createSequence(), 5)];
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('respects custom start value', () => {
    const result = [...take(createSequence({ start: 10 }), 3)];
    expect(result).toEqual([10, 11, 12]);
  });

  it('respects custom step value', () => {
    const result = [...take(createSequence({ start: 0, step: 5 }), 4)];
    expect(result).toEqual([0, 5, 10, 15]);
  });

  it('handles negative step', () => {
    const result = [...take(createSequence({ start: 10, step: -2 }), 3)];
    expect(result).toEqual([10, 8, 6]);
  });

  it('handles decimal step', () => {
    const result = [...take(createSequence({ start: 0, step: 0.5 }), 4)];
    expect(result).toEqual([0, 0.5, 1, 1.5]);
  });
});

describe('naturals', () => {
  it('generates 1, 2, 3, ...', () => {
    const result = [...take(naturals(), 5)];
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('take', () => {
  it('takes specified number of elements', () => {
    const seq = createSequence();
    const result = [...take(seq, 3)];
    expect(result).toEqual([1, 2, 3]);
  });

  it('returns empty for count of 0', () => {
    const result = [...take(naturals(), 0)];
    expect(result).toEqual([]);
  });

  it('throws on negative count', () => {
    expect(() => [...take(naturals(), -1)]).toThrow(RangeError);
  });

  it('works with finite iterables', () => {
    const result = [...take([1, 2, 3, 4, 5], 3)];
    expect(result).toEqual([1, 2, 3]);
  });

  it('does not over-consume from finite iterables', () => {
    const arr = [1, 2, 3];
    const iter = take(arr, 10);
    const result = [...iter];
    expect(result).toEqual([1, 2, 3]);
  });
});