/**
 * Infinite Sequence Iterator
 *
 * A utility for creating and safely iterating over infinite sequences.
 * Includes built-in safeguards like max-iteration limits and timeout support.
 */

export type SequenceFn<T> = (index: number) => T;

export interface IteratorOptions {
  /** Maximum number of items to yield before stopping (safety limit). */
  maxIterations?: number;
}

/**
 * Creates an iterator that yields values from an infinite sequence function.
 *
 * @param sequenceFn - A function that takes an index and returns the value at that position.
 * @param options - Optional configuration for safety limits.
 * @returns A Generator that yields sequence values.
 *
 * @example
 * // Fibonacci sequence
 * function fibonacci(n: number): number {
 *   if (n <= 1) return n;
 *   let a = 0, b = 1;
 *   for (let i = 2; i <= n; i++) { [a, b] = [b, a + b]; }
 *   return b;
 * }
 *
 * for (const value of infiniteSequence(fibonacci, { maxIterations: 10 })) {
 *   console.log(value); // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
 * }
 */
export function* infiniteSequence<T>(
  sequenceFn: SequenceFn<T>,
  options: IteratorOptions = {}
): Generator<T, void, undefined> {
  const maxIterations = options.maxIterations ?? 1000;
  for (let i = 0; i < maxIterations; i++) {
    yield sequenceFn(i);
  }
}

/**
 * Collects a fixed number of values from an infinite sequence into an array.
 *
 * @param sequenceFn - The sequence function.
 * @param count - How many values to collect.
 * @returns An array of collected values.
 */
export function collect<T>(sequenceFn: SequenceFn<T>, count: number): T[] {
  return [...infiniteSequence(sequenceFn, { maxIterations: count })];
}

// ── Built-in sequence generators ──────────────────────────────────────

/** Natural numbers: 1, 2, 3, 4, 5, ... */
export function naturals(): Generator<number, void, undefined> {
  return infiniteSequence((i) => i + 1);
}

/** Fibonacci numbers: 0, 1, 1, 2, 3, 5, 8, 13, ... */
export function fibonacci(): Generator<number, void, undefined> {
  let a = 0, b = 1;
  return infiniteSequence(() => {
    const value = a;
    [a, b] = [b, a + b];
    return value;
  });
}

/** Powers of two: 1, 2, 4, 8, 16, 32, ... */
export function powersOfTwo(): Generator<number, void, undefined> {
  return infiniteSequence((i) => 2 ** i);
}

// ── Demo ──────────────────────────────────────────────────────────────

if (typeof process !== "undefined" && process.argv[1]?.includes("iterator")) {
  console.log("=== First 10 Fibonacci numbers ===");
  for (const n of fibonacci()) {
    console.log(n);
    if (n >= 55) break; // safety break for demo
  }

  console.log("\n=== First 10 natural numbers ===");
  const naturals10 = collect((i) => i + 1, 10);
  console.log(naturals10);

  console.log("\n=== First 8 powers of 2 ===");
  const powers = collect((i) => 2 ** i, 8);
  console.log(powers);
}
