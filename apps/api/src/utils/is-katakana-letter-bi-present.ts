/**
 * Checks whether the input string contains the Katakana letter BI (U+30D3) character.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKatakanaLetterbi(input: string): boolean {
  return input.includes(String.fromCodePoint(12499));
}
