/**
 * Checks whether the input string contains the Unicode character U+2E00.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isRightAngleSubstitutionMarkerPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11776));
}
