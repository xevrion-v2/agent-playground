/**
 * Checks whether the input string contains the Katakana letter RI (U+30EA) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterri(input: string): boolean {
  return input.includes(String.fromCodePoint(12522));
}
