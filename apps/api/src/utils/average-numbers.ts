export function averageNumbers(values: readonly number[]): number | undefined {
  return values.length === 0 ? undefined : values.reduce((total, value) => total + value, 0) / values.length;
}