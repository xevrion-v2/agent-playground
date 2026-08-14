/**
 * Checks whether the input string contains the Katakana letter HU (U+30D5) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterhu(input: string): boolean {
  return input.includes(String.fromCodePoint(12501));
}
