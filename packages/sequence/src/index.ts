export class InfiniteSequence<T> {
  private generator: () => Generator<T>;

  constructor(generator: () => Generator<T>) {
    this.generator = generator;
  }

  take(count: number): T[] {
    const gen = this.generator();
    const result: T[] = [];
    for (let i = 0; i < count; i++) {
      const next = gen.next();
      if (next.done) break;
      result.push(next.value);
    }
    return result;
  }

  map<R>(fn: (item: T) => R): InfiniteSequence<R> {
    const gen = this.generator;
    return new InfiniteSequence<R>(function* () {
      for (const item of gen()) yield fn(item);
    });
  }

  filter(pred: (item: T) => boolean): InfiniteSequence<T> {
    const gen = this.generator;
    return new InfiniteSequence<T>(function* () {
      for (const item of gen()) if (pred(item)) yield item;
    });
  }

  static naturalNumbers(start = 0): InfiniteSequence<number> {
    return new InfiniteSequence<number>(function* () {
      let i = start;
      while (true) yield i++;
    });
  }

  static fibonacci(): InfiniteSequence<number> {
    return new InfiniteSequence<number>(function* () {
      let a = 0, b = 1;
      while (true) {
        yield a;
        [a, b] = [b, a + b];
      }
    });
  }

  static arithmetic(start: number, step: number): InfiniteSequence<number> {
    return new InfiniteSequence<number>(function* () {
      let current = start;
      while (true) { yield current; current += step; }
    });
  }

  static geometric(start: number, ratio: number): InfiniteSequence<number> {
    return new InfiniteSequence<number>(function* () {
      let current = start;
      while (true) { yield current; current *= ratio; }
    });
  }
}
