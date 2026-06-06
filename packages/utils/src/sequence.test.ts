import { describe, it, expect } from 'vitest';
import { infiniteSequence, take, range } from './sequence';

describe('infiniteSequence', () => {
  it('should start from 0 by default', () => {
    const seq = infiniteSequence();
    expect(seq.next().value).toBe(0);
    expect(seq.next().value).toBe(1);
    expect(seq.next().value).toBe(2);
  });

  it('should respect custom start value', () => {
    const seq = infiniteSequence({ start: 10 });
    expect(seq.next().value).toBe(10);
    expect(seq.next().value).toBe(11);
  });

  it('should respect custom step value', () => {
    const seq = infiniteSequence({ start: 0, step: 5 });
    expect(seq.next().value).toBe(0);
    expect(seq.next().value).toBe(5);
    expect(seq.next().value).toBe(10);
  });

  it('should handle negative step', () => {
    const seq = infiniteSequence({ start: 10, step: -2 });
    expect(seq.next().value).toBe(10);
    expect(seq.next().value).toBe(8);
    expect(seq.next().value).toBe(6);
  });
});

describe('take', () => {
  it('should take specified number of values', () => {
    const seq = infiniteSequence();
    const result = take(seq, 3);
    expect(result).toEqual([0, 1, 2]);
  });

  it('should return empty array for count of 0', () => {
    const seq = infiniteSequence();
    const result = take(seq, 0);
    expect(result).toEqual([]);
  });

  it('should throw on negative count', () => {
    const seq = infiniteSequence();
    expect(() => take(seq, -1)).toThrow(RangeError);
  });

  it('should work with custom sequence options', () => {
    const seq = infiniteSequence({ start: 5, step: 10 });
    const result = take(seq, 4);
    expect(result).toEqual([5, 15, 25, 35]);
  });
});

describe('range', () => {
  it('should create a range from start to end', () => {
    const result = range(0, 5);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it('should work with custom step', () => {
    const result = range(0, 10, 2);
    expect(result).toEqual([0, 2, 4, 6, 8]);
  });

  it('should return empty array when start >= end', () => {
    expect(range(5, 5)).toEqual([]);
    expect(range(10, 5)).toEqual([]);
  });

  it('should work with negative ranges', () => {
    const result = range(-5, 0);
    expect(result).toEqual([-5, -4, -3, -2, -1]);
  });
});