/**
 * Checks whether the input string contains the Katakana letter BO (U+30DC) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterbo(input: string): boolean {
  return input.includes(String.fromCodePoint(12508));
}
