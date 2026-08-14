/**
 * Checks whether the input string contains the Katakana letter WI (U+30F0) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterwi(input: string): boolean {
  return input.includes(String.fromCodePoint(12528));
}
