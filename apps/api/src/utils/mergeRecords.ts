export function mergeRecords<T extends Record<string, unknown>>(
  base: T,
  overrides: Partial<{ [K in keyof T]: T[K] | undefined }>
): T {
  const merged = { ...base };

  for (const [key, value] of Object.entries(overrides) as [keyof T, T[keyof T] | undefined][]) {
    if (value !== undefined) {
      merged[key] = value;
    }
  }

  return merged;
}
