/**
 * Trims text and collapses repeated whitespace into single spaces.
 * @param text - The text to normalize.
 * @returns Text with normalized whitespace.
 */
export function normalizeWhitespace(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}