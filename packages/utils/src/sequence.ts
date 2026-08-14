/**
 * Infinite Sequence Iterator
 *
 * A utility for creating iterable iterators that generate values from
 * a sequence indefinitely. Supports lazy evaluation — values are computed
 * on demand via a generator callback indexed by position.
 *
 * @example
 * ```ts
 * const naturals = createInfiniteSequence(i => i + 1);
 * const it = naturals[Symbol.iterator]();
 * it.next().value; // 1
 * it.next().value; // 2
 * it.next().value; // 3
 *
 * // Or spread into an array (with a finite bound):
 * const first5 = [...(function*(){ for (let i=0; i<5; i++) yield i+1; })()];
 * ```
 */

// ---------------------------------------------------------------------------
// Core factory
// ---------------------------------------------------------------------------

/**
 * Creates an infinite sequence iterator that produces values by calling
 * `generator(index)` for each successive index, starting at 0.
 *
 * The returned object is both an `Iterable<T>` (has `[Symbol.iterator]`)
 * and an `Iterator<T>` (has `next()`), so it can be used directly in
 * `for...of` loops, spread syntax, or manual `.next()` calls.
 *
 * Since the sequence is **infinite**, consuming it with a `for...of` loop
 * or spreading into an array without an explicit bound will never terminate.
 * Always use a finite consumer such as:
 *   - `take(n)` — see {@link take}
 *   - A `for...of` loop with a `break` condition
 *   - Destructuring a known number of elements via `Array.from({ length: n }, ...)`
 *
 * @typeParam T - The element type produced by the sequence.
 * @param generator - A callback `(index: number) => T` that computes the
 *   value at position `index` (0-based). The index is monotonically
 *   increasing with each call.
 * @returns An `IterableIterator<T>` that lazily yields values forever.
 *
 * @example <caption>Natural numbers (1, 2, 3, …)</caption>
 * ```ts
 * const naturals = createInfiniteSequence(i => i + 1);
 * ```
 *
 * @example <caption>Even numbers (0, 2, 4, …)</caption>
 * ```ts
 * const evens = createInfiniteSequence(i => i * 2);
 * ```
 *
 * @example <caption>Fibonacci sequence (0, 1, 1, 2, 3, 5, …)</caption>
 * ```ts
 * const fib = createInfiniteSequence((i, a = 0, b = 1) => ([a, b] = [b, a + b], a));
 * ```
 *
 * @example <caption>Constant value</caption>
 * ```ts
 * const forever42 = createInfiniteSequence(() => 42);
 * ```
 *
 * @example <caption>Using with take() utility</caption>
 * ```ts
 * const first10 = [...take(createInfiniteSequence(i => i + 1), 10)];
 * // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * ```
 */
export function createInfiniteSequence<T>(
  generator: (index: number) => T,
): IterableIterator<T> {
  if (typeof generator !== "function") {
    throw new TypeError(
      `Expected a function as generator, got ${typeof generator}`,
    );
  }

  let index = 0;

  const iterator: Iterator<T> = {
    next(): IteratorResult<T> {
      return { value: generator(index++), done: false };
    },
  };

  const self: IterableIterator<T> = {
    next: iterator.next.bind(iterator),
    [Symbol.iterator](): IterableIterator<T> {
      return self;
    },
  };

  return self;
}

// ---------------------------------------------------------------------------
// Utility: take
// ---------------------------------------------------------------------------

/**
 * Takes the first `n` values from an iterable and returns them as an array.
 *
 * This is the safe way to inspect infinite sequences without hanging.
 *
 * @param iterable - Any iterable (finite or infinite).
 * @param n - Number of elements to take.
 * @returns An array of the first `n` values.
 *
 * @example
 * ```ts
 * const naturals = createInfiniteSequence(i => i + 1);
 * take(naturals, 3); // [1, 2, 3]
 * ```
 */
export function take<T>(iterable: Iterable<T>, n: number): T[] {
  if (n < 0) {
    throw new RangeError(`take() requires a non-negative count, got ${n}`);
  }

  const result: T[] = [];
  const iterator = iterable[Symbol.iterator]();
  for (let i = 0; i < n; i++) {
    const next = iterator.next();
    if (next.done) break; // defensive: handle finite iterables too
    result.push(next.value);
  }
  return result;
}

// ---------------------------------------------------------------------------
// Common sequence generators
// ---------------------------------------------------------------------------

/**
 * Creates an infinite sequence of natural numbers: 1, 2, 3, 4, …
 *
 * @param start - The first number (default 1).
 * @returns An infinite iterable iterator of natural numbers.
 *
 * @example
 * ```ts
 * const naturals = naturalNumbers();
 * take(naturals, 5); // [1, 2, 3, 4, 5]
 * ```
 */
export function naturalNumbers(start: number = 1): IterableIterator<number> {
  if (!Number.isFinite(start) || !Number.isInteger(start)) {
    throw new RangeError(
      `naturalNumbers() requires a finite integer start, got ${start}`,
    );
  }
  return createInfiniteSequence((i) => start + i);
}

