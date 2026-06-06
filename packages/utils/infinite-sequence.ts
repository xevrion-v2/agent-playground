/**
 * InfiniteSequence - An infinite sequence iterator utility
 * 
 * This utility provides a safe way to work with infinite sequences and iterators.
 * It implements the iterator protocol and provides helper methods for working
 * with infinite sequences in a memory-safe way.
 */

export class InfiniteSequence<T> implements Iterable<T> {
  private generatorFunction: () => Generator<T, void, unknown>;

  constructor(generatorFunction: () => Generator<T, void, unknown>) {
    this.generatorFunction = generatorFunction;
  }

  /**
   * Implementation of the iterator protocol
   */
  *[Symbol.iterator]() {
    yield* this.generatorFunction();
  }

  /**
   * Takes a finite number of items from the sequence
   * @param count - Number of items to take
   * @returns Array of items
   */
  take(count: number): T[] {
    const result: T[] = [];
    let i = 0;
    for (const item of this) {
      if (i >= count) break;
      result.push(item);
      i++;
    }
    return result;
  }

  /**
   * Maps the sequence using a transformation function
   * @param fn - Transformation function
   * @returns New InfiniteSequence with transformed values
   */
  map<R>(fn: (item: T) => R): InfiniteSequence<R> {
    const self = this;
    return new InfiniteSequence<R>(function* () {
      for (const item of fn) {
        yield fn(item);
      }
    });
  }

  /**
   * Creates a simple infinite sequence of natural numbers starting from 0
   */
  static naturalNumbers(): InfiniteSequence<number> {
    return new InfiniteSequence<number>(function* () {
      let i = 0;
      while (true) {
        yield i++;
      }
    });
  }
}