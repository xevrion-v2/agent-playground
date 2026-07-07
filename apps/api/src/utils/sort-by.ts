export type SortDirection = 'asc' | 'desc';

export function sortBy<T>(
  values: readonly T[],
  selector: (value: T) => string | number,
  direction: SortDirection = 'asc',
): T[] {
  return [...values].sort((left, right) => {
    const leftValue = selector(left);
    const rightValue = selector(right);

    if (leftValue === rightValue) {
      return 0;
    }

    const result = leftValue > rightValue ? 1 : -1;
    return direction === 'asc' ? result : -result;
  });
}