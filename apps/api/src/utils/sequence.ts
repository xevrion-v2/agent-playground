/**
 * Infinite Sequence Iterator Utility
 * 
 * Provides safe iteration over infinite sequences with configurable limits.
 * Includes common sequence generators (counter, fibonacci, range cycle).
 * 
 * @example
 * ```typescript
 * // Safe counter — stops at 100
 * const counter = createCounter();
 * for (const n of safeIterate(counter, 100)) {
 *   console.log(n); // 0, 1, 2, ... 99
 * }
 * 
 * // Fibonacci sequence — first 10 numbers
 * const fib = fibonacci();
 * const first10 = [...safeIterate(fib, 10)];
 * console.log(first10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 * ```
 */

/**
 * Creates an infinite counter starting from a given number.
 */
export function* createCounter(start: number = 0, step: number = 1): Generator<number> {
  let current = start;
  while (true) {
    yield current;
    current += step;
  }
}

/**
 * Creates an infinite Fibonacci sequence generator.
 */
export function* fibonacci(): Generator<number> {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/**
 * Creates a cycling range generator that loops through [start, end).
 */
export function* rangeCycle(start: number, end: number): Generator<number> {
  if (start >= end) throw new Error("start must be less than end");
  while (true) {
    for (let i = start; i < end; i++) {
      yield i;
    }
  }
}

/**
 * Safely iterate over a generator with a maximum limit.
 * Prevents infinite loops by capping iterations.
 */
export function* safeIterate<T>(
  generator: Generator<T>,
  maxIterations: number
): Generator<T> {
  for (let i = 0; i < maxIterations; i++) {
    const result = generator.next();
    if (result.done) break;
    yield result.value;
  }
}

/**
 * Takes the first N values from a generator.
 */
export function take<T>(generator: Generator<T>, n: number): T[] {
  return [...safeIterate(generator, n)];
}

/**
 * Creates an infinite ID generator with optional prefix.
 */
export function* idGenerator(prefix: string = "id"): Generator<string> {
  let counter = 1;
  while (true) {
    yield `${prefix}-${String(counter).padStart(6, "0")}`;
    counter++;
  }
}
