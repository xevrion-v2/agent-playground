// Infinite sequence utilities with safe iteration
// Implements #15 - Bounty from xevrion-v2/agent-playground

/**
 * A lazily-evaluated infinite sequence with safe iteration bounds.
 *
 * @template T
 */
class Sequence {
  /** @param {() => Iterator<T>} factory */
  constructor(factory) {
    this._factory = factory;
  }

  /** @returns {Iterator<T>} */
  [Symbol.iterator]() {
    return this._factory();
  }

  /**
   * Take at most `n` items from the sequence.
   * @param {number} n - Number of items to take (must be >= 0)
   * @returns {T[]}
   */
  take(n) {
    if (typeof n !== 'number' || n < 0 || !Number.isFinite(n)) {
      throw new Error('take(n): n must be a non-negative finite number');
    }
    const result = [];
    const iter = this[Symbol.iterator]();
    for (let i = 0; i < n; i++) {
      const next = iter.next();
      if (next.done) break;
      result.push(next.value);
    }
    return result;
  }

  /**
   * Skip the first `n` items and return the rest as a new Sequence.
   * @param {number} n
   * @returns {Sequence<T>}
   */
  skip(n) {
    if (typeof n !== 'number' || n < 0 || !Number.isFinite(n)) {
      throw new Error('skip(n): n must be a non-negative finite number');
    }
    const self = this;
    return new Sequence(function* () {
      const iter = self[Symbol.iterator]();
      for (let i = 0; i < n; i++) {
        const next = iter.next();
        if (next.done) return;
      }
      while (true) {
        const next = iter.next();
        if (next.done) return;
        yield next.value;
      }
    });
  }

  /**
   * Apply a mapping function to each element.
   * @template U
   * @param {(value: T, index: number) => U} fn
   * @returns {Sequence<U>}
   */
  map(fn) {
    const self = this;
    return new Sequence(function* () {
      let i = 0;
      for (const val of self) {
        yield fn(val, i++);
      }
    });
  }

  /**
   * Keep only elements matching the predicate.
   * @param {(value: T, index: number) => boolean} fn
   * @returns {Sequence<T>}
   */
  filter(fn) {
    const self = this;
    return new Sequence(function* () {
      let i = 0;
      for (const val of self) {
        if (fn(val, i++)) yield val;
      }
    });
  }

  /**
   * Reduce the sequence to a single value (CAUTION: infinite sequences will never terminate).
   * Use take(n) before reduce on infinite sequences.
   * @template Acc
   * @param {(acc: Acc, value: T, index: number) => Acc} fn
   * @param {Acc} initial
   * @returns {Acc}
   */
  reduce(fn, initial) {
    let acc = initial;
    let i = 0;
    for (const val of this) {
      acc = fn(acc, val, i++);
    }
    return acc;
  }

  /**
   * Execute a side-effect for each element (CAUTION: infinite sequences never terminate).
   * Use take(n) before forEach on infinite sequences.
   * @param {(value: T, index: number) => void} fn
   */
  forEach(fn) {
    let i = 0;
    for (const val of this) {
      fn(val, i++);
    }
  }
}

/**
 * Natural numbers starting from 0: 0, 1, 2, 3, ...
 * @returns {Sequence<number>}
 */
Sequence.nats = function nats() {
  return new Sequence(function* () {
    let i = 0;
    while (true) yield i++;
  });
};

/**
 * Range of numbers from `start` to `end` (exclusive), stepping by `step`.
 * When `end` is omitted the sequence is infinite starting from `start`.
 * @param {number} start
 * @param {number} [end]
 * @param {number} [step=1]
 * @returns {Sequence<number>}
 */
Sequence.range = function range(start, end, step) {
  if (end === undefined) {
    // Infinite range
    const s = step !== undefined ? step : 1;
    if (s === 0) throw new Error('range(): step must not be zero');
    return new Sequence(function* () {
      let i = start;
      while (true) { yield i; i += s; }
    });
  }
  // Finite range
  const s = step !== undefined ? step : (start <= end ? 1 : -1);
  if (s === 0) throw new Error('range(): step must not be zero');
  return new Sequence(function* () {
    let i = start;
    if (s > 0) {
      while (i < end) { yield i; i += s; }
    } else {
      while (i > end) { yield i; i += s; }
    }
  });
};

/**
 * Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, ...
 * @returns {Sequence<number>}
 */
Sequence.fibonacci = function fibonacci() {
  return new Sequence(function* () {
    let a = 0, b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  });
};

/**
 * Repeat a single value infinitely.
 * @template T
 * @param {T} value
 * @returns {Sequence<T>}
 */
Sequence.repeat = function repeat(value) {
  return new Sequence(function* () {
    while (true) yield value;
  });
};

/**
 * Cycle through an array infinitely.
 * @template T
 * @param {T[]} arr
 * @returns {Sequence<T>}
 */
Sequence.cycle = function cycle(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('cycle(arr): arr must be a non-empty array');
  }
  return new Sequence(function* () {
    while (true) {
      for (const item of arr) yield item;
    }
  });
};

/**
 * Create a Sequence from an iterable or array.
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {Sequence<T>}
 */
Sequence.from = function from(iterable) {
  return new Sequence(function* () {
    for (const val of iterable) yield val;
  });
};

module.exports = { Sequence };
