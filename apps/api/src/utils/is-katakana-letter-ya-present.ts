/**
 * Checks whether the input string contains the Katakana letter YA (U+30E4) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterya(input: string): boolean {
  return input.includes(String.fromCodePoint(12516));
}
