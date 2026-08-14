/**
 * Checks whether the input string contains the Unicode character U+2FFB.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isIdeographicDescriptionCharacterOverlaidPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12283));
}
