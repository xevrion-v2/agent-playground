/**
 * Infinite Sequence Iterator
 *
 * A utility for working with potentially infinite sequences:
 * - Generate values lazily with a generator function
 * - Take a limited number of elements safely
 * - Filter and map without consuming the full sequence
 * - Detect and prevent infinite loops with a configurable safety limit
 */

/**
 * Creates an infinite sequence from a generator function.
 * The generator receives the current index (starting from 0).
 */
export function* infiniteSequence<T>(generator: (index: number) => T): Generator<T> {
  let index = 0;
  while (true) {
    yield generator(index++);
  }
}

/**
 * Takes up to `count` elements from an iterable.
 */
export function take<T>(iterable: Iterable<T>, count: number): T[] {
  const result: T[] = [];
  const iterator = iterable[Symbol.iterator]();
  for (let i = 0; i < count; i++) {
    const { value, done } = iterator.next();
    if (done) break;
    result.push(value);
  }
  return result;
}

/**
 * Returns true if the iterable is finite (terminates within `safetyLimit` iterations).
 */
export function isFinite(iterable: Iterable<unknown>, safetyLimit: number = 10_000): boolean {
  const iterator = iterable[Symbol.iterator]();
  for (let i = 0; i < safetyLimit; i++) {
    const { done } = iterator.next();
    if (done) return true;
  }
  return false;
}

/**
 * Maps over an iterable lazily.
 */
export function* map<T, U>(iterable: Iterable<T>, fn: (value: T, index: number) => U): Generator<U> {
  let index = 0;
  for (const item of iterable) {
    yield fn(item, index++);
  }
}

/**
 * Filters an iterable lazily.
 */
export function* filter<T>(iterable: Iterable<T>, predicate: (value: T, index: number) => boolean): Generator<T> {
  let index = 0;
  for (const item of iterable) {
    if (predicate(item, index++)) yield item;
  }
}

// Example usage - safe iteration with safety limits
export function safeIterate<T>(
  iterable: Iterable<T>,
  maxItems: number = 100,
  onItem?: (value: T, index: number) => void
): T[] {
  const result: T[] = [];
  let index = 0;
  for (const item of iterable) {
    if (index >= maxItems) break;
    onItem?.(item, index);
    result.push(item);
    index++;
  }
  return result;
}
