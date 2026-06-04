/**
 * Infinite Sequence Iterator Utility
 *
 * Provides lazy infinite sequence generators that yield values on demand.
 * Using JavaScript generators (function*), sequences are computed lazily,
 * meaning values are only calculated when requested.
 *
 * This is memory-efficient for working with potentially unbounded sequences
 * since only one value exists in memory at a time.
 *
 * Design Pattern: Iterator / Generator
 */

/**
 * Creates an infinite sequence of natural numbers starting from `start`.
 *
 * @param start - Starting value (default: 0)
 * @yields Consecutive integers: start, start+1, start+2, ...
 *
 * @example
 * ```ts
 * const nats = naturals(1);
 * nats.next().value; // 1
 * nats.next().value; // 2
 * nats.next().value; // 3
 * ```
 */
export function* naturals(start: number = 0): Generator<number> {
  let n = start;
  while (true) {
    yield n++;
  }
}

/**
 * Creates an infinite Fibonacci sequence.
 *
 * @yields Fibonacci numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
 *
 * @example
 * ```ts
 * const fib = fibonacci();
 * fib.next().value; // 0
 * fib.next().value; // 1
 * fib.next().value; // 1
 * fib.next().value; // 2
 * ```
 */
export function* fibonacci(): Generator<number> {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/**
 * Creates an infinite geometric sequence.
 *
 * @param start - Initial value
 * @param ratio - Multiplier applied each step
 * @yields start, start*ratio, start*ratio^2, ...
 *
 * @example
 * ```ts
 * const powers = geometric(1, 2);
 * powers.next().value; // 1
 * powers.next().value; // 2
 * powers.next().value; // 4
 * ```
 */
export function* geometric(start: number, ratio: number): Generator<number> {
  let value = start;
  while (true) {
    yield value;
    value *= ratio;
  }
}

/**
 * Safely takes a finite number of values from an infinite iterator.
 *
 * @param iter - An infinite iterator
 * @param count - Number of values to collect
 * @returns Array of collected values
 *
 * @example
 * ```ts
 * take(naturals(1), 5);  // [1, 2, 3, 4, 5]
 * take(fibonacci(), 7);  // [0, 1, 1, 2, 3, 5, 8]
 * ```
 */
export function take<T>(iter: Iterator<T>, count: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    const next = iter.next();
    if (next.done) break;
    result.push(next.value);
  }
  return result;
}
