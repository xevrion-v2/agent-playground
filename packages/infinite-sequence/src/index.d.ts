export type InfiniteSequence<T> = Iterable<T> & {
  take(count: number): T[];
};

export type InfiniteSequenceOptions<T> = {
  start: T;
  next: (current: T, index: number) => T;
};

export function infiniteSequence<T>(
  options: InfiniteSequenceOptions<T>
): InfiniteSequence<T>;

export function takeFromSequence<T>(
  sequence: Iterable<T>,
  count: number
): T[];

export function naturalNumbers(start?: number): InfiniteSequence<number>;

export function fibonacciSequence(): InfiniteSequence<[number, number]>;
