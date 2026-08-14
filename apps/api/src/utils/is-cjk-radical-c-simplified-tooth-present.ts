/**
 * Checks whether the input string contains the Unicode character U+2EEE.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isCjkRadicalCSimplifiedToothPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12014));
}
