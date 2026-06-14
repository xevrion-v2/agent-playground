/**
 * Infinite Sequence Iterator
 * 
 * Provides safe iteration over infinite sequences with configurable limits.
 */

export interface SequenceOptions {
  maxValue?: number;
  maxIterations?: number;
}

export function* infiniteSequence(
  start: number = 0,
  step: number = 1,
  options: SequenceOptions = {}
): Generator<number, void, unknown> {
  const { maxValue = Infinity, maxIterations = Infinity } = options;
  
  let current = start;
  let iterations = 0;

  while (iterations < maxIterations && current <= maxValue) {
    yield current;
    current += step;
    iterations++;
  }
}

export function* fibonacci(): Generator<number, void, unknown> {
  let a = 0;
  let b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

export function take<T>(generator: Generator<T>, count: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    const next = generator.next();
    if (next.done) break;
    result.push(next.value);
  }
  return result;
}

export function* filter<T>(
  generator: Generator<T>,
  predicate: (value: T) => boolean
): Generator<T, void, unknown> {
  for (const value of generator) {
    if (predicate(value)) {
      yield value;
    }
  }
}

export function* map<T, U>(
  generator: Generator<T>,
  transform: (value: T) => U
): Generator<U, void, unknown> {
  for (const value of generator) {
    yield transform(value);
  }
}
