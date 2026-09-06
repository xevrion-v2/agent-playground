/**
 * Checks whether the input string contains the Katakana letter VA (U+30F7) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterva(input: string): boolean {
  return input.includes(String.fromCodePoint(12535));
}
