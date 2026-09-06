/**
 * Checks whether the input string contains the Katakana letter VO (U+30FA) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLettervo(input: string): boolean {
  return input.includes(String.fromCodePoint(12538));
}
