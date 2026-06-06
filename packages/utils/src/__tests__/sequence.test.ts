import { createSequence, take, range } from '../sequence';

describe('createSequence', () => {
  it('generates sequence starting from 0 by default', () => {
    const seq = createSequence();
    expect(take(seq, 5)).toEqual([0, 1, 2, 3, 4]);
  });

  it('respects custom start value', () => {
    const seq = createSequence({ start: 10 });
    expect(take(seq, 3)).toEqual([10, 11, 12]);
  });

  it('respects custom step value', () => {
    const seq = createSequence({ step: 2 });
    expect(take(seq, 4)).toEqual([0, 2, 4, 6]);
  });

  it('handles negative step', () => {
    const seq = createSequence({ start: 10, step: -1 });
    expect(take(seq, 3)).toEqual([10, 9, 8]);
  });

  it('throws when maxIterations exceeded', () => {
    const seq = createSequence({ maxIterations: 5 });
    expect(() => [...take(seq, 10)]).toThrow('Sequence exceeded maximum safe iterations');
  });

  it('allows iteration up to maxIterations', () => {
    const seq = createSequence({ maxIterations: 3 });
    expect(take(seq, 3)).toEqual([0, 1, 2]);
  });
});

describe('take', () => {
  it('takes specified number of items', () => {
    const seq = createSequence();
    expect(take(seq, 3)).toEqual([0, 1, 2]);
  });

  it('handles taking more than available', () => {
    const arr = [1, 2, 3];
    expect(take(arr, 10)).toEqual([1, 2, 3]);
  });

  it('returns empty array for count of 0', () => {
    const seq = createSequence();
    expect(take(seq, 0)).toEqual([]);
  });
});

describe('range', () => {
  it('generates inclusive range', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('respects custom step', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
  });

  it('handles single value range', () => {
    expect(range(5, 5)).toEqual([5]);
  });
});