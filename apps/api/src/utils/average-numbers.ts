export function averageNumbers(
  values: readonly number[],
): number | undefined {
  if (values.length === 0) {
    return undefined;
  }

  const total = values.reduce((sum, value) => sum + value, 0);
  return total / values.length;
}
