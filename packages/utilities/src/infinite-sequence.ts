/**
 * Infinite Sequence Iterator
 * A utility for creating and working with infinite sequences
 */

export type InfiniteSequence<T> = {
  /**
   * Get the next value in the sequence
   */
  next(): IteratorResult<T, undefined>;
  
  /**
   * Reset the sequence to its initial state
   */
  reset(): void;
}

interface InfiniteSequenceGenerator<T> {
  /**
   * Generate the next value in the sequence
   */
  next(): T;
  
  /**
   * Reset generator to initial state
   */
  reset?(): void;
}

/**
 * Creates an infinite sequence iterator from a generator function
 * @param generator A function that generates the next value in the sequence
 * @returns An iterator object with next() and reset() methods
 */
export function createInfiniteSequence<T>(generator: () => T, reset?: () => void): InfiniteSequence<T> {
  return {
    next(): IteratorResult<T, undefined> {
      return {
        done: false,
        value: generator()
      };
    },
    reset() {
      if (reset) {
        reset();
      }
    }
  };
}

/**
 * Creates an infinite counter sequence starting from a number
 * @param start The starting number (default: 0)
  @param step The increment between numbers (default: 1)
 * @returns An infinite sequence iterator
 */
export function createCounterSequence(start = 0, step = 1): InfiniteSequence<number> {
  let current = start - step;
  
  return {
    next(): IteratorResult<number, undefined> {
      current += step;
      return {
        done: false,
        value: current
      };
    },
    reset() {
      current = start - step;
    }
  };
}

/**
 * Creates an infinite Fibonacci sequence
 * @returns An infinite sequence iterator for Fibonacci numbers
 */
export function createFibonacciSequence(): InfiniteSequence<number> {
  let a = 0, b = 1;
  
  return {
    next(): IteratorResult<number, undefined> {
      const result = { done: false, value: a } as const;
      const next = a + b;
      a = b;
      b = next;
      return result;
    },
    reset() {
      a = 0;
      b = 1;
    }
  };
}

// Type definitions
export type { IteratorResult };
export type IteratorResult<T, TReturn> = {
  done: false;
  value: T;
} | {
  done: true;
  value: TReturn;
};