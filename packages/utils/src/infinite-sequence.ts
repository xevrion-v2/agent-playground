/**
 * Infinite Sequence Iterator
 *
 * A utility for generating infinite sequences with safe iteration.
 * Provides generators for common infinite sequences with built-in
 * safeguards to prevent accidental infinite loops.
 */

/**
 * Options for controlling infinite sequence iteration
 */
export interface SequenceOptions {
  /** Maximum number of values to generate (safety limit) */
  maxIterations?: number;
}

const DEFAULT_MAX_ITERATIONS = 10000;

/**
 * Creates an infinite sequence generator with a safety limit.
 * Throws an error if the safety limit is exceeded.
 */
function createSafeGenerator<T>(
  generator: () => Generator<T>,
  options: SequenceOptions = {}
): Generator<T> {
  const maxIterations = options.maxIterations ?? DEFAULT_MAX_ITERATIONS;
  let count = 0;

  const inner = generator();

  return {
    next(): IteratorResult<T> {
      if (count >= maxIterations) {
        throw new Error(
          `Infinite sequence safety limit (${maxIterations}) exceeded. ` +
          'Use the maxIterations option to increase the limit, or ensure ' +
          'you are breaking out of the loop appropriately.'
        );
      }
      count++;
      return inner.next();
    },
    return(value?: unknown): IteratorResult<T> {
      return inner.return?.(value) ?? { done: true, value: undefined as unknown as T };
    },
    throw(e?: unknown): IteratorResult<T> {
      return inner.throw?.(e) ?? { done: true, value: undefined as unknown as T };
    },
    [Symbol.iterator](): Generator<T> {
      return this;
    },
  };
}

/**
 * Generates an infinite sequence of natural numbers (0, 1, 2, 3, ...)
 */
export function* naturalNumbers(): Generator<number> {
  let n = 0;
  while (true) {
    yield n++;
  }
}

/**
 * Generates an infinite sequence starting from a given number with a step.
 * @param start - The starting number (default: 0)
 * @param step - The increment step (default: 1)
 */
export function* arithmeticSequence(start = 0, step = 1): Generator<number> {
  let n = start;
  while (true) {
    yield n;
    n += step;
  }
}

/**
 * Creates a safe infinite iterator for natural numbers.
 * @param options - Configuration for safe iteration
 * @returns A generator that yields natural numbers with a safety limit
 *
 * @example
 * 