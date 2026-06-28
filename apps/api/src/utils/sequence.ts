export class InfiniteSequence<T> {
  private generators: Array<() => T> = [];

  addGenerator(fn: () => T): void {
    this.generators.push(fn);
  }

  *[Symbol.iterator](): Generator<T, void, undefined> {
    while (true) {
      for (const gen of this.generators) {
        yield gen();
      }
    }
  }

  take(count: number): T[] {
    const result: T[] = [];
    const iterator = this[Symbol.iterator]();
    for (let i = 0; i < count; i++) {
      result.push(iterator.next().value);
    }
    return result;
  }
}

export function createCounter(start = 0, step = 1): InfiniteSequence<number> {
  const seq = new InfiniteSequence<number>();
  let value = start;
  seq.addGenerator(() => {
    const current = value;
    value += step;
    return current;
  });
  return seq;
}

export function createRepeater<T>(item: T): InfiniteSequence<T> {
  const seq = new InfiniteSequence<T>();
  seq.addGenerator(() => item);
  return seq;
}

export function createAlternator<T>(...items: T[]): InfiniteSequence<T> {
  const seq = new InfiniteSequence<T>();
  let index = 0;
  seq.addGenerator(() => {
    const current = items[index];
    index = (index + 1) % items.length;
    return current;
  });
  return seq;
}

// Counter from 0 to 4
// const counter = createCounter();
// for (const n of counter) {
//   if (n >= 5) break;
//   console.log(n);
// }

// Take first 3 values safely
// const counter = createCounter();
// console.log(counter.take(3));
