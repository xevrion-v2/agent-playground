/**
 * Detects whether a string contains the Kangxi Radical Step character (U+2F3B).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Step character.
 */
export function isKangxiRadicalStepPresent(input: string): boolean {
  return input.includes('\u2F3B');
}
