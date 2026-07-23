/**
 * Produces an endless arithmetic sequence.
 *
 * Keep consumption bounded with a helper like {@link take}:
 *
 * ```ts
 * take(infiniteSequence(1, 2), 4); // [1, 3, 5, 7]
 * ```
 */
export function* infiniteSequence(
  start = 0,
  step = 1
): Generator<number, never, void> {
  let current = start;

  while (true) {
    yield current;
    current += step;
  }
}

/**
 * Returns the first `count` values from any iterable.
 *
 * ```ts
 * take(infiniteSequence(), 3); // [0, 1, 2]
 * ```
 */
export function take<T>(iterable: Iterable<T>, count: number): T[] {
  if (count <= 0) {
    return [];
  }

  const values: T[] = [];

  for (const value of iterable) {
    values.push(value);

    if (values.length >= count) {
      break;
    }
  }

  return values;
}
