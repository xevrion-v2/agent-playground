/**
 * InfiniteSequence - An infinite sequence generator with safe iteration utilities.
 *
 * Provides a lazy, infinite arithmetic sequence with bounded operations
 * to prevent runaway loops. All "unsafe" iteration is guarded by configurable
 * iteration limits.
 *
 * @example
 *   const seq = new InfiniteSequence(0, 1); // 0, 1, 2, 3, ...
 *   seq.take(5);       // [0, 1, 2, 3, 4]
 *   seq.find(x => x > 10); // 11
 *   seq.iterate(3);    // [0, 1, 2]
 */
export class InfiniteSequence implements Iterable<number> {
  /**
   * Create a new infinite sequence.
   * @param start - The first value in the sequence (default: 0)
   * @param step  - The increment between consecutive values (default: 1)
   */
  constructor(private readonly start: number = 0, private readonly step: number = 1) {}

  /**
   * Native iterator — yields values indefinitely.
   * Use `take()`, `find()`, or `iterate()` for bounded iteration.
   */
  *[Symbol.iterator](): Iterator<number> {
    let current = this.start;
    while (true) {
      yield current;
      current += this.step;
    }
  }

  /**
   * Take the first `n` elements from the sequence.
   * @param n - Number of elements to collect (must be >= 0)
   * @returns Array of the first `n` values
   */
  take(n: number): number[] {
    if (n < 0) {
      throw new RangeError(`take() requires a non-negative count, got ${n}`);
    }
    if (n === 0) {
      return [];
    }
    const result: number[] = [];
    let current = this.start;
    for (let i = 0; i < n; i++) {
      result.push(current);
      current += this.step;
    }
    return result;
  }

  /**
   * Find the first element matching a predicate, with a safety limit.
   * @param predicate - Function to test each element
   * @param maxIterations - Maximum iterations before throwing (default: 10000)
   * @returns The first matching value, or null if none found within limit
   * @throws Error if maxIterations is reached without a match
   */
  find(
    predicate: (value: number) => boolean,
    maxIterations: number = 10000
  ): number | null {
    if (maxIterations < 0) {
      throw new RangeError(`maxIterations must be non-negative, got ${maxIterations}`);
    }
    let current = this.start;
    for (let i = 0; i < maxIterations; i++) {
      if (predicate(current)) {
        return current;
      }
      current += this.step;
    }
    throw new Error(
      `find() reached iteration limit (${maxIterations}) without a match. ` +
        `Increase maxIterations or adjust your predicate.`
    );
  }

  /**
   * Iterate up to `max` steps and return all visited values.
   * A safer alternative to direct iteration over the sequence.
   * @param max - Maximum number of iterations (must be > 0)
   * @returns Array of values collected over `max` iterations
   */
  iterate(max: number): number[] {
    if (max <= 0) {
      throw new RangeError(`iterate() requires a positive count, got ${max}`);
    }
    return this.take(max);
  }

  /**
   * Skip the first `n` elements and return a new InfiniteSequence
   * starting from the (n+1)-th element.
   * @param n - Number of elements to skip (must be >= 0)
   * @returns A new InfiniteSequence
   */
  skip(n: number): InfiniteSequence {
    if (n < 0) {
      throw new RangeError(`skip() requires a non-negative count, got ${n}`);
    }
    return new InfiniteSequence(this.start + n * this.step, this.step);
  }

  /**
   * Filter elements matching a predicate, returning the first `limit` matches.
   * @param predicate - Function to test each element
   * @param limit - Maximum matches to collect (default: 10000)
   * @returns Array of matching values up to `limit`
   */
  filter(
    predicate: (value: number) => boolean,
    limit: number = 10000
  ): number[] {
    if (limit <= 0) {
      return [];
    }
    const result: number[] = [];
    let current = this.start;
    for (let i = 0; i < limit * 10 && result.length < limit; i++) {
      if (predicate(current)) {
        result.push(current);
      }
      current += this.step;
    }
    return result;
  }
}

/**
 * Create an infinite sequence starting from 0 with step 1.
 * Shortcut: `from(0, 1)`
 */
export function naturalNumbers(): InfiniteSequence {
  return new InfiniteSequence(0, 1);
}

/**
 * Create an infinite sequence of even numbers starting from 0.
 */
export function evenNumbers(): InfiniteSequence {
  return new InfiniteSequence(0, 2);
}

/**
 * Create an infinite sequence of odd numbers starting from 1.
 */
export function oddNumbers(): InfiniteSequence {
  return new InfiniteSequence(1, 2);
}

export default InfiniteSequence;
