/**
 * Checks whether the input string contains the Unicode character U+2F7F.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKangxiRadicalEarPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12159));
}
