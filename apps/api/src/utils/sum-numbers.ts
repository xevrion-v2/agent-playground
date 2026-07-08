export function sumNumbers(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}
