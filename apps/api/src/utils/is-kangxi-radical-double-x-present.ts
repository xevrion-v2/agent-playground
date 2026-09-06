/**
 * Detects whether a string contains the Kangxi Radical Double X character (U+2F61).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Double X character.
 */
export function isKangxiRadicalDoubleXPresent(input: string): boolean {
  return input.includes('\u2F61');
}
