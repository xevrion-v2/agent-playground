import { describe, it, expect } from 'vitest';
import { infiniteSequence, safeSequence, take } from './sequence';

describe('infiniteSequence', () => {
  it('generates default sequence starting at 0 with step 1', () => {
    const seq = infiniteSequence();
    expect(seq.next().value).toBe(0);
    expect(seq.next().value).toBe(1);
    expect(seq.next().value).toBe(2);
  });

  it('generates sequence with custom start and step', () => {
    const seq = infiniteSequence({ start: 10, step: 5 });
    expect(seq.next().value).toBe(10);
    expect(seq.next().value).toBe(15);
    expect(seq.next().value).toBe(20);
  });

  it('generates negative step sequence', () => {
    const seq = infiniteSequence({ start: 0, step: -1 });
    expect(seq.next().value).toBe(0);
    expect(seq.next().value).toBe(-1);
    expect(seq.next().value).toBe(-2);
  });

  it('works with take() for safe consumption', () => {
    const seq = infiniteSequence({ start: 1, step: 2 });
    const result = take(seq, 4);
    expect(result).toEqual([1, 3, 5, 7]);
  });
});

describe('safeSequence', () => {
  it('generates limited sequence', () => {
    const result = Array.from(safeSequence refSequence({ start: 0, step: 10, limit: 5 }));
    expect(result).toEqual([0, 10, 20, 30, 40]);
  });

  it('respects limit with default step', () => {
    const result = Array.from(safeSequence({ limit: 3 }));
    expect(result).toEqual([0, 1, 2]);
  });

  it('handles limit of 0', () => {
    const result = Array.from(safeSequence({ limit: 0 }));
    expect(result).toEqual([]);
  });
});

describe('take', () => {
  it('takes specified number of elements from iterable', () => {
    const seq = infiniteSequence();
    const result = take(seq, 3);
    expect(result).toEqual([0, 1, 2]);
  });

  it('returns empty array when n is 0', () => {
    const seq = infiniteSequence();
    const result = take(seq, 0);
    expect(result).toEqual([]);
  });

  it('works with finite iterables', () => {
    const result = take(safeSequence({ limit: 5 }), 10);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });
});