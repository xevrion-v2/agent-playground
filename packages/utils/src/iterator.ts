/**
 * Infinite sequence iterator utility
 * Provides safe iteration over infinite sequences with configurable limits
 */

export interface IteratorOptions {
  /** Maximum number of iterations (safety limit) */
  maxIterations?: number;
  /** Custom stop condition */
  stopWhen?: (value: number, index: number) => boolean;
}

/**
 * Generate an infinite Fibonacci sequence
 */
export function* fibonacci(options: IteratorOptions = {}): Generator<number> {
  const { maxIterations = 10000, stopWhen } = options;
  let a = 0, b = 1;
  let count = 0;
  
  while (count < maxIterations) {
    if (stopWhen?.(a, count)) break;
    yield a;
    [a, b] = [b, a + b];
    count++;
  }
}

/**
 * Generate an infinite arithmetic sequence
 */
export function* arithmeticSequence(
  start: number = 0,
  step: number = 1,
  options: IteratorOptions = {}
): Generator<number> {
  const { maxIterations = 10000, stopWhen } = options;
  let current = start;
  let count = 0;
  
  while (count < maxIterations) {
    if (stopWhen?.(current, count)) break;
    yield current;
    current += step;
    count++;
  }
}

/**
 * Generate an infinite geometric sequence
 */
export function* geometricSequence(
  start: number = 1,
  ratio: number = 2,
  options: IteratorOptions = {}
): Generator<number> {
  const { maxIterations = 10000, stopWhen } = options;
  let current = start;
  let count = 0;
  
  while (count < maxIterations) {
    if (stopWhen?.(current, count)) break;
    yield current;
    current *= ratio;
    count++;
  }
}

/**
 * Safely collect values from an iterator
 */
export function take<T>(iterator: Generator<T>, count: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    const next = iterator.next();
    if (next.done) break;
    result.push(next.value);
  }
  return result;
}

/**
 * Find the first value matching a predicate
 */
export function find<T>(
  iterator: Generator<T>,
  predicate: (value: T, index: number) => boolean
): T | undefined {
  let index = 0;
  for (const value of iterator) {
    if (predicate(value, index)) return value;
    index++;
  }
  return undefined;
}
