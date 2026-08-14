export function ensureArray<T>(value: T | readonly T[] | null | undefined): T[] {
  if (value == null) {
    return [];
  }

  if (Array.isArray(value)) {
    return [...value];
  }

  return [value as T];
}
