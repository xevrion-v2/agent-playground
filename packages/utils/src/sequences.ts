/**
 * Infinite Sequence Utilities
 * 
 * This module provides utilities for working with infinite sequences
 * using JavaScript/TypeScript generators, with safe iteration patterns
 * to prevent infinite loops.
 * 
 * ## Safety Patterns
 * 
 * Infinite sequences are powerful but dangerous - they can cause infinite loops
 * if not handled correctly. This module provides:
 * 
 * 1. **Bounded iteration helpers**: `take`, `takeWhile`, `elementAt`
 * 2. **Safe consumers**: `toArray` (with limits), `forEach` (with limits)
 * 3. **Memory-safe transforms**: `map`, `filter`, `scan` (lazy evaluation)
 * 
 * ## Examples
 * 
 * ```typescript
 * // Safe: takes only first 5 elements
 * const first5 = take(naturalNumbers(), 5); // [1, 2, 3, 4, 5]
 * 
 * // Safe: takes while predicate is true
 * const lessThan10 = takeWhile(naturalNumbers(), x => x < 10);
 * 
 * // Dangerous (NEVER do this):
 * // const all = toArray(naturalNumbers()); // INFINITE LOOP!
 * ```
 * 
 * @module sequences
 */

/**
 * A generator function type that produces an infinite sequence
 */
export type SequenceGenerator<T> = () => Generator<T, never, undefined>;

/**
 * A transform function type for mapping sequence elements
 */
export type SequenceTransform<T, R> = (value: T) => R;

/**
 * A predicate function type for filtering sequence elements
 */
export type SequencePredicate<T> = (value: T) => boolean;

/**
 * Create an infinite sequence of natural numbers (1, 2, 3, ...)
 * 
 * @yields 1, 2, 3, 4, 5, ...
 * 
 * @example
 * ```typescript
 * const naturals = naturalNumbers();
 * take(naturals, 3); // [1, 2, 3]
 * ```
 */
export function* naturalNumbers(): Generator<number, never, undefined> {
  let n = 1;
  while (true) {
    yield n++;
  }
}

/**
 * Create an infinite sequence of integers starting from 0 (0, 1, 2, ...)
 * 
 * @yields 0, 1, 2, 3, 4, ...
 * 
 * @example
 * ```typescript
 * const integers = integersFromZero();
 * take(integers, 4); // [0, 1, 2, 3]
 * ```
 */
export function* integersFromZero(): Generator<number, never, undefined> {
  let n = 0;
  while (true) {
    yield n++;
  }
}

/**
 * Create an infinite sequence of Fibonacci numbers
 * 
 * @yields 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
 * 
 * @example
 * ```typescript
 * const fib = fibonacci();
 * take(fib, 7); // [0, 1, 1, 2, 3, 5, 8]
 * ```
 */
export function* fibonacci(): Generator<number, never, undefined> {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/**
 * Create an infinite sequence of prime numbers
 * 
 * @yields 2, 3, 5, 7, 11, 13, 17, 19, 23, ...
 * 
 * @example
 * ```typescript
 * const primes = primeNumbers();
 * take(primes, 5); // [2, 3, 5, 7, 11]
 * ```
 */
export function* primeNumbers(): Generator<number, never, undefined> {
  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  let n = 2;
  while (true) {
    if (isPrime(n)) {
      yield n;
    }
    n++;
  }
}

/**
 * Create an infinite sequence of powers of 2
 * 
 * @yields 1, 2, 4, 8, 16, 32, 64, ...
 * 
 * @example
 * ```typescript
 * const powers = powersOfTwo();
 * take(powers, 6); // [1, 2, 4, 8, 16, 32]
 * ```
 */
export function* powersOfTwo(): Generator<number, never, undefined> {
  let n = 1;
  while (true) {
    yield n;
    n *= 2;
  }
}

/**
 * Create a custom infinite sequence from a seed value and next function
 * 
 * @param seed - The starting value
 * @param next - Function to compute the next value from the current
 * @returns An infinite sequence generator
 * 
 * @example
 * ```typescript
 * // Sequence: 1, 2, 4, 8, 16, ...
 * const seq = customSequence(1, x => x * 2);
 * take(seq, 5); // [1, 2, 4, 8, 16]
 * ```
 */
export function* customSequence<T>(seed: T, next: (current: T) => T): Generator<T, never, undefined> {
  let current = seed;
  while (true) {
    yield current;
    current = next(current);
  }
}

/**
 * Take the first n elements from a sequence (SAFE - prevents infinite loops)
 * 
 * @param generator - The sequence generator
 * @param n - Number of elements to take
 * @returns Array of the first n elements
 * 
 * @example
 * ```typescript
 * take(naturalNumbers(), 5); // [1, 2, 3, 4, 5]
 * ```
 */
export function take<T>(generator: Generator<T, never, undefined>, n: number): T[] {
  if (n < 0) throw new Error('n must be non-negative');
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    const { value, done } = generator.next();
    if (done) break;
    result.push(value);
  }
  return result;
}

