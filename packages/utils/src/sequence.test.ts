import { describe, it, expect } from 'vitest';
import { arithmeticSequence, geometricSequence, take } from './sequence';

describe('arithmeticSequence', () => {
  it('generates sequence with default parameters', () => {
    const seq = arithmeticSequence();
    expect(seq.next().value).toBe(0);
    expect(seq.next().value).toBe(1);
    expect(seq.next().value).toBe(2);
  });

  it('generates sequence with custom start and step', () => {
    const seq = arithmeticSequence(10, 5);
    expect(seq.next().value).toBe(10);
    expect(seq.next().value).toBe(15);
    expect(seq.next().value).toBe(20);
  });

  it('handles negative step', () => {
    const seq = arithmeticSequence(0, -1);
    expect(seq.next().value).toBe(0);
    expect(seq.next().value).toBe(-1);
    expect(seq.next().value).toBe(-2);
  });
});

describe('geometricSequence', () => {
  it('generates sequence with default parameters', () => {
    const seq = geometricSequence();
    expect(seq.next().value).toBe(1);
    expect(seq.next().value).toBe(2);
    expect(seq.next().value).toBe(4);
  });

  it('generates sequence with custom start and ratio', () => {
    const seq = geometricSequence(3, 3);
    expect(seq.next().value).toBe(3);
    expect(seq.next().value).toBe(9);
    expect(seq.next().value).toBe(27);
  });
});

describe('take', () => {
  it('collects specified number of values', () => {
    const seq = arithmeticSequence(0, 1);
    const values = take(seq, { maxIterations: 5 });
    expect(values).toEqual([0, 1, 2, 3, 4]);
  });

  it('respects maxIterations limit', () => {
    const seq = arithmeticSequence();
    const values = take(seq, { maxIterations: 3 });
    expect(values).toHaveLength(3);
    expect(values).toEqual([0, 1, 2]);
  });
});