/**
 * Checks whether the input string contains the Katakana letter (U+30BA) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterzu(input: string): boolean {
  return input.includes(String.fromCodePoint(12474));
}
