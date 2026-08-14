/**
 * Detects whether a string contains the Kangxi Radical Field character (U+2F55).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Field character.
 */
export function isKangxiRadicalFieldPresent(input: string): boolean {
  return input.includes('\u2F55');
}
