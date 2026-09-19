/**
 * Creates an infinite sequence of natural numbers starting from a given value
 * @param start Starting number (default: 0)
 * @param step Step between numbers (default: 1)
 * @yields Next number in the sequence
 */
export function* naturalNumbers(start: number = 0, step: number = 1): Generator<number> {
  let current = start;
  while (true) {
    yield current;
    current += step;
  }
}

/**
 * Creates an infinite Fibonacci sequence
 * @yields Next number in the Fibonacci sequence
 */
export function* fibonacci(): Generator<number> {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/**
 * Creates an infinite sequence of even numbers
 * @param start Starting even number (default: 0)
 * @yields Next even number
 */
export function* evenNumbers(start: number = 0): Generator<number> {
  let current = start % 2 === 0 ? start : start + 1;
  while (true) {
    yield current;
    current += 2;
  }
}

/**
 * Creates an infinite sequence of odd numbers
 * @param start Starting odd number (default: 1)
 * @yields Next odd number
 */
export function* oddNumbers(start: number = 1): Generator<number> {
  let current = start % 2 === 1 ? start : start + 1;
  while (true) {
    yield current;
    current += 2;
  }
}

/**
 * Creates an infinite sequence that repeats a constant value
 * @param value Value to repeat
 * @yields The constant value
 */
export function* constant<T>(value: T): Generator<T> {
  while (true) {
    yield value;
  }
}

/**
 * Creates an infinite sequence by repeatedly applying a function to the previous value
 * @param initial Initial value
 * @param nextFunction Function to generate the next value
 * @yields Next value in the sequence
 */
export function* iterate<T>(initial: T, nextFunction: (current: T) => T): Generator<T> {
  let current = initial;
  while (true) {
    yield current;
    current = nextFunction(current);
  }
}

/**
 * Safely takes the first n elements from an infinite (or finite) iterator
 * @param iterator The iterator to take elements from
 * @param count Number of elements to take
 * @returns Array of the first n elements
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
 * Takes elements from an iterator while the predicate function returns true
 * @param iterator The iterator to take elements from
 * @param predicate Function to test each element
 * @returns Array of elements that satisfy the predicate
 */
export function takeWhile<T>(iterator: Generator<T>, predicate: (value: T) => boolean): T[] {
  const result: T[] = [];
  while (true) {
    const next = iterator.next();
    if (next.done || !predicate(next.value)) break;
    result.push(next.value);
  }
  return result;
}
