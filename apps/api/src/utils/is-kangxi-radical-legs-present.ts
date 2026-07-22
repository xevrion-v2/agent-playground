/**
 * Checks whether the input string contains the Unicode character U+2F09.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKangxiRadicalLegsPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12041));
}
