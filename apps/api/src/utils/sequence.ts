/**
 * Lazy infinite sequence utilities.
 *
 * These helpers make it possible to describe *infinite* sequences (e.g. all
 * natural numbers) without ever materializing them, and to consume them
 * *safely* with explicit bounds so iteration always terminates.
 *
 * Never iterate an infinite sequence directly:
 *
 * ```ts
 * for (const n of naturals()) console.log(n); // ❌ never terminates
 * ```
 *
 * Instead, bound it with one of the safe consumers below:
 *
 * ```ts
 * import { naturals, take, takeWhile } from "./utils/sequence";
 *
 * take(naturals(), 5);             // [0, 1, 2, 3, 4]
 * take(naturals(10, 5), 3);        // [10, 15, 20]
 * takeWhile(naturals(), (n) => n < 4); // [0, 1, 2, 3]
 * ```
 */

/**
 * Generate an infinite arithmetic sequence.
 *
 * @param start - First value emitted (default `0`).
 * @param step - Amount added on each step (default `1`). May be negative.
 * @returns A generator that yields values forever — always consume it with a
 *          bounded helper such as {@link take} or {@link takeWhile}.
 *
 * @example
 * take(naturals(), 3);      // [0, 1, 2]
 * take(naturals(1), 3);     // [1, 2, 3]
 * take(naturals(0, 2), 3);  // [0, 2, 4]
 */
export function* naturals(start = 0, step = 1): Generator<number, never, void> {
  let value = start;
  while (true) {
    yield value;
    value += step;
  }
}

/**
 * Generate an infinite sequence by repeatedly applying `next` to a seed.
 *
 * @param seed - The first value emitted.
 * @param next - Produces the following value from the current one.
 *
 * @example
 * take(iterate(1, (x) => x * 2), 4); // [1, 2, 4, 8]
 */
export function* iterate<T>(seed: T, next: (current: T) => T): Generator<T, never, void> {
  let value = seed;
  while (true) {
    yield value;
    value = next(value);
  }
}

/**
 * Safely take the first `count` items from any (possibly infinite) iterable.
 *
 * Iteration stops as soon as `count` items have been collected or the source
 * is exhausted, so this is safe to use on infinite sequences.
 *
 * @param iterable - Source iterable (finite or infinite).
 * @param count - Maximum number of items to collect. Values `<= 0` yield `[]`.
 * @returns An array with at most `count` items.
 *
 * @example
 * take(naturals(), 3); // [0, 1, 2]
 * take([1, 2], 5);     // [1, 2]
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
 * Safely take items from the front of an iterable while `predicate` holds.
 *
 * Stops at the first item for which `predicate` returns `false` (that item is
 * not included), making it safe on infinite sequences as long as the
 * predicate eventually returns `false`.
 *
 * @param iterable - Source iterable (finite or infinite).
 * @param predicate - Called with each item and its index; returning `false`
 *                     ends iteration.
 *
 * @example
 * takeWhile(naturals(), (n) => n < 3); // [0, 1, 2]
 */
export function takeWhile<T>(
  iterable: Iterable<T>,
  predicate: (item: T, index: number) => boolean
): T[] {
  const result: T[] = [];
  let index = 0;
  for (const item of iterable) {
    if (!predicate(item, index++)) break;
    result.push(item);
  }
  return result;
}
