/**
 * Detects whether a string contains the Kangxi Radical Half Tree Trunk character (U+2F62).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Half Tree Trunk character.
 */
export function isKangxiRadicalHalfTreeTrunkPresent(input: string): boolean {
  return input.includes('\u2F62');
}
