/**
 * Infinite sequence iterator utility.
 *
 * Provides a safe, iterable generator for infinite numeric sequences
 * with configurable start, step, and optional limit for safe iteration.
 */

export interface SequenceOptions {
  /** Starting value of the sequence (default: 0) */
  start?: number;
  /** Increment between sequence values (default: 1) */
  step?: number;
}

export interface SafeSequenceOptions extends SequenceOptions {
  /** Maximum number of values to yield before stopping */
  limit: number;
}

/**
 * Creates an infinite generator that yields numbers in an arithmetic sequence.
 *
 * @param options - Configuration for the sequence
 * @yields The next number in the sequence
 *
 * @example
 * 