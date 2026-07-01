export function minNumber(values: readonly number[]): number | undefined {
  return values.length === 0 ? undefined : Math.min(...values);
}