import { describe, it, expect } from 'vitest';
import { infiniteSequence, take, range } from '../sequence';

describe('infiniteSequence', () => {
  it('generates values based on index', () => {
    const seq = infiniteSequence((i) => i * 2);
    const result = take(seq, 5);
    expect(result).toEqual([0, 2, 4, 6, 8]);
  });

  it('respects custom maxIterations', () => {
    const seq = infiniteSequence((i) => i, { maxIterations: 3 });
    expect(() => take(seq, 5)).toThrow('exceeded safety limit');
  });

  it('allows safe finite consumption', () => {
    const seq = infiniteSequence((i) => `item-${i}`);
    const result = take(seq, 3);
    expect(result).toEqual(['item-0', 'item-1', 'item-2']);
  });
});

describe('take', () => {
  it('returns requested number of items', () => {
    const seq = infiniteSequence((i) => i);
    expect(take(seq, 3)).toEqual([0, 1, 2]);
  });

  it('returns empty array for count 0', () => {
    const seq = infiniteSequence((i) => i);
    expect(take(seq, 0)).toEqual([]);
  });

  it('throws on negative count', () => {
    expect(() => take(infiniteSequence((i) => i), -1)).toThrow('non-negative');
  });
});

describe('range', () => {
  it('generates range [start, end)', () => {
    expect([...range(0, 5)]).toEqual([0, 1, 2, 3, 4]);
  });

  it('supports negative step', () => {
    expect([...range(5, 0, -1)]).toEqual([5, 4, 3, 2, 1]);
  });

  it('throws on zero step', () => {
    expect(() => [...range(0, 5, 0)]).toThrow('step cannot be zero');
  });
});

describe('integration', () => {
  it('can be used with for...of and break', () => {
    const seq = infiniteSequence((i) => i + 1);
    const result: number[] = [];
    for (const n of seq) {
      if (n > 3) break;
      result.push(n);
    }
    expect(result).toEqual([1, 2, 3]);
  });
});