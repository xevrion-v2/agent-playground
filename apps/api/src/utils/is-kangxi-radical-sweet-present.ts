/**
 * Detects whether a string contains the Kangxi Radical Sweet character (U+2F64).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Sweet character.
 */
export function isKangxiRadicalSweetPresent(input: string): boolean {
  return input.includes('\u2F64');
}
