/**
 * Checks whether the input string contains the Katakana letter PA (U+30D1) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterpa(input: string): boolean {
  return input.includes(String.fromCodePoint(12497));
}
