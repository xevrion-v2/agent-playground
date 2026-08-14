/**
 * Checks whether the input string contains the Katakana letter RE (U+30EC) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterre(input: string): boolean {
  return input.includes(String.fromCodePoint(12524));
}
