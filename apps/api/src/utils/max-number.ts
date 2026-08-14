export function maxNumber(values: readonly number[]): number | undefined {
  if (values.length === 0) {
    return undefined;
  }
  return Math.max(...values);
}
