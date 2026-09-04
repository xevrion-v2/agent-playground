/**
 * Infinite Sequence Iterator
 *
 * A TypeScript utility for working with lazy, infinite sequences.
 * Provides safe iteration patterns (take, map, filter) that never
 * actually loop forever — every operation has a bounded step.
 *
 * @packageDocumentation
 */

/** Options for filter operations */
export interface FilterOptions {
  /** Maximum number of matching elements to collect (default: 100) */
  maxResults?: number;
  /** Maximum iterations before giving up (default: 1_000_000) */
  maxIterations?: number;
}

/**
 * A lazy infinite sequence backed by a generator function.
 *
 * Elements are computed on demand — the generator is called
 * each time an element is accessed, so the sequence is truly
 * infinite and memory-safe.
 *
 * @example
 * ```ts
 * const evens = new InfiniteSequence((i) => i * 2);
 * evens.take(5); // [0, 2, 4, 6, 8]
 * ```
 */
export class InfiniteSequence<T> {
  /**
   * @param generator - Function that produces the element at a given index.
   *   Called with `index` starting from 0. Must be pure (no side effects)
   *   or at least idempotent for predictable behaviour.
   */
  constructor(private readonly generator: (index: number) => T) {}

  /**
   * Get the element at index `n` (0-indexed).
   *
   * @throws {RangeError} If n is negative.
   */
  at(n: number): T {
    if (n < 0) {
      throw new RangeError(
        `Index must be non-negative, got ${n}`,
      );
    }
    return this.generator(n);
  }

  /**
   * Return the first `n` elements as a plain array.
   *
   * Safe — always terminates in O(n).
   */
  take(n: number): T[] {
    if (n < 0) {
      throw new RangeError(
        `Count must be non-negative, got ${n}`,
      );
    }
    return Array.from({ length: n }, (_, i) => this.generator(i));
  }

  /**
   * Transform every element with a mapping function.
   *
   * Returns a **new lazy sequence** — the map is applied per-access,
   * so you can chain infinitely without allocating.
   *
   * @example
   * ```ts
   * const odds = naturals().map((n) => n * 2 + 1);
   * odds.take(3); // [1, 3, 5]
   * ```
   */
  map<U>(fn: (value: T, index: number) => U): InfiniteSequence<U> {
    const gen = this.generator;
    return new InfiniteSequence((i) => fn(gen(i), i));
  }

  /**
   * Collect elements that satisfy a predicate.
   *
   * **Warning** — because the sequence is infinite, filter cannot
   * return a lazy sequence (it would never find the next matching
   * element without iterating forward). Instead it returns a finite
   * array. Use `options.maxResults` to control how many matches to collect
   * and `options.maxIterations` to set a safety bound on the search.
   *
   * @example
   * ```ts
   * const firstFivePrimes = naturals().filter(isPrime, { maxResults: 5 });
   * ```
   */
  filter(
    predicate: (value: T, index: number) => boolean,
    options: FilterOptions = {},
  ): T[] {
    const { maxResults = 100, maxIterations = 1_000_000 } = options;
    const results: T[] = [];
    let i = 0;

    while (results.length < maxResults && i < maxIterations) {
      const value = this.generator(i);
      if (predicate(value, i)) {
        results.push(value);
      }
      i++;
    }

    return results;
  }

  /**
   * Reduce the sequence to a single value by iterating `count` elements.
   *
   * Safe — processes exactly `count` elements, then returns.
   *
   * @example
   * ```ts
   * naturals().reduce((acc, n) => acc + n, 0, 10); // sum of 0..9 = 45
   * ```
   */
  reduce<U>(
    fn: (accumulator: U, value: T, index: number) => U,
    initial: U,
    count: number,
  ): U {
    let acc = initial;
    for (let i = 0; i < count; i++) {
      acc = fn(acc, this.generator(i), i);
    }
    return acc;
  }

  /**
   * Zip two sequences into pairs.
   *
   * @example
   * ```ts
   * const letters = cycle("a", "b", "c");
   * naturals().zip(letters).take(3); // [[0, "a"], [1, "b"], [2, "c"]]
   * ```
   */
  zip<U>(other: InfiniteSequence<U>): InfiniteSequence<[T, U]> {
    const gen = this.generator;
    return new InfiniteSequence((i) => [gen(i), other.at(i)]);
  }

  // ── Static factories ──────────────────────────────────

  /**
   * Natural numbers starting from 0: 0, 1, 2, 3, 4, …
   *
   * @example
   * ```ts
   * naturals().take(5); // [0, 1, 2, 3, 4]
   * ```
   */
  static naturals(): InfiniteSequence<number> {
    return new InfiniteSequence((i) => i);
  }

  /**
   * Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, …
   */
  static fibonacci(): InfiniteSequence<number> {
    let a = 0;
    let b = 1;
    return new InfiniteSequence(() => {
      const current = a;
      a = b;
      b = current + b;
      return current;
    });
  }

  /**
   * An infinite loop of the given values.
   *
   * @example
   * ```ts
   * cycle(1, 2, 3).take(7); // [1, 2, 3, 1, 2, 3, 1]
   * ```
   */
  static cycle<T>(...values: T[]): InfiniteSequence<T> {
    if (values.length === 0) {
      throw new Error("cycle() requires at least one value");
    }
    return new InfiniteSequence((i) => values[i % values.length]);
  }

  /**
   * Infinite repeating sequence of a single value.
   *
   * @example
   * ```ts
   * constant(42).take(3); // [42, 42, 42]
   * ```
   */
  static constant<T>(value: T): InfiniteSequence<T> {
    return new InfiniteSequence(() => value);
  }

  /**
   * Arithmetic progression starting from `start` with a given `step`.
   *
   * @example
   * ```ts
   * range(1, 2).take(5); // [1, 3, 5, 7, 9]
   * range(10, -1).take(3); // [10, 9, 8]
   * ```
   */
  static range(start: number, step: number = 1): InfiniteSequence<number> {
    return new InfiniteSequence((i) => start + i * step);
  }

  /**
   * Build a sequence from a seed value and a next-value function.
   *
   * Each call advances the seed. Useful for stateful sequences
   * like Collatz, Conway's look-and-say, etc.
   *
   * @example
   * ```ts
   * const powersOf2 = InfiniteSequence.fromSeed(1, (n) => n * 2);
   * powersOf2.take(5); // [1, 2, 4, 8, 16]
   * ```
   */
  static fromSeed<S>(seed: S, next: (current: S) => S): InfiniteSequence<S> {
    let current = seed;
    return new InfiniteSequence(() => {
      const value = current;
      current = next(current);
      return value;
    });
  }
}

// ── Module-level convenience helpers ────────────────────

/** Alias for {@link InfiniteSequence.naturals} */
export function naturals(): InfiniteSequence<number> {
  return InfiniteSequence.naturals();
}

/** Alias for {@link InfiniteSequence.fibonacci} */
export function fibonacci(): InfiniteSequence<number> {
  return InfiniteSequence.fibonacci();
}

/** Alias for {@link InfiniteSequence.constant} */
export function constant<T>(value: T): InfiniteSequence<T> {
  return InfiniteSequence.constant(value);
}

/** Alias for {@link InfiniteSequence.range} */
export function range(start: number, step?: number): InfiniteSequence<number> {
  return InfiniteSequence.range(start, step);
}

/** Alias for {@link InfiniteSequence.cycle} */
export function cycle<T>(...values: T[]): InfiniteSequence<T> {
  return InfiniteSequence.cycle(...values);
}
