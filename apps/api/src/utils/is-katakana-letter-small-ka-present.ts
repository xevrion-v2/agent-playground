/**
 * Checks whether the input string contains the Katakana letter small KA (U+30F5) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLettersmallka(input: string): boolean {
  return input.includes(String.fromCodePoint(12533));
}
