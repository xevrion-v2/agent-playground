/**
 * Checks whether the input string contains the Katakana letter HO (U+30DB) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterho(input: string): boolean {
  return input.includes(String.fromCodePoint(12507));
}
