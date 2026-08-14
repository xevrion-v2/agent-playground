/**
 * Checks whether the input string contains the Katakana letter PU (U+30D7) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterpu(input: string): boolean {
  return input.includes(String.fromCodePoint(12503));
}
