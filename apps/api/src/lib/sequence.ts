/**
 * Infinite sequence utilities.
 *
 * `naturalNumbers()` is a lazy generator yielding 0, 1, 2, 3, ... forever.
 * Because it is a generator it never materializes the whole sequence; consume
 * it safely with `take()` (a bounded prefix) or by `break`-ing a `for...of`.
 */

export function* naturalNumbers(): Generator<number> {
  let n = 0;
  while (true) {
    yield n;
    n += 1;
  }
}

/**
 * Return the first `count` values from an (possibly infinite) iterable.
 * Always terminates because it stops after `count` items.
 */
export function take<T>(source: Iterable<T>, count: number): T[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new Error("count must be a non-negative integer");
  }
  if (count === 0) return [];
  const out: T[] = [];
  for (const value of source) {
    out.push(value);
    if (out.length >= count) break;
  }
  return out;
}

/** First `count` natural numbers, safely bounded. */
export function firstNaturalNumbers(count: number): number[] {
  return take(naturalNumbers(), count);
}
