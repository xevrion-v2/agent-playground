export function coalesceNullish<T>(value: T | null | undefined, fallback: T): T {
  return value === null || value === undefined ? fallback : value;
}
