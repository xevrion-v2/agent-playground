/**
 * Detects whether a string contains the Kangxi Radical Profound character (U+2F5A).
 * @param input - The string to check.
 * @returns true if the input contains the kangxi radical profound character.
 */
export function isKangxiRadicalProfoundPresent(input: string): boolean {
  return input.includes('\u2F5A');
}
