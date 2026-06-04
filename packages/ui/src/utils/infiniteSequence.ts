/**
 * An infinite sequence that yields values on demand.
 *
 * Safe iteration is achieved via:
 * - A `take(n)` method that limits iteration to `n` items.
 * - The iterator itself is an **async iterable** so it can be used
 *   with `for await...of` loops without risking an infinite hang.
 *
 * @typeParam T - The type of values in the sequence.
 *
 * @example
 * ```ts
 * // Fibonacci sequence
 * const fib = infiniteSequence([0, 1], (prev, curr) => prev + curr);
 * for await (const n of fib.take(10)) {
 *   console.log(n); // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
 * }
 * ```
 */
export class InfiniteSequence<T> {
  private seed: T[];
  private nextFn: (prev: T, curr: T) => T;

  /**
   * @param seed   - Initial values to seed the sequence (at least 2 values
   *                 for a recurrence relation; 1 value for a constant stream).
   * @param nextFn - A function that produces the next value given the
   *                 previous two values: `nextFn(prev, current) → next`.
   */
  constructor(seed: T[], nextFn: (prev: T, curr: T) => T) {
    if (!seed || seed.length === 0) {
      throw new Error("InfiniteSequence requires at least one seed value.");
    }
    this.seed = [...seed];
    this.nextFn = nextFn;
  }

  /**
   * Return an async generator that yields all values of the sequence
   * **up to** `count` items. Using an async generator guarantees the
   * consumer can `break` out of the loop safely.
   *
   * @param count - Number of items to yield (must be >= 0).
   * @returns An async generator yielding `count` items.
   */
  async *take(count: number): AsyncGenerator<T, void, unknown> {
    if (count <= 0) return;

    const seq = [...this.seed];
    // Yield the seed values first
    for (let i = 0; i < Math.min(count, seq.length); i++) {
      yield seq[i];
    }

    // Generate remaining values
    while (seq.length < count) {
      const a = seq[seq.length - 2];
      const b = seq[seq.length - 1];
      const next = this.nextFn(a, b);
      seq.push(next);
      yield next;
    }
  }

  /**
   * Collect `count` items into an array.
   *
   * @param count - Number of items to collect.
   * @returns A promise resolving to an array of `count` items.
   */
  async collect(count: number): Promise<T[]> {
    const result: T[] = [];
    for await (const item of this.take(count)) {
      result.push(item);
    }
    return result;
  }
}

/**
 * Create a new infinite sequence.
 *
 * This is a convenience wrapper around the `InfiniteSequence` class.
 *
 * @param seed   - Initial seed values.
 * @param nextFn - Recurrence function.
 * @returns An `InfiniteSequence` instance.
 *
 * @example
 * ```ts
 * const evens = infiniteSequence([0], (_, n) => n + 2);
 * const first5 = await evens.collect(5); // [0, 2, 4, 6, 8]
 * ```
 */
export function infiniteSequence<T>(
  seed: T[],
  nextFn: (prev: T, curr: T) => T,
): InfiniteSequence<T> {
  return new InfiniteSequence(seed, nextFn);
}
