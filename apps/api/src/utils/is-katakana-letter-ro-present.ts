/**
 * Checks whether the input string contains the Katakana letter RO (U+30ED) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterro(input: string): boolean {
  return input.includes(String.fromCodePoint(12525));
}
