/**
 * Infinite sequence iterator utilities.
 *
 * Provides iterator-based generators for infinite sequences such as
 * natural numbers, Fibonacci numbers, and array cycling.
 *
 * Each function returns an object conforming to the {@link Iterator}
 * and {@link Iterable} protocols via `{ next(), [Symbol.iterator]() }`.
 *
 * @module
 */

/** A single step yielded by an infinite iterator. */
export interface InfiniteIteratorStep<T> {
  /** The current value in the sequence. */
  value: T;
  /** Always `false` – the sequence never terminates. */
  done: false;
}

/**
 * An {@link Iterator} that produces an infinite sequence.
 *
 * Since `done` is always `false`, callers can safely loop until
 * an external condition is met without checking `done`.
 */
export interface InfiniteIterator<T> extends Iterator<T, never, undefined> {
  next(...args: []): InfiniteIteratorStep<T>;
  [Symbol.iterator](): InfiniteIterator<T>;
}

/**
 * Creates an infinite iterator over the natural numbers starting
 * from `start` (default `0`).
 *
 * @param start - The first number in the sequence (default `0`).
 * @returns An {@link InfiniteIterator} yielding `start, start+1, start+2, …`
 *
 * @example
 * ```ts
 * const nums = naturalNumbers(1);
 * nums.next().value; // 1
 * nums.next().value; // 2
 * ```
 */
export function naturalNumbers(start: number = 0): InfiniteIterator<number> {
  let current = start;
  return {
    next(): InfiniteIteratorStep<number> {
      return { value: current++, done: false };
    },
    [Symbol.iterator](): InfiniteIterator<number> {
      return this;
    },
  };
}

/**
 * Creates an infinite iterator over the Fibonacci sequence.
 *
 * The sequence begins with `0, 1, 1, 2, 3, 5, 8, …`.
 *
 * @returns An {@link InfiniteIterator} yielding Fibonacci numbers.
 *
 * @example
 * ```ts
 * const fib = fibonacci();
 * fib.next().value; // 0
 * fib.next().value; // 1
 * fib.next().value; // 1
 * ```
 */
export function fibonacci(): InfiniteIterator<number> {
  let a = 0;
  let b = 1;
  return {
    next(): InfiniteIteratorStep<number> {
      const value = a;
      a = b;
      b = value + b;
      return { value, done: false };
    },
    [Symbol.iterator](): InfiniteIterator<number> {
      return this;
    },
  };
}

/**
 * Creates an infinite iterator that cycles through the elements
 * of `array` repeatedly.
 *
 * @param array - The array whose elements to cycle through.
 * @returns An {@link InfiniteIterator} yielding `array[0], array[1], …, array[n-1], array[0], …`
 *
 * @example
 * ```ts
 * const colors = cycle(['red', 'green', 'blue']);
 * colors.next().value; // 'red'
 * colors.next().value; // 'green'
 * colors.next().value; // 'blue'
 * colors.next().value; // 'red'
 * ```
 */
export function cycle<T>(array: readonly T[]): InfiniteIterator<T> {
  if (array.length === 0) {
    throw new Error("Cannot cycle over an empty array");
  }
  let index = 0;
  return {
    next(): InfiniteIteratorStep<T> {
      const value = array[index];
      index = (index + 1) % array.length;
      return { value, done: false };
    },
    [Symbol.iterator](): InfiniteIterator<T> {
      return this;
    },
  };
}
