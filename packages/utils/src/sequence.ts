/**
 * Infinite sequence iterator utility.
 *
 * Provides a generator-based infinite sequence that yields incrementing
 * numbers starting from a given value. Includes safe iteration helpers
 * to prevent accidental infinite loops.
 */

/**
 * Options for creating an infinite sequence.
 */
export interface InfiniteSequenceOptions {
  /** Starting value for the sequence (default: 0) */
  start?: number;
  /** Step increment between values (default: 1) */
  step?: number;
}

/**
 * Creates an infinite generator that yields numbers.
 *
 * @param options - Configuration for the sequence
 * @yields Incrementing numbers based on start and step
 *
 * @example
 * 