/**
 * Checks whether the input string contains the Katakana letter PI (U+30D4) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterpi(input: string): boolean {
  return input.includes(String.fromCodePoint(12500));
}
