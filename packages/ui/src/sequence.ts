/**
 * Creates an infinite sequence starting from `start`, incrementing by `step` each iteration.
 *
 * @param start - The starting value (default: 0)
 * @param step  - The increment between values (default: 1)
 * @returns     - An object with a `next()` method that returns the next value in the sequence
 *
 * @example
 * const seq = sequence(1, 2);
 * seq.next(); // 1
 * seq.next(); // 3
 * seq.next(); // 5
 */
export function sequence(start = 0, step = 1) {
  let current = start;
  return {
    next(): number {
      const value = current;
      current += step;
      return value;
    },
  };
}
