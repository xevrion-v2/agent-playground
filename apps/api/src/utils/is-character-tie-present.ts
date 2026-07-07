/**
 * Utility to detect if a string contains the Unicode character tie character (\u2040).
 */

/**
 * Checks if the given string contains the Unicode character tie character (\u2040).
 * @param str - The string to check.
 * @returns {present: boolean} Object indicating whether the character is present.
 */
export function is-character-tie-present(str: string): { present: boolean } {
  return { present: str.includes('\u2040') };
}
