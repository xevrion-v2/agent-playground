/**
 * Detects whether a string contains the Kangxi Radical Cow character (U+2F5C).
 * @param input - The string to check.
 * @returns true if the input contains the kangxi radical cow character.
 */
export function isKangxiRadicalCowPresent(input: string): boolean {
  return input.includes('\u2F5C');
}