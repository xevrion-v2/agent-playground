export function ensureArray<T>(value: readonly T[]): T[];
export function ensureArray<T>(value: T | null | undefined): T[];
export function ensureArray<T>(value: T | readonly T[] | null | undefined): T[] {
  if (value == null) {
    return [];
  }

  return Array.isArray(value) ? Array.from(value) : [value as T];
}
