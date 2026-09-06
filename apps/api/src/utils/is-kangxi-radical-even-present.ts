/**
 * Checks whether the input string contains the Unicode character U+2FD1.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKangxiRadicalEvenPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12241));
}
