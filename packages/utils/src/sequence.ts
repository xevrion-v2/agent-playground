/**
 * Infinite Sequence Iterator
 *
 * A utility for creating and iterating over infinite sequences safely.
 * Provides multiple sequence types with built-in limits to prevent
 * infinite loops in production code.
 */

export interface SequenceOptions {
  /** Maximum number of iterations before stopping. Default: 10000 */
  maxIterations?: number;
}

export interface SequenceResult<T> {
  value: T;
  index: number;
}

/**
 * Base class for infinite sequences with safe iteration.
 */
export abstract class InfiniteSequence<T> {
  protected maxIterations: number;

  constructor(options: SequenceOptions = {}) {
    this.maxIterations = options.maxIterations ?? 10000;
  }

  /**
   * Generate the next value in the sequence.
   */
  abstract next(index: number): T;

  /**
   * Iterate over the sequence safely with a limit.
   * Yields values until maxIterations is reached.
   */
  *[Symbol.iterator](): Iterator<T> {
    for (let i = 0; i < this.maxIterations; i++) {
      yield this.next(i);
    }
  }

  /**
   * Take exactly n values from the sequence.
   */
  take(n: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < Math.min(n, this.maxIterations); i++) {
      result.push(this.next(i));
    }
    return result;
  }

  /**
   * Find the first value that satisfies the predicate.
   */
  find(predicate: (value: T, index: number) => boolean): T | undefined {
    for (let i = 0; i < this.maxIterations; i++) {
      const value = this.next(i);
      if (predicate(value, i)) {
        return value;
      }
    }
    return undefined;
  }
}

/**
 * Natural number sequence: 0, 1, 2, 3, ...
 */
export class NaturalNumbers extends InfiniteSequence<number> {
  next(index: number): number {
    return index;
  }
}

/**
 * Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, ...
 */
export class Fibonacci extends InfiniteSequence<number> {
  next(index: number): number {
    if (index === 0) return 0;
    if (index === 1) return 1;
    let a = 0, b = 1;
    for (let i = 2; i <= index; i++) {
      [a, b] = [b, a + b];
    }
    return b;
  }
}

/**
 * Arithmetic sequence with given start and step.
 */
export class ArithmeticSequence extends InfiniteSequence<number> {
  constructor(
    private start: number = 0,
    private step: number = 1,
    options?: SequenceOptions
  ) {
    super(options);
  }

  next(index: number): number {
    return this.start + index * this.step;
  }
}

/**
 * Geometric sequence with given start and ratio.
 */
export class GeometricSequence extends InfiniteSequence<number> {
  constructor(
    private start: number = 1,
    private ratio: number = 2,
    options?: SequenceOptions
  ) {
    super(options);
  }

  next(index: number): number {
    return this.start * Math.pow(this.ratio, index);
  }
}

/**
 * Create a custom sequence from a generator function.
 */
export class CustomSequence<T> extends InfiniteSequence<T> {
  constructor(
    private generator: (index: number) => T,
    options?: SequenceOptions
  ) {
    super(options);
  }

  next(index: number): T {
    return this.generator(index);
  }
}

export default InfiniteSequence;