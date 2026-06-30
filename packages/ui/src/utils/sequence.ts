/**
 * Infinite sequence utility with safe iteration examples.
 * Provides generators for common infinite sequences with take() helper.
 */

/**
 * Generates an infinite sequence of natural numbers starting from 0.
 */
export function* naturals(): Generator<number> {
  let n = 0;
  while (true) {
    yield n++;
  }
}

/**
 * Generates an infinite Fibonacci sequence.
 */
export function* fibonacci(): Generator<number> {
  let a = 0,
    b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/**
 * Takes the first N values from any generator.
 */
export function* take<T>(generator: Generator<T>, n: number): Generator<T> {
  let count = 0;
  for (const value of generator) {
    if (count >= n) return;
    yield value;
    count++;
  }
}

/**
 * Converts the first N values of a generator to an array.
 */
export function takeArray<T>(generator: Generator<T>, n: number): T[] {
  return [...take(generator, n)];
}
