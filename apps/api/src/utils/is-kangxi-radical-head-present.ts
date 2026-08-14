/**
 * Checks whether the input string contains the Unicode character U+2FB8.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKangxiRadicalHeadPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12216));
}
