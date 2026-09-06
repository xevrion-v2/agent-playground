/**
 * Creates an infinite lazy sequence from a generator function.
 * Supports map, filter, take, and toArray for safe consumption.
 *
 * @example
 * ```ts
 * const naturals = sequence(function* () { let n = 1; while (true) yield n++; });
 * naturals.pipe(
 *   seq => seq.filter(n => n % 2 === 0),
 *   seq => seq.map(n => n * n),
 *   seq => seq.take(5)
 * ).toArray(); // [4, 16, 36, 64, 100]
 * ```
 */
export class Sequence<T> {
  private gen: () => Generator<T>;

  constructor(gen: () => Generator<T>) {
    this.gen = gen;
  }

  *[Symbol.iterator](): Iterator<T> {
    yield* this.gen();
  }

  map<U>(fn: (value: T) => U): Sequence<U> {
    const self = this;
    return new Sequence(function* () {
      for (const value of self.gen()) yield fn(value);
    });
  }

  filter(predicate: (value: T) => boolean): Sequence<T> {
    const self = this;
    return new Sequence(function* () {
      for (const value of self.gen()) {
        if (predicate(value)) yield value;
      }
    });
  }

  take(count: number): Sequence<T> {
    const self = this;
    return new Sequence(function* () {
      let i = 0;
      for (const value of self.gen()) {
        if (i++ >= count) break;
        yield value;
      }
    });
  }

  /**
   * Safe chaining: pipes the sequence through one or more transform functions.
   * Each function receives a Sequence and returns a Sequence.
   */
  pipe<R>(...fns: Array<(seq: Sequence<any>) => Sequence<any>>): Sequence<R> {
    let result: Sequence<any> = this;
    for (const fn of fns) result = fn(result);
    return result as Sequence<R>;
  }

  toArray(): T[] {
    return [...this.gen()];
  }
}

/**
 * Create an infinite sequence from a generator function.
 * Always pair with .take() or another limiting transform before calling .toArray().
 */
export function sequence<T>(gen: () => Generator<T>): Sequence<T> {
  return new Sequence(gen);
}
