/**
 * Checks whether the input string contains the Katakana letter WE (U+30F1) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterwe(input: string): boolean {
  return input.includes(String.fromCodePoint(12529));
}
