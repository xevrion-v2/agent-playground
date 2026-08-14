/**
 * Checks whether the input string contains the Katakana letter YU (U+30E6) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetteryu(input: string): boolean {
  return input.includes(String.fromCodePoint(12518));
}
