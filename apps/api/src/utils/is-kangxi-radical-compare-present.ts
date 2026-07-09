/**
 * Detects whether a string contains the Unicode kangxi radical compare character (U+2F50).
 *
 * @param input - The string to check.
 * @returns true if the input contains U+2F50, false otherwise.
 */
export function isKangxiRadicalComparePresent(input: string): boolean {
  return input.includes('\u2F50');
}
