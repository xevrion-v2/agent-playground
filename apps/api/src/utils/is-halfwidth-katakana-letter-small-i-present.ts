/**
 * Checks if the input string contains the Unicode halfwidth Katakana letter small I character (U+FF68).
 * @param input - The string to check.
 * @returns True if the input contains the halfwidth Katakana letter small I character, false otherwise.
 */
export function isHalfwidthKatakanaLetterSmallIPresent(input: string): boolean {
  return input.includes('\uFF68');
}
