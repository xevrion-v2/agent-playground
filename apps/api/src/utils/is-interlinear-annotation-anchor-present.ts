/**
 * Checks whether the input string contains the Unicode character U+FFF9.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isInterlinearAnnotationAnchorPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(65529));
}