/**
 * Take elements from a sequence while a predicate is true (SAFE)
 * 
 * @param generator - The sequence generator
 * @param predicate - Function to test each element
 * @returns Array of elements until predicate returns false
 * 
 * @example
 * ```typescript
 * takeWhile(naturalNumbers(), x => x < 5); // [1, 2, 3, 4]
 * ```
 */
export function takeWhile<T>(
  generator: Generator<T, never, undefined>,
  predicate: SequencePredicate<T>
): T[] {
  const result: T[] = [];
  for (const value of generator) {
    if (!predicate(value)) break;
    result.push(value);
  }
  return result;
}

/**
 * Get the nth element from a sequence (0-indexed)
 * 
 * @param generator - The sequence generator
 * @param n - Index of element to retrieve (0-indexed)
 * @returns The nth element
 * 
 * @example
 * ```typescript
 * elementAt(naturalNumbers(), 0); // 1
 * elementAt(naturalNumbers(), 4); // 5
 * ```
 */
export function elementAt<T>(generator: Generator<T, never, undefined>, n: number): T {
  if (n < 0) throw new Error('n must be non-negative');
  let i = 0;
  for (const value of generator) {
    if (i === n) return value;
    i++;
  }
  throw new Error('Sequence ended before reaching index');
}

/**
 * Convert a sequence to an array with a safe upper limit
 * 
 * @param generator - The sequence generator
 * @param limit - Maximum number of elements to take (prevents infinite loops)
 * @returns Array of elements (at most `limit` elements)
 * 
 * @example
 * ```typescript
 * toArray(naturalNumbers(), 3); // [1, 2, 3]
 * ```
 */
export function toArray<T>(generator: Generator<T, never, undefined>, limit: number): T[] {
  return take(generator, limit);
}

/**
 * Execute a function for each element up to a limit (SAFE)
 * 
 * @param generator - The sequence generator
 * @param fn - Function to execute for each element
 * @param limit - Maximum number of elements to process
 * 
 * @example
 * ```typescript
 * forEach(naturalNumbers(), x => console.log(x), 3);
 * // Logs: 1, 2, 3
 * ```
 */
export function forEach<T>(
  generator: Generator<T, never, undefined>,
  fn: (value: T) => void,
  limit: number
): void {
  const limited = take(generator, limit);
  limited.forEach(fn);
}

/**
 * Map a sequence to a new sequence (lazy evaluation)
 * 
 * @param generator - The source sequence generator
 * @param transform - Function to transform each element
 * @returns A new infinite sequence with transformed elements
 * 
 * @example
 * ```typescript
 * const squares = map(naturalNumbers(), x => x * x);
 * take(squares, 4); // [1, 4, 9, 16]
 * ```
 */
export function* map<T, R>(
  generator: Generator<T, never, undefined>,
  transform: SequenceTransform<T, R>
): Generator<R, never, undefined> {
  for (const value of generator) {
    yield transform(value);
  }
}

/**
 * Filter a sequence to create a new sequence (lazy evaluation)
 * 
 * @param generator - The source sequence generator
 * @param predicate - Function to test each element
 * @returns A new infinite sequence with only elements that pass the predicate
 * 
 * @example
 * ```typescript
 * const evens = filter(naturalNumbers(), x => x % 2 === 0);
 * take(evens, 4); // [2, 4, 6, 8]
 * ```
 */
export function* filter<T>(
  generator: Generator<T, never, undefined>,
  predicate: SequencePredicate<T>
): Generator<T, never, undefined> {
  for (const value of generator) {
    if (predicate(value)) {
      yield value;
    }
  }
}

/**
 * Create a sequence with a running accumulator (scan/reduction)
 * 
 * @param generator - The source sequence generator
 * @param accumulator - Function to compute the next accumulator value
 * @param seed - Initial accumulator value
 * @returns A new infinite sequence of accumulator values
 * 
 * @example
 * ```typescript
 * // Running sum of natural numbers
 * const sums = scan(naturalNumbers(), (acc, x) => acc + x, 0);
 * take(sums, 5); // [1, 3, 6, 10, 15]
 * ```
 */
