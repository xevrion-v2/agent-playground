/**
 * Checks if the input string contains the Unicode halfwidth Katakana letter small O character (U+FF6B).
 * @param input - The string to check.
 * @returns True if the input contains the halfwidth Katakana letter small O character, false otherwise.
 */
export function isHalfwidthKatakanaLetterSmallOPresent(input: string): boolean {
  return input.includes('\uFF6B');
}
