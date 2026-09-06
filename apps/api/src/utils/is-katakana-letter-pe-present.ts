/**
 * Checks whether the input string contains the Katakana letter PE (U+30DA) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterpe(input: string): boolean {
  return input.includes(String.fromCodePoint(12506));
}
