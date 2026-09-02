/**
 * Returns true if the provided string contains a horizontal tab character (U+0009).
 */
export function isTabSymbolPresent(text: string): boolean {
  return text.includes('\t');
}
