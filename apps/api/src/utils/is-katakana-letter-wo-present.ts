/**
 * Checks whether the input string contains the Katakana letter WO (U+30F2) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterwo(input: string): boolean {
  return input.includes(String.fromCodePoint(12530));
}
