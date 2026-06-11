/**
 * Infinite sequence iterator utility.
 *
 * Provides a generator-based infinite sequence with safe iteration
 * helpers to prevent accidental infinite loops.
 */

export interface SequenceOptions {
  /** Starting value for the sequence. Defaults to 0. */
  start?: number;
  /** Step increment. Defaults to 1. */
  step?: number;
}

/**
 * Creates an infinite sequence generator.
 *
 * @param options - Configuration for the sequence
 * @yields Numbers in the sequence
 *
 * @example
 * 