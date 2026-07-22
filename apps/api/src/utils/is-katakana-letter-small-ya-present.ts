/**
 * Checks whether the input string contains the Katakana letter small YA (U+30E3) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLettersmallya(input: string): boolean {
  return input.includes(String.fromCodePoint(12515));
}
