export function pickKeys<T extends Record<string, unknown>, K extends keyof T>(
  record: T,
  keys: readonly K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = record[key];
  }
  return result;
}
