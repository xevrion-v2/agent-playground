/**
 * Infinite Sequence Iterator
 *
 * A utility for generating infinite sequences with safe iteration.
 * Provides multiple sequence types with built-in limits to prevent
 * accidental infinite loops.
 */

export interface SequenceOptions {
  /** Maximum number of iterations before stopping (default: 10000) */
  maxIterations?: number;
}

/**
 * Creates an infinite sequence generator with a safety limit.
 * @param start - Starting number (default: 0)
 * @param step - Increment step (default: 1)
 * @param options - Configuration options
 * @yields Numbers in the sequence
 */
export function* infiniteSequence(
  start: number = 0,
  step: number = 1,
  options: SequenceOptions = {}
): Generator<number, void, unknown> {
  const { maxIterations = 10000 } = options;
  let current = start;
  let count = 0;

  while (count < maxIterations) {
    yield current;
    current += step;
    count++;
  }

  throw new Error(
    `Infinite sequence safety limit reached (${maxIterations} iterations). ` +
    'Use a larger maxIterations option or break out of the loop earlier.'
  );
}

/**
 * Creates an infinite repeating cycle from an array.
 * @param items - Array of items to cycle through
 * @param options - Configuration options
 * @yields Items from the array, looping infinitely
 */
export function* infiniteCycle<T>(
  items: T[],
  options: SequenceOptions = {}
): Generator<T, void, unknown> {
  if (items.length === 0) {
    throw new Error('Cannot cycle over an empty array');
  }

  const { maxIterations = 10000 } = options;
  let count = 0;

  while (count < maxIterations) {
    for (const item of items) {
      if (count >= maxIterations) break;
      yield item;
      count++;
    }
  }

  throw new Error(
    `Infinite cycle safety limit reached (${maxIterations} iterations). ` +
    'Use a larger maxIterations option or break out of the loop earlier.'
  );
}

export default infiniteSequence;