/**
 * Checks whether the input string contains the Katakana letter WA (U+30EF) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterwa(input: string): boolean {
  return input.includes(String.fromCodePoint(12527));
}
