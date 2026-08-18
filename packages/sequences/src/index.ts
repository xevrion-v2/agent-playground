/**
 * Infinite Sequence Iterator
 * 
 * Provides utilities for working with infinite sequences safely,
 * with built-in safeguards to prevent infinite loops in consumption.
 */

export interface SequenceGenerator<T> {
  (): IterableIterator<T>;
}

/**
 * Creates an infinite sequence from a generator function.
 * Use with a limit to avoid infinite loops.
 * 
 * @param generator - Generator function that yields values
 * @returns IterableIterator that can be consumed with limits
 */
export function infiniteSequence<T>(generator: () => IterableIterator<T>): IterableIterator<T> {
  return generator();
}

/**
 * Fibonacci sequence generator (infinite).
 * Yields: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
 */
export function* fibonacciSequence(): IterableIterator<number> {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/**
 * Natural numbers sequence generator (infinite).
 * Yields: 0, 1, 2, 3, 4, 5, ...
 * 
 * @param start - Starting number (default: 0)
 */
export function* naturalNumbers(start: number = 0): IterableIterator<number> {
  let n = start;
  while (true) {
    yield n;
    n++;
  }
}

/**
 * Powers of 2 sequence generator (infinite).
 * Yields: 1, 2, 4, 8, 16, 32, 64, ...
 */
export function* powersOfTwo(): IterableIterator<number> {
  let n = 1;
  while (true) {
    yield n;
    n *= 2;
  }
}

/**
 * Prime numbers sequence generator (infinite).
 * Yields: 2, 3, 5, 7, 11, 13, 17, 19, 23, ...
 */
export function* primeNumbers(): IterableIterator<number> {
  yield 2;
  const primes: number[] = [2];
  let candidate = 3;
  while (true) {
    let isPrime = true;
    for (const p of primes) {
      if (p * p > candidate) break;
      if (candidate % p === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
      yield candidate;
    }
    candidate += 2;
  }
}

/**
 * Take N items from an infinite sequence safely.
 * 
 * @param iterable - The infinite iterable
 * @param count - Number of items to take
 * @returns Array of taken items
 */
export function take<T>(iterable: Iterable<T>, count: number): T[] {
  const result: T[] = [];
  let i = 0;
  for (const item of iterable) {
    if (i >= count) break;
    result.push(item);
    i++;
  }
  return result;
}

/**
 * Take items from a sequence while a condition is true.
 * 
 * @param iterable - The infinite iterable
 * @param predicate - Condition to check
 * @returns Array of taken items
 */
export function takeWhile<T>(iterable: Iterable<T>, predicate: (item: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of iterable) {
    if (!predicate(item)) break;
    result.push(item);
  }
  return result;
}

// Example usage and documentation
export const examples = {
  fibonacci: () => take(fibonacciSequence(), 10),
  naturals: () => take(naturalNumbers(), 10),
  powers: () => take(powersOfTwo(), 10),
  primes: () => take(primeNumbers(), 10),
};
