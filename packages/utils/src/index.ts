/**
 * Infinite sequence iterator utility.
 *
 * Creates a generator that yields an infinite sequence of numbers starting from `start`
 * and incrementing by `step` each iteration.
 *
 * @example Safe iteration with limit
 * ```typescript
 * const seq = infiniteSequence(1);
 * const firstFive = [];
 * for (const n of seq) {
 *   if (firstFive.length >= 5) break;
 *   firstFive.push(n);
 * }
 * // firstFive: [1, 2, 3, 4, 5]
 * ```
 *
 * @example Using with Array.from and slice
 * ```typescript
 * const seq = infiniteSequence(0, 2);
 * const firstThree = Array.from({ length: 3 }, () => seq.next().value);
 * // firstThree: [0, 2, 4]
 * ```
 *
 * @param start - The first value to yield (default: 0)
 * @param step - The increment between values (default: 1)
 * @returns A generator that yields numbers indefinitely
 */
export function* infiniteSequence(start = 0, step = 1): Generator<number, void, unknown> {
  let current = start;
  while (true) {
    yield current;
    current += step;
  }
}

/**
 * Demonstrates safe iteration over an infinite sequence by limiting the number of items.
 * Prints the first `count` items to the console.
 *
 * @example
 * ```typescript
 * demonstrateSafeIteration(3, 0, 2);
 * // Output:
 * // Iteration 1: 0
 * // Iteration 2: 2
 * // Iteration 3: 4
 * ```
 *
 * @param count - Number of items to consume (default: 10)
 * @param start - Start value of the sequence (default: 0)
 * @param step - Step between values (default: 1)
 */
export function demonstrateSafeIteration(count = 10, start = 0, step = 1): void {
  const iterator = infiniteSequence(start, step);
  for (let i = 0; i < count; i++) {
    const { value } = iterator.next();
    console.log(`Iteration ${i + 1}: ${value}`);
  }
}
