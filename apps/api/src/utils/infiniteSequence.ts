/**
 * Infinite sequence iterator
 * Generates an infinite sequence of numbers starting from a given value
 */
export function* infiniteSequence(start: number = 0): Generator<number, never, unknown> {
  let current = start;
  while (true) {
    yield current++;
  }
}
