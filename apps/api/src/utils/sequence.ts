/**
 * Infinite sequence generation utilities.
 * 
 * Provides safe iteration examples and an infinite sequence generator.
 */

/**
 * Generates an infinite sequence of numbers starting from `start` with a given `step`.
 *
 * @param start - The starting value (default: 0)
 * @param step - The increment step (default: 1)
 * @returns A Generator yielding numbers infinitely.
 *
 * @example
 * ```typescript
 * // Safe iteration using a break condition
 * const seq = infiniteSequence(1, 2); // 1, 3, 5, 7, ...
 * const results: number[] = [];
 * 
 * for (const num of seq) {
 *   results.push(num);
 *   if (results.length >= 5) break; // ALWAYS break out of infinite sequences
 * }
 * console.log(results); // [1, 3, 5, 7, 9]
 * ```
 */
export function* infiniteSequence(start: number = 0, step: number = 1): Generator<number, void, unknown> {
  let current = start;
  while (true) {
    yield current;
    current += step;
  }
}

/**
 * A utility to safely take a specific number of items from any iterable (including infinite sequences).
 * This prevents infinite loops by wrapping the sequence.
 *
 * @param iterable - The source iterable (e.g., an infinite generator)
 * @param count - The maximum number of items to yield
 * @returns A new Generator that yields at most `count` items.
 *
 * @example
 * ```typescript
 * const seq = infiniteSequence(10, 5); // 10, 15, 20, 25, ...
 * const safeSeq = take(seq, 3);
 * 
 * const results = Array.from(safeSeq); // [10, 15, 20]
 * ```
 */
export function* take<T>(iterable: Iterable<T>, count: number): Generator<T, void, unknown> {
  if (count <= 0) return;
  
  let currentCount = 0;
  for (const item of iterable) {
    yield item;
    currentCount++;
    if (currentCount >= count) {
      break;
    }
  }
}
