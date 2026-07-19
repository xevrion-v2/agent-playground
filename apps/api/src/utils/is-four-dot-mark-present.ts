/**
 * Checks whether the input string contains the Unicode character U+205B.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isFourDotMarkPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(8283));
}
