/**
 * Infinite sequence iterator with safe iteration examples.
 * Implements lazy evaluation to prevent memory exhaustion.
 * Related to issue #15
 */
export interface SequenceIterator<T> extends Iterator<T> {
  /** Safely take n items from the infinite sequence */
  take(n: number): T[];
  /** Skip n items and return a new iterator starting from position n */
  skip(n: number): SequenceIterator<T>;
  /** Map each item through a transform function (lazy) */
  map<U>(fn: (item: T, index: number) => U): SequenceIterator<U>;
  /** Filter items by predicate (lazy) */
  filter(predicate: (item: T, index: number) => boolean): SequenceIterator<T>;
}

/**
 * Creates an infinite sequence iterator from a generator function.
 * @param generator - A generator function that yields values indefinitely
 * @returns A SequenceIterator with safe consumption methods
 *
 * @example
 * ```ts
 * // Natural numbers starting from 0
 * const naturals = createSequence(function* () {
 *   let n = 0;
 *   while (true) yield n++;
 * });
 *
 * // Safe consumption: take first 5
 * console.log(naturals.take(5)); // [0, 1, 2, 3, 4]
 *
 * // Chaining: even squares
 * const evenSquares = naturals
 *   .filter(n => n % 2 === 0)
 *   .map(n => n * n);
 * console.log(evenSquares.take(4)); // [0, 4, 16, 36]
 * ```
 */
export function createSequence<T>(
  generator: () => Generator<T, void, unknown>
): SequenceIterator<T> {
  const makeIterator = (genFactory: () => Generator<T, void, unknown>): SequenceIterator<T> => {
    const gen = genFactory();
    let index = 0;

    const iter: SequenceIterator<T> = {
      next(): IteratorResult<T> {
        const result = gen.next();
        if (!result.done) index++;
        return result;
      },

      take(n: number): T[] {
        if (n <= 0) return [];
        const results: T[] = [];
        for (let i = 0; i < n; i++) {
          const val = gen.next();
          if (val.done) break;
          results.push(val.value);
        }
        return results;
      },

      skip(count: number): SequenceIterator<T> {
        // Consume `count` items from current generator, then wrap remainder
        for (let i = 0; i < count; i++) {
          const r = gen.next();
          if (r.done) break;
        }
        // Return a new iterator that continues from this generator's state
        return {
          ...makeIterator(() => gen),
          take: iter.take.bind(iter),
          skip: iter.skip.bind(iter),
          map: iter.map.bind(iter),
          filter: iter.filter.bind(iter),
          next: iter.next.bind(iter),
        };
      },

      map<U>(fn: (item: T, idx: number) => U): SequenceIterator<U> {
        return createSequence(function* () {
          let idx = 0;
          while (true) {
            const val = gen.next();
            if (val.done) return;
            yield fn(val.value, idx++);
          }
        });
      },

      filter(predicate: (item: T, idx: number) => boolean): SequenceIterator<T> {
        return createSequence(function* () {
          let idx = 0;
          while (true) {
            const val = gen.next();
            if (val.done) return;
            if (predicate(val.value, idx++)) {
              yield val.value;
            }
          }
        });
      },
    };

    return iter;
  };

  return makeIterator(generator);
}

/**
 * Pre-built infinite sequences for common use cases.
 */
export const Sequences = {
  /** Natural numbers: 0, 1, 2, 3, ... */
  naturals: () =>
    createSequence(function* () {
      let n = 0;
      while (true) yield n++;
    }),

  /** Positive integers: 1, 2, 3, 4, ... */
  positives: () =>
    createSequence(function* () {
      let n = 1;
      while (true) yield n++;
    }),

  /** Fibonacci: 0, 1, 1, 2, 3, 5, 8, ... */
  fibonacci: () =>
    createSequence(function* () {
      let a = 0, b = 1;
      while (true) {
        yield a;
        [a, b] = [b, a + b];
      }
    }),

  /** Powers of 2: 1, 2, 4, 8, 16, ... */
  powersOfTwo: () =>
    createSequence(function* () {
      let n = 1;
      while (true) {
        yield n;
        n *= 2;
      }
    }),

  /** Repeat a value infinitely */
  repeat: <T>(value: T) =>
    createSequence(function* () {
      while (true) yield value;
    }),

  /** Cycle through an array infinitely */
  cycle: <T>(items: T[]) =>
    createSequence(function* () {
      if (items.length === 0) return;
      let i = 0;
      while (true) {
        yield items[i % items.length];
        i++;
      }
    }),
};
