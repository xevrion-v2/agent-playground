export function compactArray<T>(values: readonly (T | null | undefined)[]): T[] {
  const result: T[] = [];

  for (const value of values) {
    if (value !== null && value !== undefined) {
      result.push(value);
    }
  }

  return result;
}
