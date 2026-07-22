/**
 * Checks whether the input string contains the Katakana letter RU (U+30EB) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterru(input: string): boolean {
  return input.includes(String.fromCodePoint(12523));
}
