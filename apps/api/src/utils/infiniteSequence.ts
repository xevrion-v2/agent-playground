/**
 * A simple infinite sequence utility providing safe iteration helpers.
 *
 * ## Usage
 *
 * ```ts
 * import { counter, fibonacci, take, takeWhile } from "./infiniteSequence";
 *
 * // Create an infinite counter starting from 1
 * const numbers = counter(1);
 * console.log(take(numbers, 5)); // [1, 2, 3, 4, 5]
 *
 * // Generate Fibonacci numbers
 * const fibs = fibonacci();
 * console.log(take(fibs, 8)); // [0, 1, 1, 2, 3, 5, 8, 13]
 *
 * // Take values while a condition holds
 * const small = takeWhile(counter(1), (n) => n < 10);
 * console.log(small); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * ```
 */

/**
 * Creates an infinite sequence starting from a given value,
 * incrementing by the provided step.
 *
 * @param start - Starting value (default: 0)
 * @param step - Increment value (default: 1)
 * @returns A generator yielding an infinite arithmetic sequence
 *
 * @example
 * const seq = counter(1, 2);
 * take(seq, 4); // [1, 3, 5, 7]
 */
export function* counter(start = 0, step = 1): Generator<number> {
  let value = start;
  while (true) {
    yield value;
    value += step;
  }
}

/**
 * Creates an infinite Fibonacci sequence generator.
 *
 * @returns A generator yielding an infinite Fibonacci sequence starting from 0, 1
 *
 * @example
 * const fibs = fibonacci();
 * take(fibs, 6); // [0, 1, 1, 2, 3, 5]
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
 * Takes the first `n` elements from an iterable or generator.
 * Safe to call on infinite sequences — it will stop after `n` values.
 *
 * @param iter - Any iterable or generator
 * @param n - Number of elements to take
 * @returns An array containing the first `n` values
 *
 * @example
 * take(counter(5), 3); // [5, 6, 7]
 */
export function take<T>(iter: Iterable<T>, n: number): T[] {
  const result: T[] = [];
  const iterator = iter[Symbol.iterator]();
  for (let i = 0; i < n; i++) {
    const { value, done } = iterator.next();
    if (done) break;
    result.push(value);
  }
  return result;
}

/**
 * Takes elements from an iterable or generator while the predicate returns true.
 * Safe to call on infinite sequences — it will stop when the predicate fails.
 *
 * @param iter - Any iterable or generator
 * @param predicate - Function that returns true while elements should be taken
 * @returns An array of elements before the first predicate failure
 *
 * @example
 * takeWhile(counter(1), (n) => n <= 5); // [1, 2, 3, 4, 5]
 */
export function takeWhile<T>(iter: Iterable<T>, predicate: (value: T) => boolean): T[] {
  const result: T[] = [];
  for (const value of iter) {
    if (!predicate(value)) break;
    result.push(value);
  }
  return result;
}
