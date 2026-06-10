/**
 * Infinite sequence iterator that generates values on demand.
 * Supports numeric sequences, custom generators, and safe iteration
 * with built-in limits to prevent accidental infinite loops.
 */

export interface SequenceOptions<T> {
  /** Initial value or starting state */
  initial: T;
  /** Function to generate the next value from the current one */
  next: (current: T) => T;
  /** Optional maximum number of iterations for safe consumption */
  maxIterations?: number;
}

/**
 * Creates an infinite sequence iterator with safe iteration bounds.
 * 
 * @example
 * 