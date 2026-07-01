export function mergeRecords<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>,
>(base: T, overrides: U): T & Partial<U> {
  const merged = { ...base } as T & Partial<U>;

  for (const [key, value] of Object.entries(overrides)) {
    if (value !== undefined) {
      (merged as Record<string, unknown>)[key] = value;
    }
  }

  return merged;
}
