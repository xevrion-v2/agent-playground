/**
 * Checks whether the input string contains the Unicode character U+30A0.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaHiraganaDoubleHyphenPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12448));
}
