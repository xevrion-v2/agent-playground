/**
 * Returns whether a string contains the Unicode left vertical bar with quill (⸠) character (U+2E20).
 * Issue: #5605
 */
export function $fn(value: string): boolean {
  return value.includes('\u2E20');
}
