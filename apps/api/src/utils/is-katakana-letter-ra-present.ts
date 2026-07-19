/**
 * Checks whether the input string contains the Katakana letter RA (U+30E9) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterra(input: string): boolean {
  return input.includes(String.fromCodePoint(12521));
}
