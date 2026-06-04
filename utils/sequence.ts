/**
 * Infinite sequence iterator utility with safe iteration helpers.
 * Provides lazy, composable generators that can be safely consumed
 * with a bounded number of elements.
 */

/**
 * Create an infinite sequence from a generator function.
 * The sequence is lazy — values are computed only on demand.
 *
 * @param generator - A generator function that yields values indefinitely.
 * @returns An object with combinators for safe iteration.
 */
export function sequence<T>(generator: () => Generator<T>) {
  return {
    /** Take the first n elements from the sequence. */
    take(n: number): T[] {
      const gen = generator();
      const result: T[] = [];
      for (let i = 0; i < n; i++) {
        const next = gen.next();
        if (next.done) break;
        result.push(next.value);
      }
      return result;
    },

    /** Transform each element with a mapping function. */
    map<U>(fn: (value: T) => U): () => Generator<U> {
      return function* () {
        const gen = generator();
        for (const value of gen) {
          yield fn(value);
        }
      };
    },

    /** Filter elements by a predicate. */
    filter(fn: (value: T) => boolean): () => Generator<T> {
      return function* () {
        const gen = generator();
        for (const value of gen) {
          if (fn(value)) yield value;
        }
      };
    }
  };
}

/**
 * Infinite sequence of natural numbers starting from 1.
 */
export function* naturals(): Generator<number> {
  let n = 1;
  while (true) {
    yield n++;
  }
}

/**
 * Infinite Fibonacci sequence.
 */
export function* fibonacci(): Generator<number> {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/**
 * Infinite sequence of even numbers starting from 2.
 */
export function* evens(): Generator<number> {
  let n = 2;
  while (true) {
    yield n;
    n += 2;
  }
}

// Example usage:
// const first10Naturals = sequence(naturals).take(10);  // [1, 2, 3, ..., 10]
// const first10Fibs = sequence(fibonacci).take(10);     // [0, 1, 1, 2, 3, 5, ...]
// const first5Evens = sequence(evens).take(5);          // [2, 4, 6, 8, 10]
