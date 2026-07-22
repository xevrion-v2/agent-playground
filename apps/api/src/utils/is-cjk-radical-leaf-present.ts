/**
 * Checks whether the input string contains the Unicode character U+2ED9.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isCjkRadicalLeafPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11993));
}
