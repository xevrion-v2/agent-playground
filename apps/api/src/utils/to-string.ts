/**
 * Safely converts any value to its string representation.
 * Handles null and undefined gracefully.
 */
export function toString(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  return String(value);
}
