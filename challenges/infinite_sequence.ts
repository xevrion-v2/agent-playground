/**
 * Infinite Sequence Iterator — lazy, memory-efficient generators
 * for common mathematical and utility sequences.
 */

/**
 * Extract the first `n` values from any iterable iterator.
 *
 * @example take(fibonacci(), 5) // [0, 1, 1, 2, 3]
 */
export function take<T>(iter: IterableIterator<T>, n: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    const next = iter.next();
    if (next.done) break;
    result.push(next.value);
  }
  return result;
}

/** Infinite Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, ... */
export function* fibonacci(): IterableIterator<number> {
  let a = 0, b = 1;
  while (true) { yield a; [a, b] = [b, a + b]; }
}

/** Infinite natural numbers: 0, 1, 2, 3, ... */
export function* naturals(): IterableIterator<number> {
  let n = 0;
  while (true) yield n++;
}

/** Infinite prime numbers (lazy Sieve of Eratosthenes). */
export function* primes(): IterableIterator<number> {
  const comp = new Map<number, number[]>();
  let n = 2;
  while (true) {
    const factors = comp.get(n);
    if (!factors) { yield n; comp.set(n * n, [n]); }
    else {
      for (const p of factors) {
        const k = n + p;
        const e = comp.get(k);
        e ? e.push(p) : comp.set(k, [p]);
      }
      comp.delete(n);
    }
    n++;
  }
}

/** Infinite powers of a base: base^0, base^1, base^2, ... */
export function* powers(base: number): IterableIterator<number> {
  let v = 1;
  while (true) { yield v; v *= base; }
}

if (require.main === module) {
  console.log("Fib (10):", take(fibonacci(), 10));
  console.log("Primes (10):", take(primes(), 10));
  console.log("Powers of 2 (8):", take(powers(2), 8));
}
