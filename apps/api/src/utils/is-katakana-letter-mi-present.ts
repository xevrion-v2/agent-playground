/**
 * Checks whether the input string contains the Katakana letter MI (U+30DF) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLettermi(input: string): boolean {
  return input.includes(String.fromCodePoint(12511));
}
