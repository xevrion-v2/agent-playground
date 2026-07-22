/**
 * Checks whether the input string contains the Katakana letter BE (U+30D9) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterbe(input: string): boolean {
  return input.includes(String.fromCodePoint(12505));
}
