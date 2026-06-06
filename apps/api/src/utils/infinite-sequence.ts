/**
 * Infinite Sequence Iterator
 *
 * A lightweight generator-based utility for producing unbounded numeric
 * sequences.  Each iterator is *lazy* — values are computed on demand
 * so memory stays constant regardless of how many elements you consume.
 *
 * Usage:
 *   import { countFrom, fibonacci, geometric } from "./infinite-sequence";
 *
 *   // 0, 1, 2, 3, …
 *   for (const n of countFrom()) {
 *     if (n > 10) break;          // always provide an exit condition
 *     console.log(n);
 *   }
 *
 *   // first 10 Fibonacci numbers
 *   const fib = fibonacci();
 *   const first10 = Array.from({ length: 10 }, () => fib.next().value);
 *
 * Safety:
 *   Because these are infinite, **always** pair them with a break/limit.
 *   The helpers `take` and `takeWhile` are provided for this purpose.
 */

/** Yield 0, 1, 2, 3, … starting from `start`. */
export function* countFrom(start = 0): Generator<number> {
  let n = start;
  while (true) {
    yield n++;
  }
}

/** Yield the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, … */
export function* fibonacci(): Generator<number> {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/** Yield a geometric progression: start, start*r, start*r², … */
export function* geometric(start = 1, ratio = 2): Generator<number> {
  let value = start;
  while (true) {
    yield value;
    value *= ratio;
  }
}

/** Yield an arithmetic progression: start, start+step, start+2*step, … */
export function* arithmetic(start = 0, step = 1): Generator<number> {
  let value = start;
  while (true) {
    yield value;
    value += step;
  }
}

// ── Safe consumption helpers ────────────────────────────────────

/** Collect the first `n` values from any iterator. */
export function take<T>(iter: Iterable<T>, n: number): T[] {
  const result: T[] = [];
  for (const value of iter) {
    if (result.length >= n) break;
    result.push(value);
  }
  return result;
}

/** Collect values while `predicate` returns true. */
export function takeWhile<T>(iter: Iterable<T>, predicate: (value: T) => boolean): T[] {
  const result: T[] = [];
  for (const value of iter) {
    if (!predicate(value)) break;
    result.push(value);
  }
  return result;
}
