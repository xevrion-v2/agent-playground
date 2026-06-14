/**
 * Represents an infinite sequence generator utility.
 * Since infinite sequences can easily cause infinite loops if iterated directly
 * without boundaries, this utility provides helpers to safely consume it.
 */
export class InfiniteSequence implements Iterable<number> {
  private start: number;
  private step: number;

  /**
   * Creates an instance of InfiniteSequence.
   * @param start - The starting number of the sequence. Default is 0.
   * @param step - The increment for each step. Default is 1.
   */
  constructor(start: number = 0, step: number = 1) {
    this.start = start;
    this.step = step;
  }

  /**
   * Generator function that produces the infinite sequence.
   */
  *[Symbol.iterator](): Generator<number, void, unknown> {
    let current = this.start;
    while (true) {
      yield current;
      current += this.step;
    }
  }

  /**
   * Safely takes a specified number of elements from the infinite sequence
   * to prevent infinite loops during consumption.
   * 
   * @param count - The maximum number of elements to retrieve.
   * @returns An array containing the first `count` elements of the sequence.
   * 
   * @example
   * ```typescript
   * const seq = new InfiniteSequence(1, 2); // Odd numbers: 1, 3, 5, ...
   * const firstFive = seq.take(5); // [1, 3, 5, 7, 9]
   * ```
   */
  take(count: number): number[] {
    const result: number[] = [];
    if (count <= 0) return result;

    let index = 0;
    for (const value of this) {
      result.push(value);
      index++;
      if (index >= count) {
        break;
      }
    }
    return result;
  }
}

/**
 * Helper function to create a new InfiniteSequence.
 * 
 * @param start - The starting number.
 * @param step - The increment step.
 * @returns A new InfiniteSequence instance.
 */
export function createSequence(start?: number, step?: number): InfiniteSequence {
  return new InfiniteSequence(start, step);
}
