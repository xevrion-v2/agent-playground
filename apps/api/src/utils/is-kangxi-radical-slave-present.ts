/**
 * Checks whether the input string contains the Unicode character U+2FAA.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKangxiRadicalSlavePresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12202));
}
