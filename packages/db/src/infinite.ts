/**
 * InfiniteSequence - A safe lazy infinite sequence generator.
 *
 * Produces values on demand using an accumulator function. Includes
 * built-in safety guards to prevent unbounded iteration.
 */

export class InfiniteSequence<T> {
  private generator: (prev: T) => T;
  private current: T;
  private iterationCount = 0;

  /** Maximum iterations allowed in a single `.take()` call to prevent runaway loops. */
  static readonly MAX_TAKE = 10_000;

  /**
   * @param seed      Starting value
   * @param generator Function that computes the next value from the previous one
   */
  constructor(seed: T, generator: (prev: T) => T) {
    this.current = seed;
    this.generator = generator;
  }

  /** Return the current value without advancing. */
  peek(): T {
    return this.current;
  }

  /** Advance and return the next value. */
  next(): T {
    this.current = this.generator(this.current);
    this.iterationCount++;
    return this.current;
  }

  /** Collect the next `n` values into an array. */
  take(n: number): T[] {
    if (n < 0) throw new RangeError("take(n) requires n >= 0");
    if (n > InfiniteSequence.MAX_TAKE) {
      throw new RangeError(
        `take(n) limited to ${InfiniteSequence.MAX_TAKE} items`
      );
    }
    const result: T[] = [];
    for (let i = 0; i < n; i++) {
      result.push(this.next());
    }
    return result;
  }

  /** Create a sequence of natural numbers starting from `start`. */
  static naturals(start = 0): InfiniteSequence<number> {
    return new InfiniteSequence(start, (n) => n + 1);
  }

  /** Create a sequence that repeatedly multiplies by a factor (geometric). */
  static geometric(start: number, factor: number): InfiniteSequence<number> {
    return new InfiniteSequence(start, (n) => n * factor);
  }

  /** Create a repeating sequence from an array of values. */
  static cycle<T>(values: T[]): InfiniteSequence<T> {
    if (values.length === 0) throw new Error("cycle requires at least one value");
    let idx = -1;
    return new InfiniteSequence(values[0], () => {
      idx = (idx + 1) % values.length;
      return values[idx];
    });
  }

  /** Total iterations performed so far. */
  get iterations(): number {
    return this.iterationCount;
  }
}
