export function sumNumbers(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0);
}
