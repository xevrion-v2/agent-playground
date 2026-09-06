/**
 * Checks whether the input string contains the Unicode character U+2ED3.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isCjkRadicalCSimplifiedLongPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11987));
}
