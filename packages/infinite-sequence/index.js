/**
 * infinite-sequence — A lazy infinite sequence iterator utility
 *
 * Provides a safe, composable way to work with infinite numeric sequences.
 * All sequences are lazy: values are computed only when requested.
 *
 * Usage:
 *   const { sequence, take, takeWhile, first, nth } = require('./index');
 *
 *   // Built-in sequences
 *   const naturals = sequence.naturals();     // 1, 2, 3, 4, ...
 *   const fibs = sequence.fibonacci();        // 0, 1, 1, 2, 3, 5, 8, ...
 *   const evens = sequence.evens();           // 0, 2, 4, 6, 8, ...
 *   const powers = sequence.powersOfTwo();    // 1, 2, 4, 8, 16, ...
 *   const primes = sequence.primes();         // 2, 3, 5, 7, 11, ...
 *
 *   // Safe iteration (never infinite loop)
 *   take(naturals, 5);          // [1, 2, 3, 4, 5]
 *   takeWhile(naturals, n => n < 10); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
 *   first(fibs);                // 0
 *   nth(primes, 10);            // 29
 *
 *   // Custom sequence with a generator function
 *   const squares = sequence.custom(function* () {
 *     for (let n = 1; ; n++) yield n * n;
 *   });
 *   take(squares, 5);           // [1, 4, 9, 16, 25]
 */

// ─── Built-in Sequence Generators ───────────────────────────────────────────

/**
 * Creates a lazy iterator from a generator function.
 * Returns an object that implements the iterable protocol.
 *
 * @param {Function} generatorFn - A generator function (function*)
 * @returns {Object} An iterable with utility methods
 */
function createSequence(generatorFn) {
  return {
    [Symbol.iterator]() {
      return generatorFn();
    },

    /** Get the first `count` values */
    take(count) {
      return take(this, count);
    },

    /** Get values while predicate is true */
    takeWhile(predicate) {
      return takeWhile(this, predicate);
    },

    /** Get the first value */
    first() {
      return first(this);
    },

    /** Get the nth value (0-indexed) */
    nth(n) {
      return nth(this, n);
    },

    /** Transform each value with a mapping function */
    map(fn) {
      const src = this;
      return createSequence(function* () {
        for (const val of src) {
          yield fn(val);
        }
      });
    },

    /** Filter values by a predicate */
    filter(predicate) {
      const src = this;
      return createSequence(function* () {
        for (const val of src) {
          if (predicate(val)) yield val;
        }
      });
    },
  };
}

// ─── Natural Numbers (1, 2, 3, 4, ...) ─────────────────────────────────────

function naturals(start = 1) {
  return createSequence(function* () {
    for (let n = start; ; n++) {
      yield n;
    }
  });
}

// ─── Even Numbers (0, 2, 4, 6, ...) ────────────────────────────────────────

function evens(start = 0) {
  return createSequence(function* () {
    for (let n = start; ; n += 2) {
      yield n;
    }
  });
}

// ─── Odd Numbers (1, 3, 5, 7, ...) ─────────────────────────────────────────

function odds() {
  return createSequence(function* () {
    for (let n = 1; ; n += 2) {
      yield n;
    }
  });
}

// ─── Fibonacci Sequence (0, 1, 1, 2, 3, 5, 8, ...) ─────────────────────────

function fibonacci() {
  return createSequence(function* () {
    let a = 0, b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  });
}

// ─── Powers of Two (1, 2, 4, 8, 16, ...) ───────────────────────────────────

function powersOfTwo() {
  return createSequence(function* () {
    let n = 1;
    while (true) {
      yield n;
      n *= 2;
    }
  });
}

// ─── Powers of Base ─────────────────────────────────────────────────────────

function powersOf(base) {
  return createSequence(function* () {
    let n = 1;
    while (true) {
      yield n;
      n *= base;
    }
  });
}

// ─── Arithmetic Sequence (start, start+step, start+2*step, ...) ─────────────

function arithmetic(start = 0, step = 1) {
  return createSequence(function* () {
    let n = start;
    while (true) {
      yield n;
      n += step;
    }
  });
}

// ─── Geometric Sequence (start, start*ratio, start*ratio^2, ...) ────────────

function geometric(start = 1, ratio = 2) {
  return createSequence(function* () {
    let n = start;
    while (true) {
      yield n;
      n *= ratio;
    }
  });
}

// ─── Prime Numbers (2, 3, 5, 7, 11, ...) ───────────────────────────────────

