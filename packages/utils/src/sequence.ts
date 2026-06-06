/**
 * Infinite sequence utility module.
 *
 * Provides a safe, iterable generator for producing infinite sequences
 * with configurable start, step, and optional max iteration limits.
 */

export interface SequenceOptions {
  /** Starting value of the sequence (default: 0) */
  start?: number;
  /** Increment between each value (default: 1) */
  step?: number;
  /** Maximum number of iterations (undefined = truly infinite) */
  maxIterations?: number;
}

/**
 * Creates an infinite (or bounded) sequence generator.
 *
 * @param options - Configuration for the sequence
 * @yields Numbers in the configured sequence
 *
 * @example
 * 