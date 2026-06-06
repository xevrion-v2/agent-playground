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
  /** Maximum safe iterations before throwing (default: 10000) */
  maxIterations?: number;
}

/**
 * Creates an infinite sequence generator with safety limits.
 * 
 * @param options - Configuration for the sequence
 * @yields Numbers in the sequence
 * @throws Error if maxIterations is exceeded (safety guard)
 * 
 * @example
 * 