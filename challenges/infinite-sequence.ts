/**
 * Infinite Sequence Utility
 *
 * A collection of type-safe infinite sequence generators with safe
 * iteration patterns. All generators are lazy — they compute values
 * on demand and use constant memory.
 */

/**
 * Core interface for all sequence generators.
 */
export interface Sequence<T> {
  /** Compute the nth value (0-indexed) */
  nth(n: number): T
  /** Create an iterator for safe, bounded consumption */
  take(count: number): Iterable<T>
}

/**
 * Safe wrapper around a generator function that limits how many
 * values are consumed. Prevents accidental infinite loops.
 */
function* takeGen<T>(gen: () => Generator<T>, count: number): Generator<T> {
  if (count <= 0) return
  let i = 0
  for (const value of gen()) {
    yield value
    if (++i >= count) break
  }
}

/**
 * Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, ...
 */
export function fibonacci(): Sequence<number> {
  function* fibGen(): Generator<number> {
    let a = 0, b = 1
    while (true) {
      yield a
      ;[a, b] = [b, a + b]
    }
  }

  return {
    nth(n: number): number {
      let a = 0, b = 1
      for (let i = 0; i < n; i++) {
        ;[a, b] = [b, a + b]
      }
      return a
    },
    take(count: number): Iterable<number> {
      return { [Symbol.iterator]: () => takeGen(fibGen, count) }
    },
  }
}

/**
 * Natural numbers: 0, 1, 2, 3, 4, ...
 */
export function naturals(): Sequence<number> {
  function* natGen(): Generator<number> {
    let n = 0
    while (true) yield n++
  }

  return {
    nth(n: number): number {
      return n
    },
    take(count: number): Iterable<number> {
      return { [Symbol.iterator]: () => takeGen(natGen, count) }
    },
  }
}

/**
 * Prime numbers: 2, 3, 5, 7, 11, 13, ...
 */
export function primes(): Sequence<number> {
  const isPrime = (n: number): boolean => {
    if (n < 2) return false
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false
    }
    return true
  }

  function* primeGen(): Generator<number> {
    let n = 2
    while (true) {
      if (isPrime(n)) yield n
      n++
    }
  }

  return {
    nth(n: number): number {
      let count = 0, candidate = 2
      while (true) {
        if (isPrime(candidate)) {
          if (count === n) return candidate
          count++
        }
        candidate++
      }
    },
    take(count: number): Iterable<number> {
      return { [Symbol.iterator]: () => takeGen(primeGen, count) }
    },
  }
}
