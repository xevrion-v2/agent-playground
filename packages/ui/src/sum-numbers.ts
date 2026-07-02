export function sumNumbers(values: readonly number[]): number {
  return values.reduce((acc, v) => acc + v, 0);
}
