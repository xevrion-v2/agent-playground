export function ensureArray<T>(value: T | readonly T[] | undefined | null): T[] {
  if (Array.isArray(value)) return [...value];
  if (value === undefined || value === null) return [];
  return [value];
}
