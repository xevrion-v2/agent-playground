/**
 * Returns whether a string contains the Unicode right vertical bar with quill (⸡) character (U+2E21).
 * Issue: #5606
 */
export function $fn(value: string): boolean {
  return value.includes('\u2E21');
}
