/**
 * Infinite Sequence Iterator Utility
 * 
 * A utility for creating and managing infinite sequences with safe iteration patterns.
 * This implementation provides memory-efficient iteration over infinite sequences
 * with built-in safety limits to prevent infinite loops.
 */

export interface InfiniteSequenceOptions {
  /** Maximum iterations allowed for safety */
  maxIterations?: number;
  /** Initial value for the sequence */
  initialValue?: number;
}

export class InfiniteSequence {
  private currentValue: number;
  private maxIterations: number;
  private iterationCount: number;
  private generator: () => Generator<number, void, unknown>;
  
  constructor(
    generatorFn: () => Generator<number, void, unknown>,
    options: InfiniteSequenceOptions = {}
  ) {
    this.generator = generatorFn;
    this.currentValue = options.initialValue ?? 0;
    this.maxIterations = options.maxIterations ?? 1000;
    this.iterationCount = 0;
  }

  /**
   * Creates an infinite sequence of natural numbers starting from 0
   */
  static naturalNumbers(options?: InfiniteSequenceOptions): InfiniteSequence {
    function* naturalNumberGenerator() {
      let num = options?.initialValue ?? 0;
      while (true) {
        yield num++;
      }
    }
    
    return new InfiniteSequence(naturalNumberGenerator, options);
  }

  /**
   * Creates an infinite sequence using a generator function
   */
  static fromGenerator(
    generatorFn: () => Generator<number, void, unknown>,
    options?: InfiniteSequenceOptions
  ): InfiniteSequence {
    return new InfiniteSequence(generatorFn, options);
  }

  /**
   * Gets the next value from the infinite sequence
   * @param maxIterations Safety limit for iteration count
   */
  next(maxIterations: number = 1000): { value: number; done: boolean } {
    if (this.iterationCount >= maxIterations) {
      return { value: undefined as any, done: true };
    }
    
    const generator = this.generator();
    const result = generator.next();
    
    this.iterationCount++;
    
    if (result.done) {
      return { value: undefined as any, true };
    }
    
    return { value: result.value, done: false };
  }

  /**
   * Takes a specified number of values from the sequence
   */
  take(count: number, maxIterations: number = 1000): number[] {
    const result: number[] = [];
    const generator = this.generator();
    
    for (let i = 0; i < count && i < maxIterations; i++) {
      const next = generator.next();
      if (next.done) break;
      result.push(next.value);
    }
    
    return result;
  }
  
  /**
   * Resets the iteration count
   */
  reset(): void {
    this.iterationCount = 0;
  }
}