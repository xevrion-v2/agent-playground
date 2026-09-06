/**
 * Checks whether the input string contains the Katakana letter small YU (U+30E5) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLettersmallyu(input: string): boolean {
  return input.includes(String.fromCodePoint(12517));
}
