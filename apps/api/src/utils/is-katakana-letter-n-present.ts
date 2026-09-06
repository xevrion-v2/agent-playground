/**
 * Checks whether the input string contains the Katakana letter N (U+30F3) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLettern(input: string): boolean {
  return input.includes(String.fromCodePoint(12531));
}
