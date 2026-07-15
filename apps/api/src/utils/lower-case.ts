/**
 * Converts a string to lowercase.
 * Returns an empty string for null or undefined input.
 */
export function lowerCase(value: string | null | undefined): string {
  if (value == null) {
    return "";
  }
  return value.toLowerCase();
}
