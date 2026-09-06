/**
 * Checks whether the input string contains the Katakana letter small WA (U+30EE) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLettersmallwa(input: string): boolean {
  return input.includes(String.fromCodePoint(12526));
}
