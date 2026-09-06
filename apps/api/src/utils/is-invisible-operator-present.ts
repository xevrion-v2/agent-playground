/**
 * Utility to detect if a string contains the Unicode invisible operator character (\u2062).
 */

/**
 * Checks if the given string contains the Unicode invisible operator character (\u2062).
 * @param str - The string to check.
 * @returns {present: boolean} Object indicating whether the character is present.
 */
export function is-invisible-operator-present(str: string): { present: boolean } {
  return { present: str.includes('\u2062') };
}
