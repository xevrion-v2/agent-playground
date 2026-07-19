/**
 * Checks whether the input string contains the Unicode character U+2EB3.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isCjkRadicalNetThreePresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11955));
}