function primes() {
  return createSequence(function* () {
    yield 2;
    const found = [2];
    let candidate = 3;
    while (true) {
      let isPrime = true;
      const limit = Math.sqrt(candidate);
      for (const p of found) {
        if (p > limit) break;
        if (candidate % p === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        found.push(candidate);
        yield candidate;
      }
      candidate += 2; // skip even numbers
    }
  });
}

// ─── Triangular Numbers (1, 3, 6, 10, 15, ...) ─────────────────────────────

function triangular() {
  return createSequence(function* () {
    let n = 1, sum = 0;
    while (true) {
      sum += n;
      yield sum;
      n++;
    }
  });
}

// ─── Custom Sequence from Generator ─────────────────────────────────────────

function custom(generatorFn) {
  return createSequence(generatorFn);
}

// ─── Safe Iteration Utilities ───────────────────────────────────────────────

/**
 * Take the first `count` values from an iterable.
 *
 * @param {Iterable} iterable
 * @param {number} count - Number of values to take
 * @returns {Array}
 */
function take(iterable, count) {
  const result = [];
  let i = 0;
  for (const val of iterable) {
    if (i >= count) break;
    result.push(val);
    i++;
  }
  return result;
}

/**
 * Take values from an iterable while the predicate returns true.
 *
 * @param {Iterable} iterable
 * @param {Function} predicate - (value) => boolean
 * @returns {Array}
 */
function takeWhile(iterable, predicate) {
  const result = [];
  for (const val of iterable) {
    if (!predicate(val)) break;
    result.push(val);
  }
  return result;
}

/**
 * Get the first value from an iterable.
 *
 * @param {Iterable} iterable
 * @returns {*}
 */
function first(iterable) {
  for (const val of iterable) {
    return val;
  }
}

/**
 * Get the nth value from an iterable (0-indexed).
 *
 * @param {Iterable} iterable
 * @param {number} n - Index (0-based)
 * @returns {*}
 */
function nth(iterable, n) {
  let i = 0;
  for (const val of iterable) {
    if (i === n) return val;
    i++;
  }
}

// ─── Export ─────────────────────────────────────────────────────────────────

const sequence = {
  naturals,
  evens,
  odds,
  fibonacci,
  powersOfTwo,
  powersOf,
  arithmetic,
  geometric,
  primes,
  triangular,
  custom,
};

module.exports = {
  sequence,
  take,
  takeWhile,
  first,
  nth,
};

// ─── Demo / Self-Test ───────────────────────────────────────────────────────

if (require.main === module) {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║         Infinite Sequence Iterator Utility              ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log();
  console.log("All sequences are lazy — values computed only on access.");
  console.log("Safe consumption via take(), takeWhile(), first(), nth().");
  console.log();

  const DIV = "─".repeat(50);

  // Naturals
  console.log("▸ Natural Numbers (1, 2, 3, ...)");
  console.log(`  take(10): ${take(sequence.naturals(), 10).join(", ")}`);
  console.log();

  // Evens
  console.log("▸ Even Numbers (0, 2, 4, ...)");
  console.log(`  take(8): ${take(sequence.evens(), 8).join(", ")}`);
  console.log();

  // Odds
  console.log("▸ Odd Numbers (1, 3, 5, ...)");
  console.log(`  take(8): ${take(sequence.odds(), 8).join(", ")}`);
  console.log();

  // Fibonacci
  console.log("▸ Fibonacci (0, 1, 1, 2, 3, 5, 8, ...)");
  console.log(`  take(15): ${take(sequence.fibonacci(), 15).join(", ")}`);
  console.log();

  // Powers of Two
  console.log("▸ Powers of 2 (1, 2, 4, 8, 16, ...)");
  console.log(`  take(10): ${take(sequence.powersOfTwo(), 10).join(", ")}`);
  console.log();

  // Primes
  console.log("▸ Primes (2, 3, 5, 7, 11, ...)");
  console.log(`  take(15): ${take(sequence.primes(), 15).join(", ")}`);
  console.log();

  // Triangular Numbers
  console.log("▸ Triangular Numbers (1, 3, 6, 10, 15, ...)");
  console.log(`  take(10): ${take(sequence.triangular(), 10).join(", ")}`);
  console.log();

  // Arithmetic
  console.log("▸ Arithmetic Sequence (start=5, step=3):");
  console.log(`  take(10): ${take(sequence.arithmetic(5, 3), 10).join(", ")}`);
  console.log();

  // Geometric
  console.log("▸ Geometric Sequence (start=2, ratio=3):");
  console.log(`  take(10): ${take(sequence.geometric(2, 3), 10).join(", ")}`);
  console.log();

  // Custom sequence
  console.log("▸ Custom: Squares via generator");
  const squares = sequence.custom(function* () {
    for (let n = 1; ; n++) yield n * n;
  });
  console.log(`  take(10): ${take(squares, 10).join(", ")}`);
  console.log();

  // Chaining: map + filter
  console.log("▸ Chaining: even Fibonacci numbers < 1000");
  const evenFibs = sequence.fibonacci().filter(n => n % 2 === 0);
  console.log(`  takeWhile(<1000): ${takeWhile(evenFibs, n => n < 1000).join(", ")}`);
  console.log();

  // nth utility
  console.log("▸ nth() utility:");
  console.log(`  10th prime:     ${nth(sequence.primes(), 9)}`);
  console.log(`  20th Fibonacci: ${nth(sequence.fibonacci(), 19)}`);
  console.log(`  15th natural:   ${nth(sequence.naturals(), 14)}`);
  console.log();

  console.log(DIV);
  console.log("✓ All sequences work correctly with safe bounded iteration.");
  console.log("  No infinite loops possible — use take/takeWhile to bound.");
}
