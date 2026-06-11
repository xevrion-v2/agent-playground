/**
 * Infinite sequence iterator utility.
 *
 * Provides a safe, configurable way to generate infinite sequences
 * with built-in limits to prevent runaway iteration.
 */

export interface SequenceOptions {
  /** Starting value (default: 0) */
  start?: number;
  /** Increment step (default: 1) */
  step?: number;
  /** Maximum safe iterations before throwing (default: 1_000_000) */
  maxIterations?: number;
}

/**
 * Creates an infinite sequence generator with safety limits.
 *
 * @example
 * 