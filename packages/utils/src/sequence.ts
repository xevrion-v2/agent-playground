/**
 * Infinite Sequence Utilities
 *
 * Provides safe generator-based infinite sequences with iteration limits
to prevent accidental infinite loops.
 */

export interface SequenceOptions {
  /** Maximum number of iterations to prevent infinite loops */
  maxIterations?: number;
}

/**
 * Creates an infinite arithmetic sequence starting at `start` with given `step`.
 * Safely bounded by maxIterations to prevent runaway loops.
 *
 * @param start - First value of the sequence
 * @param step - Increment between values (default: 1)
 * @param options - Sequence configuration options
 * @yields Next number in the sequence
 *
 * @example
 * ```typescript
 * const seq = infiniteSequence(0, 1, { maxIterations: 5 });
 * console.log([...seq]); // [0, 1, 2, 3, 4]
 * ```
 */
export function* infiniteSequence(
  start: number,
  step: number = 1,
  options: SequenceOptions = {}
): Generator<number> {
  const { maxIterations = Number.MAX_SAFE_INTEGER } = options;
  let current = start;
  let count = 0;

  while (count < maxIterations) {
    yield current;
    current += step;
    count++;
  }
}

/**
 * Creates a Fibonacci sequence generator.
 *
 * @param options - Sequence configuration options
 * @yields Next Fibonacci number
 *
 * @example
 * ```typescript
 * const fib = fibonacci({ maxIterations: 8 });
 * console.log([...fib]); // [0, 1, 1, 2, 3, 5, 8, 13]
 * ```
 */
export function* fibonacci(options: SequenceOptions = {}): Generator<number> {
  const { maxIterations = Number.MAX_SAFE_INTEGER } = options;
  let a = 0;
  let b = 1;
  let count = 0;

  while (count < maxIterations) {
    yield a;
    [a, b] = [b, a + b];
    count++;
  }
}

/**
 * Takes up to `n` values from a generator.
 *
 * @param generator - Source generator
 * @param n - Maximum number of values to take
 * @returns Array of taken values
 *
 * @example
 * ```typescript
 * const seq = infiniteSequence(10, 5);
 * console.log(take(seq, 4)); // [10, 15, 20, 25]
 * ```
 */
export function take<T>(generator: Generator<T>, n: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    const next = generator.next();
    if (next.done) break;
    result.push(next.value);
  }
  return result;
}
