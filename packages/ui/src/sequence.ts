/**
 * Infinite sequence utility with safe iteration.
 * Generates an infinite sequence of values starting from `start`,
 * applying `step` function to produce the next value.
 *
 * @example
 * const naturals = infiniteSequence(0, n => n + 1);
 * console.log([...take(naturals, 5)]); // [0, 1, 2, 3, 4]
 *
 * @example
 * const evens = infiniteSequence(0, n => n + 2);
 * for (const n of take(evens, 3)) {
 *   console.log(n); // 0, 2, 4
 * }
 */
export function* infiniteSequence<T>(
  start: T,
  step: (current: T) => T
): Generator<T, never, unknown> {
  let current = start;
  while (true) {
    yield current;
    current = step(current);
  }
}

/**
 * Take the first `count` values from an iterable.
 * This is safe because it only consumes a limited number of items
 * from an infinite iterator.
 */
export function take<T>(iterable: Iterable<T>, count: number): T[] {
  const result: T[] = [];
  const iterator = iterable[Symbol.iterator]();
  for (let i = 0; i < count; i++) {
    const next = iterator.next();
    if (next.done) break;
    result.push(next.value);
  }
  return result;
}
