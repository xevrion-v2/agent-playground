/**
 * Infinite Sequence Iterator Utility
 * 
 * A utility for creating and working with infinite sequences in a safe manner.
 */

/**
 * Creates an infinite sequence iterator
 * @template T
 * @param {() => T} generator - Function that generates the next value in the sequence
 * @param {() => boolean} [shouldStop] - Optional function to determine when to stop iteration
 * @returns {Object} Iterator object with methods to work with the sequence
 */
function createInfiniteSequence(generator, shouldStop) {
  let current = null;
  
  return {
    /**
     * Get the next value in the sequence
     * @returns {T} The next generated value
     */
    next() {
      if (shouldStop && shouldStop()) {
        return { done: true };
      }
      current = generator();
      return { value: current, done: false };
    },
    
    /**
     * Get the current value without advancing the sequence
     * @returns {T} The current value
     */
    current() {
      return current;
     },
    
    /**
     * Reset the sequence
     */
    reset() {
      current = null;
    },
    
    /**
     * Map function over the sequence
     * @template R
     * @param {(value: T) => R} fn - The mapping function
     * @returns {R} Mapped value
     */
    map(fn) {
      return fn(this.next().value);
    }
  };
}

module.exports = { createInfiniteSequence };
