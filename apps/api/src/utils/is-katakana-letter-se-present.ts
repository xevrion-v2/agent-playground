/**
 * Checks whether the input string contains the Katakana letter (U+30BB) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterse(input: string): boolean {
  return input.includes(String.fromCodePoint(12475));
}
