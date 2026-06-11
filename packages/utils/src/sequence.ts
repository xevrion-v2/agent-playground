/**
 * Infinite sequence utility with safe iteration.
 * 
 * Provides generators for common infinite sequences with
 * built-in safety limits to prevent accidental infinite loops.
 */

export interface SequenceOptions {
  /** Maximum number of values to yield before stopping. */
  maxIterations?: number;
}

const DEFAULT_MAX_ITERATIONS = 10000;

/**
 * Creates an infinite sequence of natural numbers (1, 2, 3, ...).
 * 
 * @param start - The starting number (default: 1)
 * @param step - The increment step (default: 1)
 * @param options - Safety options
 * @yields Numbers in the sequence
 * 
 * @example
 * 