/**
 * An infinite sequence with safe bounded consumption.
 * Prevents infinite loops by requiring explicit `take(n)` limits.
 *
 * @example
 * ```ts
 * const seq = new InfiniteSequence((n) => n + 1);
 * seq.take(5); // [1, 2, 3, 4, 5]
 * ```
 */
export class InfiniteSequence<T> {
  private generator: (index: number) => T;
  private index = 0;

  constructor(generator: (index: number) => T) {
    this.generator = generator;
  }

  /** Get the next value. */
  next(): T {
    return this.generator(this.index++);
  }

  /**
   * Take the next `n` values from the sequence.
   * @throws If n is negative.
   */
  take(n: number): T[] {
    if (n < 0) throw new RangeError("n must be non-negative");
    const result: T[] = [];
    for (let i = 0; i < n; i++) result.push(this.next());
    return result;
  }

  /** Reset back to the start. */
  reset(): void {
    this.index = 0;
  }
}

/** Natural numbers: 1, 2, 3, 4, ... */
export const naturalNumbers = new InfiniteSequence<number>((n) => n + 1);

/** Fibonacci sequence: 0, 1, 1, 2, 3, 5, ... */
export function fibonacci(): InfiniteSequence<number> {
  let a = 0, b = 1;
  return new InfiniteSequence(() => {
    const v = a;
    a = b;
    b = v + b;
    return v;
  });
}

/**
 * Arithmetic progression.
 * @example arithmetic(2, 3) → 2, 5, 8, 11, ...
 */
export function arithmetic(start: number, step: number): InfiniteSequence<number> {
  return new InfiniteSequence((n) => start + n * step);
}

/**
 * Geometric progression.
 * @example geometric(1, 2) → 1, 2, 4, 8, ...
 */
export function geometric(start: number, ratio: number): InfiniteSequence<number> {
  return new InfiniteSequence((n) => start * Math.pow(ratio, n));
}
