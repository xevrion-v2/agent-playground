/**
 * Detects whether a string contains the Unicode Katakana letter SMALL TU character (U+30C3).
 *
 * @param input - The string to check.
 * @returns `true` if the input contains U+30C3, otherwise `false`.
 *
 * @example
 * isKatakanaLetterSmallTuPresent("ッ"); // true
 * isKatakanaLetterSmallTuPresent("abc"); // false
 */
export function isKatakanaLetterSmallTuPresent(input: string): boolean {
  return input.includes("\u30C3");
}