export function* scan<T, R>(
  generator: Generator<T, never, undefined>,
  accumulator: (acc: R, value: T) => R,
  seed: R
): Generator<R, never, undefined> {
  let acc = seed;
  for (const value of generator) {
    acc = accumulator(acc, value);
    yield acc;
  }
}

/**
 * Zip two sequences together
 * 
 * @param gen1 - First sequence generator
 * @param gen2 - Second sequence generator
 * @returns A new sequence of pairs
 * 
 * @example
 * ```typescript
 * const nums = naturalNumbers();
 * const chars = cycle(['a', 'b', 'c']);
 * const zipped = zip(nums, chars);
 * take(zipped, 5); // [[1, 'a'], [2, 'b'], [3, 'c'], [4, 'a'], [5, 'b']]
 * ```
 */
export function* zip<T, U>(
  gen1: Generator<T, never, undefined>,
  gen2: Generator<U, never, undefined>
): Generator<[T, U], never, undefined> {
  while (true) {
    const r1 = gen1.next();
    const r2 = gen2.next();
    if (r1.done || r2.done) break;
    yield [r1.value, r2.value];
  }
}

/**
 * Create an infinite sequence that cycles through an array
 * 
 * @param arr - The array to cycle through
 * @returns An infinite sequence cycling through the array
 * 
 * @example
 * ```typescript
 * const cyclic = cycle([1, 2, 3]);
 * take(cyclic, 7); // [1, 2, 3, 1, 2, 3, 1]
 * ```
 */
export function* cycle<T>(arr: T[]): Generator<T, never, undefined> {
  if (arr.length === 0) return;
  let i = 0;
  while (true) {
    yield arr[i];
    i = (i + 1) % arr.length;
  }
}

/**
 * Create an infinite sequence that repeats a single value
 * 
 * @param value - The value to repeat
 * @returns An infinite sequence of the value
 * 
 * @example
 * ```typescript
 * const zeros = repeat(0);
 * take(zeros, 4); // [0, 0, 0, 0]
 * ```
 */
export function* repeat<T>(value: T): Generator<T, never, undefined> {
  while (true) {
    yield value;
  }
}

/**
 * Safe documentation examples - DO NOT run these without limits!
 * 
 * These examples demonstrate safe iteration patterns.
 */
export const SAFE_EXAMPLES = {
  naturalNumbers: () => take(naturalNumbers(), 5),
  fibonacci: () => take(fibonacci(), 7),
  primeNumbers: () => take(primeNumbers(), 5),
  powersOfTwo: () => take(powersOfTwo(), 6),
  map: () => take(map(naturalNumbers(), x => x * x), 4),
  filter: () => take(filter(naturalNumbers(), x => x % 2 === 0), 4),
  scan: () => take(scan(naturalNumbers(), (acc, x) => acc + x, 0), 5),
  zip: () => take(zip(naturalNumbers(), cycle(['a', 'b', 'c'])), 5),
};

/**
 * Documentation: How to safely work with infinite sequences
 * 
 * 1. ALWAYS use bounded helpers (take, takeWhile, toArray with limit)
 * 2. NEVER call toArray() without a limit on an infinite sequence
 * 3. Use lazy transforms (map, filter) for memory efficiency
 * 4. Test with small limits first
 * 
 * UNSAFE (causes infinite loop):
 * ```typescript
 * const all = toArray(naturalNumbers()); // DON'T DO THIS
 * for (const x of naturalNumbers()) { }  // DON'T DO THIS
 * ```
 * 
 * SAFE:
 * ```typescript
 * const first10 = toArray(naturalNumbers(), 10); // Good!
 * for (const x of take(naturalNumbers(), 10)) { } // Good!
 * ```
 */
export const SAFETY_GUIDE = `
INFINITE SEQUENCE SAFETY GUIDE:

✅ SAFE PATTERNS:
  - take(seq, n): Take first n elements
  - takeWhile(seq, pred): Take while predicate is true
  - toArray(seq, limit): Convert to array with limit
  - forEach(seq, fn, limit): Execute with limit
  - elementAt(seq, n): Get specific element

❌ UNSAFE PATTERNS (CAUSE INFINITE LOOPS):
  - toArray(seq): No limit
  - for (const x of seq) { }: No break condition
  - seq.next() without limit tracking

⚠️  MEMORY SAFETY:
  - Use lazy transforms (map, filter) for memory efficiency
  - Generators don't store all values in memory
  - Chain transforms without intermediate arrays
`;
