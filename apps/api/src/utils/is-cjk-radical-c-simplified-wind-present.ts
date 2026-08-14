/**
 * Checks whether the input string contains the Unicode character U+2EDB.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isCjkRadicalCSimplifiedWindPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11995));
}
