/**
 * Infinite sequence generator utility.
 *
 * Produces a lazy iterable that yields values indefinitely based on a
 * seed value and a transformation function. Supports safe bounded
 * iteration through `take()` to prevent infinite loops.
 *
 * @example
 * ```ts
 * // Natural numbers: 1, 2, 3, 4, ...
 * const naturals = infiniteSequence(1, (n) => n + 1);
 * const firstFive = [...take(naturals, 5)]; // [1, 2, 3, 4, 5]
 *
 * // Powers of 2: 1, 2, 4, 8, 16, ...
 * const powers = infiniteSequence(1, (n) => n * 2);
 * ```
 *
 * @param seed - The starting value.
 * @param transform - Function that computes the next value from the current.
 */
export function* infiniteSequence<T>(
  seed: T,
  transform: (current: T, index: number) => T,
): Generator<T, never, void> {
  let current = seed;
  let index = 0;
  while (true) {
    yield current;
    current = transform(current, index);
    index++;
  }
}

/**
 * Take the first `count` elements from an iterable.
 *
 * Safety wrapper to cap iteration on potentially infinite sequences.
 *
 * @example
 * ```ts
 * const nums = infiniteSequence(0, (n) => n + 2); // 0, 2, 4, 6, ...
 * const evens = [...take(nums, 5)]; // [0, 2, 4, 6, 8]
 * ```
 */
export function* take<T>(
  iterable: Iterable<T>,
  count: number,
): Generator<T, void, void> {
  let i = 0;
  for (const value of iterable) {
    if (i >= count) return;
    yield value;
    i++;
  }
}

/** Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, ...) */
export function* fibonacci(): Generator<number, never, void> {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
