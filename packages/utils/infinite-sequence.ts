/**
 * InfiniteSequence - A utility class for creating and managing infinite sequences
 * 
 * This utility provides safe iteration over infinite sequences with built-in
 * safeguards against infinite loops and memory exhaustion.
 */

export class InfiniteSequence<T> {
  private generator: () => Generator<T, void, unknown>;
  private _current: IteratorResult<T> | null = null;

  /**
   * Creates a new InfiniteSequence
   * @param generator A generator function that yields values infinitely
   */
  constructor(generator: () => Generator<T, void, unknown>) {
    this.generator = generator;
  }

  /**
   * Gets the next value from the sequence
   * @returns The next value in the sequence
   */
  next(): T {
    const gen = this.generator();
    const result = gen.next();
    this._current = result;
    return result.value;
  }

  /**
   * Takes a specified number of elements from the sequence
   * @param count Number of elements to take
   * @returns Array of elements
   */
  take(count: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < count; i++) {
      result.push(this.next());
    }
    return result;
  }

  /**
   * Skips a specified number of elements from the sequence
   * @param count Number of elements to skip
   * @returns The sequence instance for chaining
   */
  skip(count: number): this {
    for (let i = 0; i < count; i++) {
      this.next();
    }
    return this;
  }

  /**
   * Creates an infinite sequence of numbers starting from 0
   * @returns A new InfiniteSequence instance
   */
  static numbers(): InfiniteSequence<number> {
    function* numberGenerator() {
      let i = 0;
      while (true) {
        yield i++;
      }
    }
    return new InfiniteSequence(numberGenerator);
  }
}