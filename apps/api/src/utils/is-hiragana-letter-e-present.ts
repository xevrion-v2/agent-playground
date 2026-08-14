/**
 * Checks whether the input string contains the Unicode character U+3048.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isHiraganaLetterEPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12360));
}
