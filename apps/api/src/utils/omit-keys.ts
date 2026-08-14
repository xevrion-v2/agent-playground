export function omitKeys<T extends object, K extends keyof T>(source: T, keys: readonly K[]): Omit<T, K> {
  const result = { ...source } as Record<keyof T, T[keyof T]>;

  for (const key of keys) {
    delete result[key];
  }

  return result as unknown as Omit<T, K>;
}