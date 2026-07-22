/**
 * Checks whether the input string contains the Katakana letter MA (U+30DE) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterma(input: string): boolean {
  return input.includes(String.fromCodePoint(12510));
}
