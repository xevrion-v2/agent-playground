/**
 * Infinite sequence utilities for TaskFlow.
 *
 * All generators are lazy — they produce values on demand and never
 * allocate the full sequence in memory. Callers must use `take()`,
 * `for...of` with a `break`, or `Array.from()` with a limit to avoid
 * infinite loops.
 *
 * @example
 * // Print the first 5 natural numbers
 * for (const n of take(naturals(), 5)) {
 *   console.log(n); // 1 2 3 4 5
 * }
 *
 * @example
 * // Collect the first 10 Fibonacci numbers
 * const fibs = Array.from(take(fibonacci(), 10));
 * // => [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 */

/**
 * Yields the natural numbers: 1, 2, 3, …
 */
export function* naturals(start = 1): Generator<number> {
  let n = start;
  while (true) {
    yield n++;
  }
}

/**
 * Yields the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, …
 */
export function* fibonacci(): Generator<number> {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/**
 * Yields an arithmetic sequence: start, start+step, start+2*step, …
 *
 * @param start - First value (default 0)
 * @param step  - Increment per term (default 1)
 */
export function* arithmetic(start = 0, step = 1): Generator<number> {
  let n = start;
  while (true) {
    yield n;
    n += step;
  }
}

/**
 * Yields a geometric sequence: start, start*ratio, start*ratio², …
 *
 * @param start - First value (default 1)
 * @param ratio - Multiplication factor per term (default 2)
 */
export function* geometric(start = 1, ratio = 2): Generator<number> {
  let n = start;
  while (true) {
    yield n;
    n *= ratio;
  }
}

/**
 * Takes the first `n` values from an infinite (or finite) iterable.
 *
 * @param iter - Source iterable
 * @param n    - Number of values to take
 * @returns Array of the first n values
 */
export function take<T>(iter: Iterable<T>, n: number): T[] {
  const result: T[] = [];
  for (const value of iter) {
    result.push(value);
    if (result.length >= n) break;
  }
  return result;
}
