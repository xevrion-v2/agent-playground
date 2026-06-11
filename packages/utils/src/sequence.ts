/**
 * Infinite sequence utility with safe iteration.
 * Provides generators for common infinite sequences with
 * built-in limits to prevent runaway execution.
 */

/**
 * Options for controlling infinite sequence iteration.
 */
export interface SequenceOptions {
  /** Maximum number of values to yield before stopping. */
  maxIterations?: number;
  /** Starting value for the sequence. */
  start?: number;
  /** Step increment between values. */
  step?: number;
}

const DEFAULT_MAX_ITERATIONS = 10000;

/**
 * Creates an infinite arithmetic sequence generator.
 * Safely bounded by maxIterations to prevent infinite loops.
 *
 * @example
 * 