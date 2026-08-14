/**
 * Checks whether the input string contains the Katakana letter HI (U+30D2) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterhi(input: string): boolean {
  return input.includes(String.fromCodePoint(12498));
}
