/**
 * Infinite sequence iterator utility.
 *
 * Provides a safe, lazy iterator for generating infinite sequences
 * with built-in limits to prevent runaway iteration.
 */

export interface SequenceOptions {
  /** Starting value for the sequence (default: 0) */
  start?: number;
  /** Increment between each value (default: 1) */
  step?: number;
  /** Maximum number of iterations allowed (default: 10000) */
  maxIterations?: number;
}

/**
 * Creates an infinite sequence iterator with safety limits.
 *
 * @param options - Configuration for the sequence
 * @returns An iterable iterator that yields numbers
 *
 * @example
 * 