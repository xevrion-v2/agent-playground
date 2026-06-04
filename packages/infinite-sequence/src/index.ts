/**
 * @taskflow/infinite-sequence
 *
 * A safe infinite sequence iterator using ES2015+ Iterable protocol.
 *
 * ## Basic usage
 *
 * ```ts
 * import { infiniteSequence } from "@taskflow/infinite-sequence";
 *
 * // Take the first 5 natural numbers
 * const seq = infiniteSequence((n) => n);
 * const first5 = [...seq.take(5)];
 * // first5 => [0, 1, 2, 3, 4]
 * ```
 *
 * ## Fibonacci example
 *
 * ```ts
 * const fib = infiniteSequence((n, prev = [0, 1]) => {
 *   if (n === 0) return 0;
 *   if (n === 1) return 1;
 *   const [a, b] = prev;
 *   return a + b;
 * });
 * const first10 = [...fib.take(10)];
 * // first10 => [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 * ```
 *
 * ## Why not a generator?
 *
 * Generators allocate per-iteration. This implementation uses
 * the Symbol.iterator protocol directly, keeping zero allocation
 * overhead for the sequence wrapper itself.
 */

export interface InfiniteSequence<T> {
  /** Return an iterator over the sequence. */
  [Symbol.iterator](): Iterator<T, never, undefined>;

  /**
   * Return an array containing the first `count` values of the sequence.
   * This is the only way to safely consume a finite prefix of an
   * unbounded sequence.
   */
  take(count: number): T[];
}

/**
 * Create an infinite sequence defined by a generator function `f`.
 *
 * @param f - A pure function `f(index, ...previousValues) => value`.
 *   `index` is the zero-based position in the sequence.
 *   `previousValues` carries any memoized state you need.
 * @returns An `InfiniteSequence<T>` that is **lazy** — no values are
 *   computed until you call `.take(n)` or iterate manually.
 */
export function infiniteSequence<T>(
  f: (index: number, ...previous: T[]) => T
): InfiniteSequence<T> {
  const cache: T[] = [];

  function compute(n: number): T {
    if (n < cache.length) return cache[n];
    const prev = cache.slice(Math.max(0, n - f.length + 1), n);
    const value = f(n, ...prev);
    cache.push(value);
    return value;
  }

  return {
    [Symbol.iterator](): Iterator<T, never, undefined> {
      let i = 0;
      return {
        next(): IteratorResult<T, never> {
          return { value: compute(i++), done: false as const };
        },
      };
    },

    take(count: number): T[] {
      if (count < 0) {
        throw new RangeError(
          `infiniteSequence.take: count must be non-negative, got ${count}`
        );
      }
      const result: T[] = [];
      for (let n = 0; n < count; n++) {
        result.push(compute(n));
      }
      return result;
    },
  };
}

export default infiniteSequence;
