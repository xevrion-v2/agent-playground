/**
 * Infinite sequence utilities.
 *
 * Provides type-safe generators for common infinite sequences, plus a `take()`
 * helper to safely consume a fixed number of elements from any iterable.
 */

/** Consume the first `n` elements from an iterable and return them as an array. */
export function take<T>(iter: Iterable<T>, n: number): T[] {
  const result: T[] = [];
  for (const item of iter) {
    if (result.length >= n) break;
    result.push(item);
  }
  return result;
}

/** Infinite sequence of natural numbers starting from 0: 0, 1, 2, 3, … */
export function* naturalNumbers(start = 0): Generator<number, never, void> {
  let n = start;
  while (true) {
    yield n++;
  }
}

/** Infinite Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, … */
export function* fibonacci(): Generator<number, never, void> {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/** Infinite sequence repeating a given value forever. */
export function* repeat<T>(value: T): Generator<T, never, void> {
  while (true) {
    yield value;
  }
}

/** Create an infinite sequence by repeatedly invoking a factory function. */
export function* generate<T>(fn: () => T): Generator<T, never, void> {
  while (true) {
    yield fn();
  }
}
