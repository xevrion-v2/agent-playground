/**
 * Checks whether the input string contains the Katakana letter HE (U+30D8) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterhe(input: string): boolean {
  return input.includes(String.fromCodePoint(12504));
}
