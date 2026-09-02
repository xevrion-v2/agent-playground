/**
 * Infinite sequence utility.
 *
 * Provides a lazy, bounded-safe iterator over mathematical sequences so callers
 * can consume "infinite" generators without risking an unbounded loop.
 */

export type SeqFn = (n: number) => number;

/** Wrap a generator function as a lazy sequence. */
export function sequence(fn: SeqFn) {
  return {
    /** Get the n-th term (0-indexed). */
    at(n: number): number {
      if (n < 0) throw new RangeError("index must be >= 0");
      return fn(n);
    },
    /** Take the first `count` terms as an array (safe, bounded). */
    take(count: number): number[] {
      if (count < 0) throw new RangeError("count must be >= 0");
      const out: number[] = [];
      for (let i = 0; i < count; i++) out.push(fn(i));
      return out;
    },
    /** Iterate lazily up to `limit` terms via callback (safe iteration). */
    forEach(limit: number, cb: (value: number, index: number) => void): void {
      if (limit < 0) throw new RangeError("limit must be >= 0");
      for (let i = 0; i < limit; i++) cb(fn(i), i);
    },
  };
}

// Example: natural numbers 0,1,2,...
export const naturals = sequence((n) => n);
// Example: squares 0,1,4,9,...
export const squares = sequence((n) => n * n);
// Example: Fibonacci (bounded-safe via memoization).
export const fibonacci = sequence((() => {
  const memo = [0, 1];
  return (n: number) => {
    for (let i = memo.length; i <= n; i++) memo[i] = memo[i - 1] + memo[i - 2];
    return memo[n];
  };
})());
