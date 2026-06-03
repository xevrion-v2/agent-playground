/**
 * Infinite sequence generator with safe iteration
 */
export function* infiniteSequence(start: number = 0, step: number = 1): Generator<number> {
  let current = start;
  while (true) {
    yield current;
    current += step;
  }
}

export function take<T>(generator: Generator<T>, count: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(generator.next().value);
  }
  return result;
}

export function* fibonacci(): Generator<number> {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

export function* primes(): Generator<number> {
  yield 2;
  let n = 3;
  while (true) {
    if (isPrime(n)) yield n;
    n += 2;
  }
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
