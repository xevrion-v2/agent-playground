/**
 * Utility to detect if a string contains the Unicode inverted undertie character (\u2054).
 */

/**
 * Checks if the given string contains the Unicode inverted undertie character (\u2054).
 * @param str - The string to check.
 * @returns {present: boolean} Object indicating whether the character is present.
 */
export function is-inverted-undertie-present(str: string): { present: boolean } {
  return { present: str.includes('\u2054') };
}
