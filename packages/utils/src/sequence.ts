/**
 * Infinite sequence iterator utility.
 * 
 * Provides a safe, lazy iterator for generating infinite sequences
 * with built-in limits to prevent runaway iteration.
 */

export interface SequenceOptions {
  /** Starting value for the sequence (default: 0) */
  start?: number;
  /** Step increment (default: 1) */
  step?: number;
  /** Maximum safe iterations before throwing (default: 1_000_000) */
  maxIterations?: number;
}

/**
 * Creates an infinite sequence generator with safety limits.
 * 
 * @example
 * 