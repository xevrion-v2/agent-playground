/**
 * Infinite sequence iterator utility.
 *
 * Provides a safe, lazy iterator for generating infinite sequences
 * with configurable step size and optional bounds.
 */

export interface SequenceOptions {
  /** Starting value (default: 0) */
  start?: number;
  /** Step size between each value (default: 1) */
  step?: number;
}

/**
 * Creates an infinite sequence iterator that yields numbers
 * starting from `start` and incrementing by `step` each iteration.
 *
 * @example
 * 