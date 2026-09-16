/**
 * Guards whether a value is a non-empty string.
 * @module utils/is-non-empty-string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
