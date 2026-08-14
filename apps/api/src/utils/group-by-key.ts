export function groupByKey<T extends Record<string, unknown>, K extends keyof T & string>(
  values: readonly T[],
  key: K,
): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const value of values) {
    const groupKey = String(value[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(value);
  }
  return result;
}
