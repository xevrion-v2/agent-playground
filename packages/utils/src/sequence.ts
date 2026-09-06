/**
 * Infinite sequence iterator utilities.
 *
 * Provides lazy, memory-safe generators for producing unbounded numeric
 * sequences. Each iterator yields values one at a time and can be
 * stopped at any point using standard iterator protocol.
 */

/**
 * Yields an infinite arithmetic sequence starting from `start`
 * incremented by `step` each iteration.
 *
 * @param start - Initial value (default: 0)
 * @param step  - Increment per iteration (default: 1)
 * @yields {number} The next value in the sequence
 *
 * @example
 * ```ts
 * const seq = arithmetic(1, 2);
 * seq.next().value; // 1
 * seq.next().value; // 3
 * seq.next().value; // 5
 * ```
 */
export function* arithmetic(start = 0, step = 1): Generator<number> {
  let current = start;
  while (true) {
    yield current;
    current += step;
  }
}

/**
 * Yields an infinite geometric sequence: start, start*ratio, start*ratio^2, ...
 *
 * @param start - Initial value (default: 2)
 * @param ratio - Multiplier per iteration (default: 2)
 * @yields {number} The next value in the sequence
 *
 * @example
 * ```ts
 * const seq = geometric(1, 3);
 * seq.next().value; // 1
 * seq.next().value; // 3
 * seq.next().value; // 9
 * ```
 */
export function* geometric(start = 2, ratio = 2): Generator<number> {
  let current = start;
  while (true) {
    yield current;
    current *= ratio;
  }
}

/**
 * Yields the infinite Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, ...
 *
 * @yields {number} The next Fibonacci number
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
 * Safely collects `count` values from any iterator.
 * Throws if the iterator is exhausted before `count` values are available.
 *
 * @param iter  - Any iterator / generator
 * @param count - Number of values to collect
 * @returns Array of collected values
 *
 * @example
 * ```ts
 * take(arithmetic(0, 5), 4); // [0, 5, 10, 15]
 * ```
 */
export function take<T>(iter: Generator<T>, count: number): T[] {
  if (count < 0) {
    throw new RangeError("count must be non-negative");
  }
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    const { value, done } = iter.next();
    if (done) {
      throw new Error(`Iterator exhausted after ${i} values, expected ${count}`);
    }
    result.push(value);
  }
  return result;
}