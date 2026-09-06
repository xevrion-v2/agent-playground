/**
 * Infinite sequence utility — dependency-free generator helpers.
 *
 * Provides:
 *  - Generic `sequence()` to build infinite iterables from a seed + step fn
 *  - Bounded consumption: `take()`, `takeWhile()`, `collect()`
 *  - Pre-built sequences: naturals, arithmetic, fibonacci, recurrence
 */

// ── Core ──────────────────────────────────────────────────────────────

export function* sequence<T>(seed: T, step: (prev: T, index: number) => T): IterableIterator<T> {
  let current = seed;
  let i = 0;
  while (true) {
    yield current;
    current = step(current, i);
    i++;
  }
}

// ── Consumption helpers ───────────────────────────────────────────────

export function* take<T>(iter: Iterable<T>, n: number): IterableIterator<T> {
  let i = 0;
  for (const val of iter) {
    if (i >= n) return;
    yield val;
    i++;
  }
}

export function* takeWhile<T>(iter: Iterable<T>, pred: (val: T) => boolean): IterableIterator<T> {
  for (const val of iter) {
    if (!pred(val)) return;
    yield val;
  }
}

export function collect<T>(iter: Iterable<T>, n?: number): T[] {
  const arr: T[] = [];
  let i = 0;
  for (const val of iter) {
    if (n !== undefined && i >= n) break;
    arr.push(val);
    i++;
  }
  return arr;
}

// ── Pre-built sequences ──────────────────────────────────────────────

/** 0, 1, 2, 3, … */
export function naturals(start = 0): IterableIterator<number> {
  return sequence(start, (prev) => prev + 1);
}

/** a, a+d, a+2d, … */
export function arithmetic(a: number, d: number): IterableIterator<number> {
  return sequence(a, (prev) => prev + d);
}

/** 0, 1, 1, 2, 3, 5, 8, … */
export function* fibonacci(): IterableIterator<number> {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/** Generic recurrence: xₙ = f(xₙ₋₁, xₙ₋₂, …) */
export function* recurrence(
  initials: number[],
  step: (prev: number[]) => number
): IterableIterator<number> {
  const buf = [...initials];
  // yield all initials first
  for (const v of buf) yield v;
  while (true) {
    const next = step(buf);
    buf.push(next);
    buf.shift();
    yield next;
  }
}
