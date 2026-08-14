/**
 * Checks whether the input string contains the Katakana letter BU (U+30D6) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterbu(input: string): boolean {
  return input.includes(String.fromCodePoint(12502));
}