/**
 * Creates an infinite sequence of even numbers: 0, 2, 4, 6, …
 *
 * @param startFrom - The first even number in the sequence (default 0).
 *   Must be an even integer.
 * @returns An infinite iterable iterator of even numbers.
 *
 * @example
 * ```ts
 * const evens = evenNumbers();
 * take(evens, 4); // [0, 2, 4, 6]
 * ```
 */
export function evenNumbers(startFrom: number = 0): IterableIterator<number> {
  if (!Number.isFinite(startFrom) || startFrom % 2 !== 0) {
    throw new RangeError(
      `evenNumbers() requires a finite even start value, got ${startFrom}`,
    );
  }
  return createInfiniteSequence((i) => startFrom + i * 2);
}

/**
 * Creates an infinite Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, …
 *
 * The sequence starts with `f0` and `f1` (default 0 and 1), and each
 * subsequent term is the sum of the two preceding terms.
 *
 * @param f0 - The first Fibonacci term (default 0).
 * @param f1 - The second Fibonacci term (default 1).
 * @returns An infinite iterable iterator of Fibonacci numbers.
 *
 * @example
 * ```ts
 * const fib = fibonacciSequence();
 * take(fib, 8); // [0, 1, 1, 2, 3, 5, 8, 13]
 * ```
 *
 * @example <caption>Custom start values (Lucas-like)</caption>
 * ```ts
 * const lucas = fibonacciSequence(2, 1);
 * take(lucas, 6); // [2, 1, 3, 4, 7, 11]
 * ```
 */
export function fibonacciSequence(
  f0: number = 0,
  f1: number = 1,
): IterableIterator<number> {
  if (!Number.isFinite(f0) || !Number.isFinite(f1)) {
    throw new RangeError(
      `fibonacciSequence() requires finite start values, got ${f0}, ${f1}`,
    );
  }

  let a = f0;
  let b = f1;
  let doneFirst = false;

  const generator = (): number => {
    if (!doneFirst) {
      doneFirst = true;
      return a;
    }
    const next = b;
    b = a + b;
    a = next;
    return next;
  };

  // Hand-craft the iterator because we need mutable closure state
  const iterator: Iterator<number> = {
    next(): IteratorResult<number> {
      return { value: generator(), done: false };
    },
  };

  const fibIterator: IterableIterator<number> = {
    next: iterator.next.bind(iterator),
    [Symbol.iterator](): IterableIterator<number> {
      return fibIterator;
    },
  };

  return fibIterator;
}

// ---------------------------------------------------------------------------
// Utility: sequence — chainable sequence builder
// ---------------------------------------------------------------------------

/**
 * A chainable sequence builder that wraps an infinite sequence and
 * provides convenience methods like `take`, `map`, `filter`, and `skip`.
 *
 * @typeParam T - Element type.
 */
export class Sequence<T> implements IterableIterator<T> {
  private inner: IterableIterator<T>;

  /**
   * @param source - The source iterable iterator to wrap.
   */
  constructor(source: IterableIterator<T>) {
    this.inner = source;
  }

  /** @internal */
  next(...args: [] | [undefined]): IteratorResult<T> {
    return this.inner.next(...args);
  }

  /** @internal */
  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  /**
   * Take the first `n` elements and return them as an array.
   */
  take(n: number): T[] {
    return take(this, n);
  }

  /**
   * Transform each element via a mapper function.
   */
  map<U>(fn: (value: T, index: number) => U): Sequence<U> {
    let index = 0;
    const mapped = createInfiniteSequence<U>(() => {
      const next = this.inner.next();
      if (next.done) {
        throw new Error("Unexpected end of infinite sequence");
      }
      return fn(next.value, index++);
    });
    return new Sequence(mapped);
  }

  /**
   * Filter elements by a predicate.
   *
   * Note: Since the source is infinite, the filtered sequence is also
   * infinite but may skip elements that don't match.
   */
  filter(predicate: (value: T, index: number) => boolean): Sequence<T> {
    let index = 0;
    const filtered = createInfiniteSequence<T>(() => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const next = this.inner.next();
        if (next.done) {
          throw new Error("Unexpected end of infinite sequence");
        }
        if (predicate(next.value, index++)) {
          return next.value;
        }
      }
    });
    return new Sequence(filtered);
  }

  /**
   * Skip the first `n` elements.
   */
  skip(n: number): Sequence<T> {
    for (let i = 0; i < n; i++) {
      this.inner.next();
    }
    return this;
  }
}

/**
 * Create a chainable sequence from a generator function.
 *
 * @example
 * ```ts
 * const first10Evens = seq(i => i * 2).take(10);
 * // [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
 *
 * seq(i => i + 1).filter(x => x % 2 === 0).take(5);
 * // [2, 4, 6, 8, 10]
 * ```
 */
export function seq<T>(generator: (index: number) => T): Sequence<T> {
  return new Sequence(createInfiniteSequence(generator));
}
