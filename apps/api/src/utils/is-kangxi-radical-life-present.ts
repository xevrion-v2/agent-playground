/**
 * Detects whether a string contains the Kangxi Radical Life character (U+2F56).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Life character.
 */
export function isKangxiRadicalLifePresent(input: string): boolean {
  return input.includes('\u2F56');
}
