/**
 * Checks whether the input string contains the Katakana letter (U+30B7) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLettersi(input: string): boolean {
  return input.includes(String.fromCodePoint(12471));
}
