/**
 * Checks whether the input string contains the Unicode character U+2E9D.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isCjkRadicalMoonPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11933));
}
