import { describe, it, expect } from 'vitest';
import { infiniteSequence, take, range } from './sequence';

describe('infiniteSequence', () => {
  it('generates sequential numbers starting from 0 by default', () => {
    const seq = infiniteSequence();
    expect(seq.next().value).toBe(0);
    expect(seq.next().value).toBe(1);
    expect(seq.next().value).toBe(2);
  });

  it('respects custom start value', () => {
    const seq = infiniteSequence({ start: 100 });
    expect(seq.next().value).toBe(100);
    expect(seq.next().value).toBe(101);
  });

  it('respects custom step value', () => {
    const seq = infiniteSequence({, step: 5 });
    expect(seq.next().value).toBe(0);
    expect(seq.next().value).toBe(5);
    expect(seq.next().value).toBe(10);
  });

  it('combines start and step options', () => {
    const seq = infiniteSequence({ start: 10, step: -2 });
    expect(seq.next().value).toBe(10);
    expect(seq.next().value).toBe(8);
    expect(seq.next().value).toBe(6);
  });

  it('throws when maxIterations is exceeded', () => {
    const seq = infiniteSequence({ maxIterations: 5 });
    seq.next(); // 0
    seq.next(); // 1
    seq.next(); // 2
    seq.next(); // 3
    seq.next(); // 4
    expect(() => seq.next()).toThrow('exceeded safe iteration limit');
  });
});

describe('take', () => {
  it('takes specified number of elements from infinite sequence', () => {
    const result = take(infiniteSequence(), 5);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it('returns empty array for n=0', () => {
    const result = take(infiniteSequence(), 0);
    expect(result).toEqual([]);
  });

  it('throws for negative n', () => {
    expect(() => take(infiniteSequence(), -1)).toThrow('negative number');
  });
});

describe('range', () => {
  it('generates range from start to end', () => {
    expect([...range(0, 5)]).toEqual([0, 1, 2, 3, 4]);
  });

  it('generates range with custom step', () => {
    expect([...range(0, 10, 2)]).toEqual([0, 2, 4, 6, 8]);
  });

  it('generates empty range when start >= end', () => {
    expect([...range(5, 5)]).toEqual([]);
    expect([...range(10, 5)]).toEqual([]);
  });

  it('throws for zero step', () => {
    expect(() => [...range(0, 5, 0)]).toThrow('Step cannot be zero');
  });
});