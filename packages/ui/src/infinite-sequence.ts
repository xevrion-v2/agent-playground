/**
 * Infinite Sequence Iterator — TaskFlow Engineering Playground
 *
 * A lightweight utility for generating and safely iterating over infinite
 * sequences using JavaScript generators. Includes built-in sequence types
 * (natural numbers, Fibonacci, primes via sieve) and a generic builder.
 *
 * All iteration is controlled via take() and takeWhile() to prevent
 * infinite loops. The underlying generators are lazy — values are
 * produced only when consumed.
 *
 * Usage:
 *   import { natural, fibonacci, primes, sequence, take } from './infinite-sequence';
 *
 *   // First 5 Fibonacci numbers
 *   const fib5 = take(fibonacci(), 5);  // [0, 1, 1, 2, 3]
 *
 *   // Natural numbers less than 100 that are divisible by 7
 *   const sevens = takeWhile(natural(), (n) => n < 100)
 *     .filter((n) => n % 7 === 0);  // [0, 7, 14, ..., 98]
 */

// ── Core generator types ──────────────────────────────────────────

export function* natural(start = 0): Generator<number> {
  let n = start;
  while (true) yield n++;
}

export function* fibonacci(): Generator<number> {
  let a = 0,
    b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

export function* primes(): Generator<number> {
  yield 2;
  const multiples = new Map<number, number>();
  let candidate = 3;

  while (true) {
    const factor = multiples.get(candidate);
    if (factor === undefined) {
      // candidate is prime
      yield candidate;
      multiples.set(candidate * candidate, candidate * 2);
    } else {
      // candidate is composite, advance the factor
      let next = candidate + factor;
      while (multiples.has(next)) {
        next += factor;
      }
      multiples.set(next, factor);
    }
    multiples.delete(candidate);
    candidate += 2;
  }
}

/**
 * Build a custom infinite sequence from a seed and next function.
 * Example: powersOf2 = sequence(1, (n) => n * 2)
 */
export function* sequence<T>(
  seed: T,
  next: (current: T, index: number) => T,
): Generator<T> {
  let value = seed;
  let index = 0;
  while (true) {
    yield value;
    value = next(value, index++);
  }
}

// ── Safe consumption utilities ────────────────────────────────────

export function take<T>(gen: Generator<T>, count: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    const { value, done } = gen.next();
    if (done) break;
    result.push(value);
  }
  return result;
}

export function takeWhile<T>(
  gen: Generator<T>,
  predicate: (value: T, index: number) => boolean,
): T[] {
  const result: T[] = [];
  let index = 0;
  while (true) {
    const { value, done } = gen.next();
    if (done || !predicate(value, index)) break;
    result.push(value);
    index++;
  }
  return result;
}

// ── CLI demo ──────────────────────────────────────────────────────

if (require.main === module) {
  console.log("Infinite Sequence Iterator — Demo");
  console.log("──────────────────────────────────\n");

  console.log("Fibonacci (first 15):");
  console.log(`  ${take(fibonacci(), 15).join(", ")}\n`);

  console.log("Primes under 50:");
  console.log(`  ${takeWhile(primes(), (p) => p < 50).join(", ")}\n`);

  console.log("Powers of 2 (first 10):");
  const powersOf2 = sequence(1, (n) => n * 2);
  console.log(`  ${take(powersOf2, 10).join(", ")}\n`);

  console.log("Natural numbers [5..14] (skip 5, take 10):");
  const from5 = natural(5);
  console.log(`  ${take(from5, 10).join(", ")}`);
}
