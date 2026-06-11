/**
 * Infinite Sequence Iterator
 *
 * A utility for generating and safely iterating over infinite sequences.
 * Provides built-in safety mechanisms to prevent accidental infinite loops.
 */

export interface SequenceOptions {
  /** Maximum number of iterations before throwing a safety error. Defaults to 10,000. */
  maxIterations?: number;
}

export interface SequenceResult<T> {
  value: T;
  index: number;
}

/**
 * Creates an infinite sequence generator with a safety limit.
 *
 * @param generator - A function that produces the next value given the current index
 * @param options - Configuration for the sequence
 * @returns An iterable that safely limits iteration
 *
 * @example
 * 