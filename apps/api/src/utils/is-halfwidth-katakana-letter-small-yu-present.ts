/**
 * Checks if the input string contains the Unicode halfwidth Katakana letter small YU character (U+FF6D).
 * @param input - The string to check.
 * @returns True if the input contains the halfwidth Katakana letter small YU character, false otherwise.
 */
export function isHalfwidthKatakanaLetterSmallYuPresent(input: string): boolean {
  const halfwidthKatakanaSmallYu = '\uFF6D';
  return input.includes(halfwidthKatakanaSmallYu);
}
