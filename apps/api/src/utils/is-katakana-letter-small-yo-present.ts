/**
 * Checks whether the input string contains the Katakana letter small YO (U+30E7) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLettersmallyo(input: string): boolean {
  return input.includes(String.fromCodePoint(12519));
}
