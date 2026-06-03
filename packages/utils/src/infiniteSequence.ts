/**
 * InfiniteSequence - A utility for creating and safely iterating over infinite sequences.
 *
 * This module provides a class and helper functions to generate infinite sequences
 * with controlled iteration, preventing accidental infinite loops in production code.
 */

/**
 * Options for creating an InfiniteSequence.
 */
export interface InfiniteSequenceOptions {
  /** Maximum number of iterations before an error is thrown (default: 1,000,000) */
  maxIterations?: number;
  /** Whether to throw an error when maxIterations is reached (default: true) */
  throwOnLimit?: boolean;
}

/**
 * A generator function type that produces an infinite sequence.
 */
export type SequenceGenerator<T> = (previous: T | undefined, index: number) => T;

/**
 * InfiniteSequence provides a safe way to create and iterate over infinite sequences.
 *
 * @example
 * ```typescript
 * // Create an infinite sequence of natural numbers
 * const naturals = new InfiniteSequence<number>((prev) => (prev ?? 0) + 1);
 *
 * // Safely take the first 5 values
 * const firstFive = naturals.take(5);
 * console.log(firstFive); // [1, 2, 3, 4, 5]
 *
 * // Iterate with a limit
 * for (const value of naturals.take(3)) {
 *   console.log(value);
 * }
 * ```
 */
export class InfiniteSequence<T> {
  private generator: SequenceGenerator<T>;
  private options: Required<InfiniteSequenceOptions>;

  constructor(generator: SequenceGenerator<T>, options?: InfiniteSequenceOptions) {
    this.generator = generator;
    this.options = {
      maxIterations: options?.maxIterations ?? 1_000_000,
      throwOnLimit: options?.throwOnLimit ?? true,
    };
  }

  /**
   * Returns an iterator that yields values from the infinite sequence.
   * The iterator has a safety limit to prevent infinite loops.
   */
  *[Symbol.iterator](): Iterator<T> {
    let previous: T | undefined;
    let index = 0;

    while (index < this.options.maxIterations) {
      const value = this.generator(previous, index);
      previous = value;
      index++;
      yield value;
    }

    if (this.options.throwOnLimit) {
      throw new Error(
        `InfiniteSequence: Reached maximum iteration limit of ${this.options.maxIterations}. ` +
        `Use .take(n) or provide a larger maxIterations option.`
      );
    }
  }

  /**
   * Takes the first `count` values from the infinite sequence.
   * This is the safe way to extract a finite number of elements.
   */
  take(count: number): T[] {
    if (count < 0) {
      throw new Error('Count must be non-negative');
    }

    const result: T[] = [];
    let previous: T | undefined;
    let index = 0;

    while (index < count) {
      const value = this.generator(previous, index);
      previous = value;
      result.push(value);
      index++;
    }

    return result;
  }

  /**
   * Maps each value in the sequence using the provided function.
   * Returns a new InfiniteSequence.
   */
  map<U>(fn: (value: T, index: number) => U): InfiniteSequence<U> {
    const originalGenerator = this.generator;
    return new InfiniteSequence<U>((prev, index) => {
      const originalPrev = prev as unknown as T | undefined;
      const originalValue = originalGenerator(originalPrev, index);
      return fn(originalValue, index);
    }, this.options);
  }

  /**
   * Filters values in the sequence based on a predicate.
   * Returns a new InfiniteSequence.
   */
  filter(predicate: (value: T, index: number) => boolean): InfiniteSequence<T> {
    const originalGenerator = this.generator;
    return new InfiniteSequence<T>((prev, index) => {
      let value = originalGenerator(prev, index);
      while (!predicate(value, index)) {
        value = originalGenerator(value, index + 1);
      }
      return value;
    }, this.options);
  }
}

/**
 * Creates an infinite sequence of natural numbers starting from 1.
 *
 * @example
 * ```typescript
 * const naturals = naturalNumbers();
 * console.log(naturals.take(5)); // [1, 2, 3, 4, 5]
 * ```
 */
export function naturalNumbers(options?: InfiniteSequenceOptions): InfiniteSequence<number> {
  return new InfiniteSequence<number>((prev) => (prev ?? 0) + 1, options);
}

/**
 * Creates an infinite sequence that repeats the given value.
 *
 * @example
 * ```typescript
 * const ones = repeat(1);
 * console.log(ones.take(3)); // [1, 1, 1]
 * ```
 */
export function repeat<T>(value: T, options?: InfiniteSequenceOptions): InfiniteSequence<T> {
  return new InfiniteSequence<T>(() => value, options);
}

/**
 * Creates an infinite sequence by applying a function to each index.
 *
 * @example
 * ```typescript
 * const squares = generate((_, i) => (i + 1) ** 2);
 * console.log(squares.take(4)); // [1, 4, 9, 16]
 * ```
 */
export function generate<T>(
  fn: (index: number) => T,
  options?: InfiniteSequenceOptions
): InfiniteSequence<T> {
  return new InfiniteSequence<T>((_, index) => fn(index), options);
}
