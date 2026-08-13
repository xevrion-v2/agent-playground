/**
 * @taskflow/sequence
 *
 * Infinite sequence iterator utilities.
 *
 * Provides safe, composable generators for working with
 * potentially infinite sequences. All iterators are lazy —
 * values are produced only when consumed.
 *
 * @example
 * ```ts
 * import { take, range, cycle } from "@taskflow/sequence";
 *
 * // First 5 natural numbers
 * const nums = [...take(range(0), 5)]; // [0, 1, 2, 3, 4]
 *
 * // Cycle through items safely
 * const colors = [...take(cycle(["red", "green", "blue"]), 7)];
 * // ["red", "green", "blue", "red", "green", "blue", "red"]
 * ```
 */

// ---------------------------------------------------------------------------
// Core
// ---------------------------------------------------------------------------

/**
 * Take up to `n` values from an iterable.
 *
 * Safe on infinite iterables — stops after `n` items.
 *
 * @example
 * ```ts
 * take(range(1), 5)  // yields 1,2,3,4,5
 * take([], 3)        // yields nothing (empty source)
 * ```
 */
export function* take<T>(iterable: Iterable<T>, n: number): Generator<T> {
  let count = 0;
  for (const value of iterable) {
    if (count++ >= n) break;
    yield value;
  }
}

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------

/**
 * Infinite numeric range starting at `start` and stepping by `step`.
 *
 * @example
 * ```ts
 * [...take(range(0, 2), 5)]  // [0, 2, 4, 6, 8]
 * ```
 */
export function* range(start = 0, step = 1): Generator<number> {
  let current = start;
  while (true) {
    yield current;
    current += step;
  }
}

/**
 * Repeat a single value infinitely.
 *
 * @example
 * ```ts
 * [...take(repeat("ping"), 3)]  // ["ping", "ping", "ping"]
 * ```
 */
export function* repeat<T>(value: T): Generator<T> {
  while (true) {
    yield value;
  }
}

/**
 * Cycle through an array infinitely.
 *
 * Empty array yields nothing.
 *
 * @example
 * ```ts
 * [...take(cycle(["a", "b"]), 5)]  // ["a", "b", "a", "b", "a"]
 * ```
 */
export function* cycle<T>(items: T[]): Generator<T> {
  if (items.length === 0) return;
  let i = 0;
  while (true) {
    yield items[i % items.length];
    i++;
  }
}

/**
 * Build a sequence from a generator function.
 *
 * The factory receives the current index (0-based) and should
 * return the next value. Use when you need a custom infinite
 * sequence.
 *
 * @example
 * ```ts
 * const squares = infiniteSequence((i) => (i + 1) ** 2);
 * [...take(squares, 4)]  // [1, 4, 9, 16]
 * ```
 */
export function* infiniteSequence<T>(
  factory: (index: number) => T
): Generator<T> {
  let i = 0;
  while (true) {
    yield factory(i++);
  }
}

// ---------------------------------------------------------------------------
// Mathematical sequences (examples)
// ---------------------------------------------------------------------------

/**
 * Infinite Fibonacci sequence.
 *
 * Starts with 0, 1 by default. Pass `a` and `b` to start from
 * different seeds.
 *
 * @example
 * ```ts
 * [...take(fibonacci(), 10)]
 * // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 * ```
 */
export function* fibonacci(a = 0, b = 1): Generator<number> {
  let prev = a;
  let curr = b;
  while (true) {
    yield prev;
    [prev, curr] = [curr, prev + curr];
  }
}

// ---------------------------------------------------------------------------
// Safe consumption helpers
// ---------------------------------------------------------------------------

/**
 * Collect an iterable into an array.
 *
 * A convenience wrapper — identical to `[...iterable]`.
 * Useful when you've already limited the sequence with `take()`.
 *
 * **Caution:** calling this on a truly infinite iterable will
 * hang forever. Always pair with `take()` or another limiter.
 */
export function collect<T>(iterable: Iterable<T>): T[] {
  return [...iterable];
}
