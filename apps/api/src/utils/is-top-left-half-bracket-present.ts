/**
 * Returns whether a string contains the Unicode top left half bracket (⸢) character (U+2E22).
 * Issue: #5607
 */
export function $fn(value: string): boolean {
  return value.includes('\u2E22');
}
