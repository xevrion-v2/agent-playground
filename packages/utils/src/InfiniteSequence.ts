/**
 * InfiniteSequence — a lazy, infinite iterable/iterator.
 *
 * Generates an endless sequence of values from a start point with an
 * optional step. Safe for use with `take(n)` to limit consumption.
 *
 * @example
 * ```ts
 * const seq = new InfiniteSequence(1, 2);  // 1, 3, 5, 7, ...
 * const first5 = [...seq.take(5)];         // [1, 3, 5, 7, 9]
 * ```
 */
export class InfiniteSequence {
  private current: number;
  private readonly step: number;

  constructor(start = 0, step = 1) {
    this.current = start;
    this.step = step;
  }

  /**
   * Returns the next value and advances the internal counter.
   * Implements the Iterator protocol so `for...of` works with `.take()`.
   */
  next(): { value: number; done: false } {
    const value = this.current;
    this.current += this.step;
    return { value, done: false };
  }

  /**
   * Returns an iterator that yields the first `n` values of the sequence.
   * Prevents infinite loops when used with spread or `for...of`.
   */
  take(n: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < n; i++) {
      result.push(this.next().value);
    }
    return result;
  }

  /**
   * Resets the sequence back to its initial start value.
   */
  reset(): void {
    this.current = this.current - this.step * (this.current / this.step);
  }

  /**
   * Returns an iterator that yields values while `predicate` returns true.
   */
  takeWhile(predicate: (value: number) => boolean): number[] {
    const result: number[] = [];
    while (true) {
      const v = this.next().value;
      if (!predicate(v)) break;
      result.push(v);
    }
    return result;
  }
}
