export function omitKeys<T extends Record<string, unknown>, K extends keyof T>(
  record: T,
  keys: readonly K[],
): Omit<T, K> {
  const result = { ...record };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}
