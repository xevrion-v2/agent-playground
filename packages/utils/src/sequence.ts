/**
 * Infinite Sequence Iterator
 *
 * A utility for creating and safely iterating over infinite sequences.
 * Provides generators for common infinite sequences with built-in
 * safety mechanisms to prevent accidental infinite loops.
 */

/**
 * Options for controlling infinite sequence iteration.
 */
export interface SequenceOptions {
  /** Maximum number of values to generate (default: 1000) */
  maxIterations?: number;
}

const DEFAULT_MAX_ITERATIONS = 1000;

/**
 * Creates a generator that yields an infinite sequence of numbers
 * starting from a given value and incrementing by a step.
 *
 * @param start - The starting value (default: 0)
 * @param step - The increment step (default: 1)
 * @yields The next number in the sequence
 *
 * @example
 * 