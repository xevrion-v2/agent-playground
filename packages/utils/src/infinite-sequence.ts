/**
 * Infinite Sequence Iterator Utility
 * 
 * A utility for creating infinite sequences with safe iteration controls.
 */

/**
 * Creates an infinite sequence starting from a given number with a specified step.
 * 
 * @param start - The starting number (default: 0)
 * @param step - The step increment (default: 1)
 * @returns An infinite sequence iterator
 * 
 * @example
 * // Create an infinite sequence starting from 0
 * const sequence = createInfiniteSequence();
 * const iterator = sequence.next().value;
 * 
 * @example
 * // Create an infinite sequence starting from 10 with step 2
 * const sequence = createInfiniteSequence(10, 2);
 * // First 5 values: 10, 12, 14, 16, 18...
 */
export function* createInfiniteSequence(start = 0, step = 1) {
  let current = start;
  while (true) {
    yield current;
    current += step;
  }
}

/**
 * Safely iterates over an infinite sequence for a specified number of iterations.
 * 
 * @param iterator - The infinite sequence iterator
 * @param limit - Maximum number of iterations (default: 10)
 * @returns Array of generated values
 * 
 * @example
 * // Get first 5 values from an infinite sequence
 * const sequence = createInfiniteSequence(0, 1);
 * const values = take(sequence, 5);
 * console.log(values); // [0, 1, 2, 3, 4]
 */
export function take<T>(iterator: Iterator<T>, limit = 10): T[] {
  const result: T[] = [];
  for (let i = 0; i < limit; i++) {
    const next = iterator.next();
    if (next.done) break;
    result.push(next.value);
  }
  return result;
}

/**
 * Filters an infinite sequence based on a predicate function.
 * 
 * @param iterator - The infinite sequence iterator
 * @param predicate - Function to test each element
 * @param limit - Maximum number of items to collect (default: 10)
 * @returns Array of values that match the predicate
 * 
 * @example
 * // Get first 5 even numbers from an infinite sequence
 * const sequence = createInfiniteSequence(0, 1);
 * const evenNumbers = filter(sequence, (x) => x % 2 === 0, 5);
 * console.log(evenNumbers); // [0, 2, 4, 6, 8]
 */
export function filter<T>(
  iterator: Iterator<T>,
  predicate: (value: T) => boolean,
  limit = 10
): T[] {
  const result: T[] = [];
  let count = 0;
  
  while (result.length < limit) {
    const next = iterator.next();
    if (next.done) break;
    if (predicate(next.value)) {
      result.push(next.value);
    }
  }
  return result;
}