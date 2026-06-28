import { describe, it, expect } from 'vitest';
import {
  naturalNumbers,
  evenNumbers,
  oddNumbers,
  fibonacciSequence,
  cycleSequence,
  take,
  takeWhile,
  skip,
} from '../sequence';

describe('naturalNumbers', () => {
  it('should start from 1 by default', () => {
    expect(take(naturalNumbers(), 3)).toEqual([1, 2, 3]);
  });

  it('should start from a custom offset', () => {
    expect(take(naturalNumbers(10), 3)).toEqual([10, 11, 12]);
  });

  it('should produce correct first 10 numbers', () => {
    const result = take(naturalNumbers(), 10);
    expect(result).toHaveLength(10);
    expect(result[0]).toBe(1);
    expect(result[9]).toBe(10);
  });
});

describe('evenNumbers', () => {
  it('should produce even numbers', () => {
    expect(take(evenNumbers(), 5)).toEqual([2, 4, 6, 8, 10]);
  });

  it('should all be even', () => {
    const result = take(evenNumbers(), 20);
    expect(result.every((n) => n % 2 === 0)).toBe(true);
  });
});

describe('oddNumbers', () => {
  it('should produce odd numbers', () => {
    expect(take(oddNumbers(), 5)).toEqual([1, 3, 5, 7, 9]);
  });

  it('should all be odd', () => {
    const result = take(oddNumbers(), 20);
    expect(result.every((n) => n % 2 === 1)).toBe(true);
  });
});

describe('fibonacciSequence', () => {
  it('should start with 0, 1', () => {
    const result = take(fibonacciSequence(), 2);
    expect(result).toEqual([0, 1]);
  });

  it('should produce correct Fibonacci numbers', () => {
    const result = take(fibonacciSequence(), 10);
    expect(result).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it('should maintain the Fibonacci property', () => {
    const result = take(fibonacciSequence(), 15);
    for (let i = 2; i < result.length; i++) {
      expect(result[i]).toBe(result[i - 1] + result[i - 2]);
    }
  });
});

describe('cycleSequence', () => {
  it('should cycle through items', () => {
    const result = take(cycleSequence(['a', 'b', 'c']), 6);
    expect(result).toEqual(['a', 'b', 'c', 'a', 'b', 'c']);
  });

  it('should handle single item', () => {
    const result = take(cycleSequence(['x']), 3);
    expect(result).toEqual(['x', 'x', 'x']);
  });

  it('should return empty for empty input', () => {
    const result = take(cycleSequence([]), 5);
    expect(result).toEqual([]);
  });
});

describe('take', () => {
  it('should take first N elements', () => {
    expect(take(naturalNumbers(), 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle taking 0 elements', () => {
    expect(take(naturalNumbers(), 0)).toEqual([]);
  });

  it('should stop at generator exhaustion', () => {
    function* finite() {
      yield 1;
      yield 2;
    }
    expect(take(finite(), 10)).toEqual([1, 2]);
  });
});

describe('takeWhile', () => {
  it('should take while condition holds', () => {
    const result = takeWhile(naturalNumbers(), (n) => n <= 5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should stop when condition fails', () => {
    const result = takeWhile(fibonacciSequence(), (n) => n < 50);
    expect(result[result.length - 1]).toBeLessThan(50);
  });
});

describe('skip', () => {
  it('should skip first N elements', () => {
    const result = take(skip(naturalNumbers(), 5), 3);
    expect(result).toEqual([6, 7, 8]);
  });

  it('should handle skip of 0', () => {
    const result = take(skip(naturalNumbers(), 0), 3);
    expect(result).toEqual([1, 2, 3]);
  });
});
