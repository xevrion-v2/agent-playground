
import { Iterator, Iterable } from 'tslib';

/**
 * InfiniteSequence is a utility class that generates an infinite sequence.
 * It can be used to create an iterator that yields values indefinitely.
 */
export class InfiniteSequence<T> implements Iterable<T> {
  private _generator: () => T;

  constructor(generator: () => T) {
    this._generator = generator;
  }

  [Symbol.iterator](): Iterator<T> {
    return {
      next: () => {
        const value = this._generator();
        return { value, done: false };
      },
    };
  }
}

/**
 * Example usage:
 * const infiniteNumbers = new InfiniteSequence<number>(() => Math.random());
 * for (const number of infiniteNumbers) {
 *   console.log(number);
 *   // Break the loop when you want to stop iterating
 * }
 */
```