/** Infinite sequence iterator with map, take, skip, and safe iteration. */

export function* range(start = 0, step = 1): Generator<number> {
  let i = start;
  while (true) {
    yield i;
    i += step;
  }
}

export function* take<T>(gen: Generator<T>, n: number): Generator<T> {
  let count = 0;
  for (const val of gen) {
    if (count >= n) return;
    yield val;
    count++;
  }
}

export function* skip<T>(gen: Generator<T>, n: number): Generator<T> {
  let count = 0;
  for (const val of gen) {
    if (count >= n) yield val;
    count++;
  }
}

export function* map<T, R>(gen: Generator<T>, fn: (val: T) => R): Generator<R> {
  for (const val of gen) {
    yield fn(val);
  }
}

export function toArray<T>(gen: Generator<T>): T[] {
  return Array.from(gen);
}
