/**
 * Infinite Sequence Iterator — Safe infinite sequence utilities
 *
 * Provides an InfiniteSequence<T> class with built-in safety limits
 * and iterator protocol support. Never overflows — lazy evaluation.
 *
 * Bounty: agent-playground #15 ($50)
 */

/** Configuration for infinite sequence iteration */
interface SequenceOptions {
  /** Maximum number of values to produce (safety limit, default 1000) */
  maxValues?: number;
}

/** Generator function that yields the next value in the sequence */
type SequenceGenerator<T> = (index: number) => T;

// ============================================================
// InfiniteSequence — core class
// ============================================================

export class InfiniteSequence<T> {
  private generator: SequenceGenerator<T>;
  private maxValues: number;

  constructor(generator: SequenceGenerator<T>, options: SequenceOptions = {}) {
    this.generator = generator;
    this.maxValues = options.maxValues ?? 1000;
  }

  /** Iterate lazily — only computes values as requested */
  *[Symbol.iterator](): Iterator<T> {
    let index = 0;
    while (index < this.maxValues) {
      yield this.generator(index++);
    }
  }

  /** Take the first `n` values as an array */
  take(n: number): T[] {
    const result: T[] = [];
    const limit = Math.min(n, this.maxValues);
    for (let i = 0; i < limit; i++) {
      result.push(this.generator(i));
    }
    return result;
  }

  /** Skip `n` values, then take `count` */
  skipTake(skip: number, count: number): T[] {
    const result: T[] = [];
    const limit = Math.min(skip + count, this.maxValues);
    for (let i = skip; i < limit; i++) {
      result.push(this.generator(i));
    }
    return result;
  }

  /** Map each value through a transform */
  map<U>(transform: (value: T, index: number) => U): InfiniteSequence<U> {
    return new InfiniteSequence<U>(
      (i) => transform(this.generator(i), i),
      { maxValues: this.maxValues }
    );
  }

  /** Filter values by predicate — greedy up to maxValues */
  filter(predicate: (value: T, index: number) => boolean): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.maxValues && result.length < this.maxValues; i++) {
      const value = this.generator(i);
      if (predicate(value, i)) result.push(value);
    }
    return result;
  }
}

// ============================================================
// Pre-built sequences
// ============================================================

/** Natural numbers: 0, 1, 2, 3, ... */
export const naturals = new InfiniteSequence<number>((i) => i);

/** Even numbers: 0, 2, 4, 6, ... */
export const evens = new InfiniteSequence<number>((i) => i * 2);

/** Odd numbers: 1, 3, 5, 7, ... */
export const odds = new InfiniteSequence<number>((i) => i * 2 + 1);

/** Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, ... */
export const fibonacci = (function () {
  const cache = [0, 1];
  return new InfiniteSequence<number>((i) => {
    while (i >= cache.length) {
      cache.push(cache[cache.length - 1] + cache[cache.length - 2]);
    }
    return cache[i];
  });
})();

/** Powers of two: 1, 2, 4, 8, 16, ... */
export const powersOfTwo = new InfiniteSequence<number>((i) => 2 ** i);

/** Prime numbers (sieve) */
export const primes = new InfiniteSequence<number>(
  (function () {
    const known: number[] = [];
    return (i: number): number => {
      while (i >= known.length) {
        let candidate = known.length === 0 ? 2 : known[known.length - 1] + 1;
        while (true) {
          let isPrime = true;
          for (let j = 0; j < known.length && known[j] * known[j] <= candidate; j++) {
            if (candidate % known[j] === 0) { isPrime = false; break; }
          }
          if (isPrime) break;
          candidate++;
        }
        known.push(candidate);
      }
      return known[i];
    };
  })(),
  { maxValues: 500 }
);

// ============================================================
// Demo
// ============================================================

if (require.main === module) {
  console.log("=== Infinite Sequence Demos ===\n");

  console.log("First 10 natural numbers:", naturals.take(10));
  console.log("First 10 even numbers:", evens.take(10));
  console.log("First 15 Fibonacci:", fibonacci.take(15));
  console.log("First 10 primes:", primes.take(10));
  console.log("Powers of 2:", powersOfTwo.take(11));

  console.log("\nFibonacci skip 5 take 5:", fibonacci.skipTake(5, 5));
  console.log("Evens > 10 (first 5):", evens.filter((n) => n > 10).slice(0, 5));
  console.log("Squares (mapped odds):", odds.map((n) => n * n).take(10));
}
