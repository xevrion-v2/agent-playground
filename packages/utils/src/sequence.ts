export class InfiniteSequence<T> {
  private generator: () => T;
  private index = 0;
  constructor(generator: () => T) { this.generator = generator; }
  next(): T { this.index++; return this.generator(); }
  take(n: number): T[] { return Array.from({ length: n }, () => this.next()); }
  getIndex(): number { return this.index; }
}
