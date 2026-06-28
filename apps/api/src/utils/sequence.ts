/**
 * Infinite sequence utility.
 *
 * Generates an infinite (or bounded) sequence of values using a
 * starting seed and a step function.  Safe iteration is provided
 * via the helper `take()` so callers are never accidentally caught
 * in an infinite loop.
 *
 * ## Usage
 *
 * ```ts
 * // Natural numbers: 1, 2, 3, 4, 5
 * const naturals = sequence(1, (n) => n + 1);
 * const firstFive = [...take(naturals, 5)];
 * // => [1, 2, 3, 4, 5]
 *
 * // Powers of two: 1, 2, 4, 8, 16
 * const powersOfTwo = sequence(1, (n) => n * 2);
 * const some = [...take(powersOfTwo, 5)];
 * // => [1, 2, 4, 8, 16]
 *
 * // Fibonacci-like: 0, 1, 1, 2, 3, 5, 8
 * function* fibonacci(): Generator<number> {
 *   let a = 0, b = 1;
 *   while (true) {
 *     yield a;
 *     [a, b] = [b, a + b];
 *   }
 * }
 * const fib = fibonacci();
 * const firstEight = [...take(fib, 8)];
 * // => [0, 1, 1, 2, 3, 5, 8, 13]
 * ```
 *
 * @module sequence
 */

/**
 * Create an infinite sequence starting from `seed` and applying
 * `step` on each iteration.
 *
 * @param seed - The first value yielded.
 * @param step - Pure function that transforms the previous value
 *               into the next.
 * @yields The current value on each invocation.
 */
export function* sequence<T>(seed: T, step: (prev: T) => T): Generator<T> {
  let current = seed;
  while (true) {
    yield current;
    current = step(current);
  }
}

/**
 * Safely take up to `count` values from an iterable.
 *
 * This is the safe-access helper that prevents infinite iteration.
 * Always use `take()` instead of spreading or `for..of` on an
 * unbounded generator.
 *
 * @param iterable - Any iterable (including infinite generators).
 * @param count    - Maximum number of items to consume (must be >= 0).
 * @yields Up to `count` values.
 */
export function take<T>(
  iterable: Iterable<T>,
  count: number
): Generator<T> {
  const iterator = iterable[Symbol.iterator]();
  let remaining = count;

  return (function* () {
    while (remaining-- > 0) {
      const { value, done } = iterator.next();
      if (done) return;
      yield value;
    }
    iterator.return?.();
  })();
}
