/**
 * Infinite sequence iterator utility.
 *
 * Provides a safe, lazy iterator for generating infinite sequences
 * with configurable step sizes and optional bounds.
 */

export interface SequenceOptions {
  /** Starting value of the sequence (default: 0) */
  start?: number;
  /** Step increment (default: 1) */
  step?: number;
}

/**
 * Creates an infinite sequence iterator.
 *
 * @param options - Configuration for the sequence
 * @returns An iterable iterator that generates values on demand
 *
 * @example
 * 