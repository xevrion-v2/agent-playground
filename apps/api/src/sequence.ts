/**
 * Infinite Sequence Iterator Utilities
 * Provides safe iteration over infinite mathematical sequences
 */

/**
 * Creates an iterator for the Fibonacci sequence
 * @param maxIterations - Maximum number of iterations to prevent infinite loops
 */
export function* fibonacciIterator(maxIterations = 1000): Generator<bigint> {
  let a = 0n;
  let b = 1n;

  for (let i = 0; i < maxIterations; i++) {
    yield a;
    const next = a + b;
    a = b;
    b = next;
  }
}

/**
 * Creates an iterator for prime numbers
 * @param maxIterations - Maximum number of iterations to prevent infinite loops
 */
export function* primeIterator(maxIterations = 1000): Generator<number> {
  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  let candidate = 2;
  let count = 0;

  while (count < maxIterations) {
    if (isPrime(candidate)) {
      yield candidate;
      count++;
    }
    candidate++;
  }
}

/**
 * Creates an iterator for natural numbers
 * @param start - Starting number (default: 1)
 * @param maxIterations - Maximum number of iterations
 */
export function* naturalIterator(start = 1, maxIterations = 10000): Generator<number> {
  for (let i = start; i < start + maxIterations; i++) {
    yield i;
  }
}

/**
 * Converts an iterator to an array with a safe limit
 * @param iterator - The iterator to convert
 * @param limit - Maximum number of elements
 */
export function iteratorToArray<T>(iterator: Generator<T>, limit = 100): T[] {
  const result: T[] = [];
  for (const value of iterator) {
    if (result.length >= limit) break;
    result.push(value);
  }
  return result;
}

/**
 * InfiniteSequence class for safe iteration over infinite sequences
 */
export class InfiniteSequence<T> {
  constructor(
    private generator: Generator<T>,
    private maxIterations: number = 1000
  ) {}

  /**
   * Get the next n values from the sequence
   */
  take(count: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < Math.min(count, this.maxIterations); i++) {
      const { value, done } = this.generator.next();
      if (done) break;
      result.push(value);
    }
    return result;
  }

  /**
   * Get the first value matching a predicate
   */
  find(predicate: (value: T) => boolean): T | undefined {
    for (let i = 0; i < this.maxIterations; i++) {
      const { value, done } = this.generator.next();
      if (done) break;
      if (predicate(value)) return value;
    }
    return undefined;
  }

  /**
   * Check if any value matches a predicate
   */
  some(predicate: (value: T) => boolean): boolean {
    return this.find(predicate) !== undefined;
  }

  /**
   * Check if all values match a predicate
   */
  every(predicate: (value: T) => boolean): boolean {
    for (let i = 0; i < this.maxIterations; i++) {
      const { value, done } = this.generator.next();
      if (done) break;
      if (!predicate(value)) return false;
    }
    return true;
  }
}
