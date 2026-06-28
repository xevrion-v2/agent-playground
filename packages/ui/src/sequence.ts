/**
 * Infinite sequence iterator factory.
 * Returns an iterator that lazily yields values produced by `fn(index)`.
 *
 * @example
 * const naturals = infiniteSequence(n => n + 1);
 * const first5 = take(naturals(), 5); // [1, 2, 3, 4, 5]
 */
export function* infiniteSequence<T>(fn: (index: number) => T): Generator<T, never, unknown> {
  let i = 0;
  while (true) yield fn(++i);
}

/** Take the first n values from an iterator. */
export function take<T>(iter: Iterator<T>, n: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    const { value, done } = iter.next();
    if (done) break;
    result.push(value);
  }
  return result;
}

/** Infinite sequence of natural numbers: 1, 2, 3, ... */
export const naturals = () => infiniteSequence(n => n);

/** Infinite sequence of Fibonacci numbers. */
export function* fibonacci(): Generator<number, never, unknown> {
  let [a, b] = [0, 1];
  while (true) { yield a; [a, b] = [b, a + b]; }
}
