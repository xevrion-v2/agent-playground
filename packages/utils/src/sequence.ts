/**
 * Creates an infinite iterator that yields values produced by the given function.
 *
 * @param fn - A function that receives the current index and returns the next value.
 * @returns An iterable that yields values indefinitely.
 *
 * @example
 * ```ts
 * // Natural numbers: 0, 1, 2, 3, …
 * const naturals = infiniteSequence((i) => i);
 *
 * // Fibonacci-style (each value is the index squared)
 * const squares = infiniteSequence((i) => i * i);
 * ```
 */
export function* infiniteSequence<T>(fn: (index: number) => T): IterableIterator<T> {
  let i = 0;
  while (true) {
    yield fn(i++);
  }
}

/**
 * Safely takes a fixed number of values from an iterator.
 *
 * @param iterable - Any iterable to draw values from.
 * @param count - How many values to collect.
 * @returns An array of the collected values.
 */
export function take<T>(iterable: Iterable<T>, count: number): T[] {
  const result: T[] = [];
  for (const value of iterable) {
    if (result.length >= count) break;
    result.push(value);
  }
  return result;
}

/* ── Safe iteration examples ── */

// 1. Natural numbers
const naturals = take(infiniteSequence((i) => i), 5);
console.log("Naturals:", naturals); // [0, 1, 2, 3, 4]

// 2. Powers of two
const powersOfTwo = take(infiniteSequence((i) => 2 ** i), 8);
console.log("Powers of 2:", powersOfTwo); // [1, 2, 4, 8, 16, 32, 64, 128]

// 3. Even numbers
const evens = take(infiniteSequence((i) => i * 2), 6);
console.log("Evens:", evens); // [0, 2, 4, 6, 8, 10]
