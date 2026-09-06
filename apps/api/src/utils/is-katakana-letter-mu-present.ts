/**
 * Checks whether the input string contains the Katakana letter MU (U+30E0) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLettermu(input: string): boolean {
  return input.includes(String.fromCodePoint(12512));
}
