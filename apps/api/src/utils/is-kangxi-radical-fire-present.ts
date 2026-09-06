/**
 * Detects whether a string contains the Kangxi Radical Fire character (U+2F52).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Fire character.
 */
export function isKangxiRadicalFirePresent(input: string): boolean {
  return input.includes('\u2F52');
}
