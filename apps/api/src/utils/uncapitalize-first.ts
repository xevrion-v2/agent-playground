/**
 * Returns the input string with its first character lowercased.
 *
 * The remainder of the string is preserved exactly as provided so callers can
 * format labels or identifiers without altering existing casing.
 */
export function uncapitalizeFirst(value: string): string {
  if (value.length === 0) {
    return "";
  }

  return value.charAt(0).toLowerCase() + value.slice(1);
}
