/**
 * Checks whether the input string contains the Unicode character U+2EA5.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isCjkRadicalPawTwoPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11941));
}
