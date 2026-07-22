/**
 * Checks whether the input string contains the Katakana letter VU (U+30F4) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLettervu(input: string): boolean {
  return input.includes(String.fromCodePoint(12532));
}
