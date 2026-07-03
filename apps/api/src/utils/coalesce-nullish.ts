export function coalesceNullish<T, U>(value: T | null | undefined, fallback: U): T | U {
  return value ?? fallback;
}
