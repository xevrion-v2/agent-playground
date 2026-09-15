export function averageNumbers(values: readonly number[]): number | undefined {
  if (values.length === 0) {
    return undefined;
  }

  let total = 0;

  for (const value of values) {
    total += value;
  }

  return total / values.length;
}
