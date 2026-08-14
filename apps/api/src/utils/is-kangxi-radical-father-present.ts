/**
 * Detects whether a string contains the Kangxi Radical Father character (U+2F60).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Father character.
 */
export function isKangxiRadicalFatherPresent(input: string): boolean {
  return input.includes('\u2F60');
}
