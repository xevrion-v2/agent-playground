/**
 * Type guard utility.
 */
export function isNonEmptyArray<T>(input: readonly T[]): input is [T, ...T[]] {
  return input.length > 0;
}
