/**
 * Checks whether the input string contains the Unicode character U+FFA0.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isHalfwidthHangulFillerPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(65440));
}
