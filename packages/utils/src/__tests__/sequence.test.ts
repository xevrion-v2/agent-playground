import { describe, it, expect } from 'vitest';
import { arithmeticSequence, fibonacciSequence, infiniteSequence } from '../sequence';

describe('arithmeticSequence', () => {
  it('generates default sequence starting at 0 with step 1', () => {
    const seq = arithmeticSequence({ maxIterations: 5 });
    expect([...seq]).toEqual([0, 1, 2, 3, 4]);
  });

  it('generates sequence with custom start and step', () => {
    const seq = arithmeticSequence({ start: 10, step: 5, maxIterations: 4 });
    expect([...seq]).toEqual([10, 15, 20, 25]);
  });

  it('respects maxIterations limit', () => {
    const seq = arithmeticSequence({ maxIterations: 3 });
    const result = [...seq];
    expect(result).toHaveLength(3);
    expect(result).toEqual([0, 1, 2]);
  });

  it('uses default maxIterations when not specified', () => {
    const seq = arithmeticSequence();
    const result = [...seq];
    expect(result).toHaveLength(10000);
  });
});

describe('fibonacciSequence', () => {
  it('generates Fibonacci sequence', () => {
    const seq = fibonacciSequence({ maxIterations: 7 });
    expect([...seq]).toEqual([0, 1, 1, 2, 3, 5, 8]);
  });

  it('respects maxIterations limit', () => {
    const seq = fibonacciSequence({ maxIterations: 3 });
    const result = [...seq];
    expect(result).toHaveLength(3);
    expect(result).toEqual([0, 1, 1]);
  });

  it('uses default maxIterations when not specified', () => {
    const seq = fibonacciSequence();
    const result = [...seq];
    expect(result).toHaveLength(10000);
  });
});

describe('infiniteSequence alias', () => {
  it('is an alias for arithmeticSequence', () => {
    const seq = infiniteSequence({ maxIterations: 4 });
    expect([...seq]).toEqual([0, 1, 2, 3]);
  });
});