/**
 * Checks whether the input string contains the Katakana letter MO (U+30E2) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLettermo(input: string): boolean {
  return input.includes(String.fromCodePoint(12514));
}
