/**
 * Checks whether the input string contains the Unicode character U+2F8C.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKangxiRadicalTigerPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12172));
}
