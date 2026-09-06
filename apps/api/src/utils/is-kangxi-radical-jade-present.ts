/**
 * Detects whether a string contains the Kangxi Radical Jade character (U+2F59).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Jade character.
 */
export function isKangxiRadicalJadePresent(input: string): boolean {
  return input.includes('\u2F59');
}
