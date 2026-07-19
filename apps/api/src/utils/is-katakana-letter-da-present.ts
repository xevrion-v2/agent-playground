/**
 * Checks whether the input string contains the Katakana letter (U+30C0) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterda(input: string): boolean {
  return input.includes(String.fromCodePoint(12480));
}
