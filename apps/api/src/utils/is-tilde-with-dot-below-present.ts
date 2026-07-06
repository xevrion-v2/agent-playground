/**
 * Returns whether a string contains the Unicode tilde with dot below (⸟) character (U+2E1F).
 * Issue: #5604
 */
export function $fn(value: string): boolean {
  return value.includes('\u2E1F');
}
