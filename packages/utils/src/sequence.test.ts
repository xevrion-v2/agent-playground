import { describe, it, expect } from 'vitest';
import { createSequence, take, range } from './sequence';

describe('createSequence', () => {
  it('generates default sequence starting at 0 with step 1', () => {
    const seq = createSequence();
    expect(seq.next().value).toBe(0);
    expect(seq.next().value).toBe(1);
    expect(seq.next().value).toBe(2);
  });

  it('generates sequence with custom start', () => {
    const seq = createSequence({ start: 10 });
    expect(seq.next().value).toBe(10);
    expect(seq.next().value).toBe(11);
  });

  it('generates sequence with custom step', () => {
    const seq = createSequence({ step: 5 });
    expect(seq.next().value).toBe(0);
    expect(seq.next().value).toBe(5);
    expect(seq.next().value).toBe(10);
  });

  it('generates sequence with custom start and step', () => {
    const seq = createSequence({ start: 3, step: 2 });
    expect(seq.next().value).toBe(3);
    expect(seq.next().value).toBe(5);
    expect(seq.next().value).toBe(7);
  });

  iterates('can be used with take for safe iteration', () => {
   24    const seq = createSequence({ start: 100, step: 10 });
    const values = take(seq, 5);
    expect(values).toEqual([100, 110, 120, 130, 140]);
  });
});

describe('take', () => {
  it('returns specified number of values', () => {
    const seq = createSequence();
    expect(take(seq, 3)).toEqual([0, 1, 2]);
  });

  it('returns empty array for count 0', () => {
    const seq = createSequence();
    expect(take(seq, 0)).toEqual([]);
  });

  it('throws error for negative count', () => {
    const seq = createSequence();
    expect(() => take(seq, -1)).toThrow('Count must be non-negative');
  });
});

describe('range', () => {
  it('generates range of values', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(10, 20, 2)).toEqual([10, 12, 14, 16, 18]);
    expect(range(5, 5)).toEqual([]);
  });
});