export class InfiniteSequence<T> {
  private generators: Array<() => T> = [];
  private index = 0;

  constructor(...generators: Array<() => T>) {
    this.generators = generators;
  }

  next(): T {
    const value = this.generators[this.index % this.generators.length]();
    this.index++;
    return value;
  }

  take(n: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < n; i++) {
      result.push(this.next());
    }
    return result;
  }

  reset(): void {
    this.index = 0;
  }

  get position(): number {
    return this.index;
  }
}

// Factory helpers
export function naturalNumbers(): InfiniteSequence<number> {
  let i = 0;
  return new InfiniteSequence(() => i++);
}

export function fibonacci(): InfiniteSequence<number> {
  let a = 0, b = 1;
  return new InfiniteSequence(() => {
    const result = a;
    [a, b] = [b, a + b];
    return result;
  });
}

export function constant<T>(value: T): InfiniteSequence<T> {
  return new InfiniteSequence(() => value);
}
