export class InfiniteSequence<T> {
  private items: T[];
  private seed?: (idx: number) => T;

  constructor(items: T[], seed?: (idx: number) => T) {
    this.items = [...items];
    this.seed = seed;
  }

  *[Symbol.iterator](): Generator<T> {
    const pending = [...this.items];
    let idx = 0;

    while (true) {
      if (idx >= pending.length) {
        if (this.seed) {
          pending.push(this.seed(pending.length));
        } else {
          // wrap around
          idx = 0;
        }
      }
      if (idx < pending.length) {
        yield pending[idx];
        idx++;
      }
    }
  }

  take(count: number): T[] {
    const result: T[] = [];
    const iter = this[Symbol.iterator]();
    for (let i = 0; i < count; i++) {
      result.push(iter.next().value);
    }
    return result;
  }
}
