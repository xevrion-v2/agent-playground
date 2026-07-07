/**
 * Returns whether a string contains the Unicode top right half bracket (⸣) character (U+2E23).
 * Issue: #5608
 */
export function $fn(value: string): boolean {
  return value.includes('\u2E23');
}
