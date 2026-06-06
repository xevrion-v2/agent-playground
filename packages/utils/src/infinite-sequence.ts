/**
 * InfiniteSequence - A utility class for creating infinite sequences with safe iteration
 * 
 * Example usage:
 * const sequence = new InfiniteSequence((x) => x + 1, 0);
 * for (const value of sequence) {
 *   console.log(value); // 0, 1, 2, 3, ...
 *   if (value > 10) break; // Safe breaking
 * }
 */

export class InfiniteSequence<T> implements Iterable<T> {
  constructor(
    private readonly next: (current: T) => T,
    private readonly initial: T
  ) {}

  *[Symbol.iterator](): Iterator<T> {
    let current = this.initial;
    yield current;
    while (true) {
      current = this.next(current);
      yield current;
    }
  }
}

// Example with Fibonacci sequence
export const FibonacciSequence = new InfiniteSequence(
  ([a, b]: [number, number]): [number, number] => [b, a + b],
  [0, 1]
);

// Example with simple counter
export const CounterSequence = new InfiniteSequence(
  (x: number) => x + 1,
  0
);