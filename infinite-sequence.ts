/**
 * Creates an infinite sequence generator from a seed value and a transform function.
 * Each call to next() returns the current value and advances the state.
 */
export class InfiniteSequence<T> {
  private current: T;
  private transform: (prev: T) => T;

  constructor(seed: T, transform: (prev: T) => T) {
    this.current = seed;
    this.transform = transform;
  }

  next(): T {
    const value = this.current;
    this.current = this.transform(this.current);
    return value;
  }

  take(n: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < n; i++) {
      result.push(this.next());
    }
    return result;
  }

  *[Symbol.iterator](): Iterator<T> {
    while (true) {
      yield this.next();
    }
  }
}

export function naturalNumbers(): InfiniteSequence<number> {
  return new InfiniteSequence(1, (n) => n + 1);
}

export function fibonacciSequence(): InfiniteSequence<number> {
  return new InfiniteSequence(0, (state: any) => {
    if (state === 0) return 1;
    return state + (state._prev || 0);
  });
}

export function fibonacci(): InfiniteSequence<[number, number]> {
  let a = 0, b = 1;
  return new InfiniteSequence([a, b] as [number, number], () => {
    const next = a + b;
    a = b;
    b = next;
    return [a, b] as [number, number];
  });
}
