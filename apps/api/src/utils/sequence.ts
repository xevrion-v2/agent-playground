/**
 * Infinite sequence utilities with safe iteration helpers.
 *
 * All generators are lazy — they produce values on demand and never
 * terminate. Use take(), takeWhile(), or for-loop with break to
 * consume finite prefixes.
 */

// ---------------------------------------------------------------------------
// Infinite sequence generators
// ---------------------------------------------------------------------------

/** Natural numbers: 0, 1, 2, 3, ... */
export function* naturals(start = 0): Generator<number> {
  let n = start;
  while (true) yield n++;
}

/** Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, ... */
export function* fibonacci(): Generator<number> {
  let a = 0, b = 1;
  yield a; yield b;
  while (true) { const n = a + b; yield n; a = b; b = n; }
}

/** Prime numbers: 2, 3, 5, 7, 11, ... */
export function* primes(): Generator<number> {
  yield 2;
  const seen = [2];
  let c = 3;
  while (true) {
    const lim = Math.sqrt(c);
    let ok = true;
    for (const p of seen) { if (p > lim) break; if (c % p === 0) { ok = false; break; } }
    if (ok) { seen.push(c); yield c; }
    c += 2;
  }
}

/** Triangular numbers: 1, 3, 6, 10, 15, ... */
export function* triangular(): Generator<number> {
  let n = 1, s = 0;
  while (true) { s += n; yield s; n++; }
}

// ---------------------------------------------------------------------------
// Safe consumption helpers
// ---------------------------------------------------------------------------

export function take<T>(iter: Iterator<T>, n: number): T[] {
  const r: T[] = [];
  for (let i = 0; i < n; i++) { const v = iter.next(); if (v.done) break; r.push(v.value); }
  return r;
}

export function takeWhile<T>(iter: Iterator<T>, p: (v: T) => boolean): T[] {
  const r: T[] = [];
  while (true) { const v = iter.next(); if (v.done || !p(v.value)) break; r.push(v.value); }
  return r;
}

if (require.main === module) {
  console.log("naturals(10):", take(naturals(), 10));
  console.log("fibonacci(10):", take(fibonacci(), 10));
  console.log("primes(10):", take(primes(), 10));
  console.log("triangular(10):", take(triangular(), 10));
  console.log("fib < 100:", takeWhile(fibonacci(), (n) => n < 100));
}
