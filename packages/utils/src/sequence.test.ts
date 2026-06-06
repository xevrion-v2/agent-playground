import { describe, it, expect } from 'vitest';
import { infiniteSequence, take } from './sequence';

describe('infiniteSequence', () => {
  it('starts at 0 with step 1 by default', () => {
    const seq = infiniteSequence();
    expect(seq.next().value).toBe(0);
    expect(seq.next().value).toBe(1);
    expect(seq.next().value).toBe(2);
  });

  it('respects custom start value', () => {
    const seq = infiniteSequence({ start: 10 });
    expect(seq.next().value).toBe(10);
    expect(seq.next().value).toBe(11);
  });

  it('respects custom step value', () => {
    const seq = infiniteSequence({ step: 5 });
    expect(seq.next().value).toBe(0);
    expect(seq.next().value).toBe(5);
    expect(seq.next().value).toBe(10);
  });

  it('handles negative step', () => {
    const seq = infiniteSequence({ start: 10, step: -2 });
    expect(seq.next().value).toBe(10);
    expect(seq.next().value).toBe(8);
    expect(seq.next().value).toBe(6);
  });

  it('can be safely limited with take()', () => {
    const result = [...take(infiniteSequence(), 5)];
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it('can be safely limited with take() for custom sequence', () => {
    const result = [...take(infiniteSequence({ start: 5, step: 10 }), 3)];
    expect(result).toEqual([5, 15, 25]);
  });
});

describe('take', () => {
  it('yields specified number of items', () => {
    const result = [...take([1, 2, 3, 4, 5], 3)];
    expect(result).toEqual([1, 2, 3]);
  });

  it('handles count of 0', () => {
    const result = [...take([1, 2, 3], 0)];
    expect(result).toEqual([]);
  });

  it('handles count greater than iterable length', () => {
    const result = [...take([1, 2], 5)];
    expect(result).toEqual([1, 2]);
  });

  it('handles empty iterable', () => {
    const result = [...take([], 3)];
    expect(result).toEqual([]);
  });
});