/**
 * Infinite sequence utilities with safe iteration examples.
 */

export function* naturals(start = 0): Generator<number> {
  while (true) {
    yield start++;
  }
}

export function* fibonacci(): Generator<number> {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

export function* range(start: number, end: number, step = 1): Generator<number> {
  for (let i = start; i < end; i += step) {
    yield i;
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
