/**
 * Checks whether the input string contains the Katakana letter VE (U+30F9) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterve(input: string): boolean {
  return input.includes(String.fromCodePoint(12537));
}
