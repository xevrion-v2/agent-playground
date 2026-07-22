/**
 * Checks whether the input string contains the Katakana letter PO (U+30DD) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterpo(input: string): boolean {
  return input.includes(String.fromCodePoint(12509));
}
