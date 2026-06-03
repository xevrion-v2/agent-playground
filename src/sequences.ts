/**
 * Infinite sequence utilities for the TaskFlow monorepo.
 *
 * This module provides generator-based infinite sequences with
 * safe iteration helpers to prevent runaway loops.
 *
 * @module sequences
 *
 * @example
 * ```ts
 * import { fibonacci, naturals, primes, take, takeWhile } from "./sequences";
 *
 * take(fibonacci(), 10);
 * // => [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 *
 * take(naturals(), 5);
 * // => [1, 2, 3, 4, 5]
 *
 * take(primes(), 8);
 * // => [2, 3, 5, 7, 11, 13, 17, 19]
 *
 * takeWhile(fibonacci(), (n) => n < 100);
 * // => [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
 * ```
 */

// ── Infinite generators ────────────────────────────────────────

/**
 * Yields the infinite sequence of natural numbers: 1, 2, 3, ...
 */
export function* naturals(start = 1): Generator<number, never, unknown> {
  let n = start;
  while (true) {
    yield n++;
  }
}

/**
 * Yields the infinite Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, ...
 */
export function* fibonacci(): Generator<number, never, unknown> {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/**
 * Yields the infinite sequence of prime numbers: 2, 3, 5, 7, 11, ...
 *
 * Uses trial division — suitable for educational purposes and
 * moderate ranges, not for cryptographic-scale primes.
 */
export function* primes(): Generator<number, never, unknown> {
  yield 2;
  let candidate = 3;
  while (true) {
    let isPrime = true;
    const limit = Math.floor(Math.sqrt(candidate));
    for (let d = 2; d <= limit; d++) {
      if (candidate % d === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      yield candidate;
    }
    candidate += 2; // skip even numbers
  }
}

// ── Safe iteration helpers ──────────────────────────────────────

/**
 * Safely consumes exactly `n` items from an iterable.
 *
 * @param iterable - Any iterable (including infinite generators)
 * @param n - Maximum number of items to take
 * @returns An array of at most `n` items
 */
export function take<T>(iterable: Iterable<T>, n: number): T[] {
  const result: T[] = [];
  let count = 0;
  for (const item of iterable) {
    if (count >= n) break;
    result.push(item);
    count++;
  }
  return result;
}

/**
 * Consumes items from an iterable while a predicate holds true.
 * Stops as soon as the predicate returns false.
 *
 * @param iterable - Any iterable (including infinite generators)
 * @param predicate - Function that returns true to continue consuming
 * @returns An array of items for which the predicate was true
 */
export function takeWhile<T>(
  iterable: Iterable<T>,
  predicate: (item: T) => boolean
): T[] {
  const result: T[] = [];
  for (const item of iterable) {
    if (!predicate(item)) break;
    result.push(item);
  }
  return result;
}
