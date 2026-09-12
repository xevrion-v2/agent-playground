/**
 * Infinite sequence utilities with safe iteration helpers.
 *
 * This module provides generator-based infinite sequences and helper
 * functions to safely consume them without causing infinite loops.
 */

/**
 * Generate an infinite sequence of natural numbers starting from `start`.
 *
 * @example
 * ```ts
 * const nums = naturalNumbers(1);
 * console.log(nums.next().value); // 1
 * console.log(nums.next().value); // 2
 * ```
 *
 * @param start - The first number in the sequence. Defaults to 0.
 * @param step - The increment between numbers. Defaults to 1.
 * @yields The next natural number in the sequence.
 */
export function* naturalNumbers(start = 0, step = 1): Generator<number, never, unknown> {
  let current = start;
  while (true) {
    yield current;
    current += step;
  }
}

/**
 * Generate an infinite Fibonacci sequence.
 *
 * The sequence starts: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
 *
 * @example
 * ```ts
 * const fib = fibonacci();
 * console.log(take(fib, 5)); // [0, 1, 1, 2, 3]
 * ```
 *
 * @yields The next number in the Fibonacci sequence.
 */
export function* fibonacci(): Generator<number, never, unknown> {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/**
 * Generate an infinite sequence by repeatedly applying a function to an initial value.
 *
 * @example
 * ```ts
 * const powers = iterate((x) => x * 2, 1);
 * console.log(take(powers, 5)); // [1, 2, 4, 8, 16]
 * ```
 *
 * @param fn - The function to apply to each value to produce the next.
 * @param initial - The starting value of the sequence.
 * @yields The next value in the iterated sequence.
 */
export function* iterate<T>(fn: (value: T) => T, initial: T): Generator<T, never, unknown> {
  let current = initial;
  while (true) {
    yield current;
    current = fn(current);
  }
}

/**
 * Generate an infinite sequence by repeating a value.
 *
 * @example
 * ```ts
 * const ones = repeat(1);
 * console.log(take(ones, 3)); // [1, 1, 1]
 * ```
 *
 * @param value - The value to repeat infinitely.
 * @yields The same value forever.
 */
export function* repeat<T>(value: T): Generator<T, never, unknown> {
  while (true) {
    yield value;
  }
}

/**
 * Safely take the first `count` elements from any iterable, including infinite sequences.
 *
 * This is the primary safe-consumption helper: it guarantees termination by
 * limiting how many elements are pulled from the generator.
 *
 * @example
 * ```ts
 * const first5 = take(naturalNumbers(), 5);
 * console.log(first5); // [0, 1, 2, 3, 4]
 * ```
 *
 * @param iterable - The iterable to consume from (can be infinite).
 * @param count - The maximum number of elements to take.
 * @returns An array containing at most `count` elements.
 */
export function take<T>(iterable: Iterable<T>, count: number): T[] {
  const result: T[] = [];
  if (count <= 0) return result;

  for (const item of iterable) {
    result.push(item);
    if (result.length >= count) break;
  }
  return result;
}

/**
 * Take elements from an iterable while a predicate returns true.
 *
 * Stops as soon as the predicate returns false, making it safe for infinite sequences.
 *
 * @example
 * ```ts
 * const under10 = takeWhile(naturalNumbers(), (n) => n < 10);
 * console.log(under10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * ```
 *
 * @param iterable - The iterable to consume from.
 * @param predicate - Function that returns true to continue taking elements.
 * @returns An array of elements taken while the predicate was true.
 */
export function takeWhile<T>(iterable: Iterable<T>, predicate: (value: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of iterable) {
    if (!predicate(item)) break;
    result.push(item);
  }
  return result;
}

/**
 * Skip the first `count` elements of an iterable, then yield the rest.
 *
 * @example
 * ```ts
 * const after5 = skip(naturalNumbers(), 5);
 * console.log(take(after5, 3)); // [5, 6, 7]
 * ```
 *
 * @param iterable - The iterable to skip elements from.
 * @param count - The number of elements to skip.
 * @yields Elements after the first `count` have been skipped.
 */
export function* skip<T>(iterable: Iterable<T>, count: number): Generator<T, void, unknown> {
  let skipped = 0;
  for (const item of iterable) {
    if (skipped < count) {
      skipped++;
      continue;
    }
    yield item;
  }
}

/**
 * Map each element of an iterable through a transform function.
 *
 * @example
 * ```ts
 * const doubled = map(naturalNumbers(1), (n) => n * 2);
 * console.log(take(doubled, 4)); // [2, 4, 6, 8]
 * ```
 *
 * @param iterable - The iterable to transform.
 * @param fn - The transform function applied to each element.
 * @yields The transformed elements.
 */
export function* map<T, U>(iterable: Iterable<T>, fn: (value: T) => U): Generator<U, void, unknown> {
  for (const item of iterable) {
    yield fn(item);
  }
}

/**
 * Filter elements of an iterable based on a predicate.
 *
 * @example
 * ```ts
 * const evens = filter(naturalNumbers(), (n) => n % 2 === 0);
 * console.log(take(evens, 5)); // [0, 2, 4, 6, 8]
 * ```
 *
 * @param iterable - The iterable to filter.
 * @param predicate - Function that returns true to keep the element.
 * @yields Only elements for which the predicate returns true.
 */
export function* filter<T>(iterable: Iterable<T>, predicate: (value: T) => boolean): Generator<T, void, unknown> {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}

/**
 * ⚠️ WARNING: Do not use for...of directly on infinite sequences without a break.
 *
 * This file demonstrates safe patterns:
 * - Always use `take()`, `takeWhile()`, or another terminating helper.
 * - Never spread an infinite sequence into an array (`[...infinite]`).
 * - Never call `Array.from()` on an infinite sequence.
 *
 * @example
 * ```ts
 * // SAFE: terminates after 10 elements
 * const first10 = take(naturalNumbers(), 10);
 *
 * // SAFE: terminates when n >= 100
 * const under100 = takeWhile(naturalNumbers(), (n) => n < 100);
 *
 * // UNSAFE: will hang forever
 * // const all = [...naturalNumbers()];
 * ```
 */
export const SAFE_ITERATION_GUIDE = "Use take() or takeWhile() to consume infinite sequences safely.";
