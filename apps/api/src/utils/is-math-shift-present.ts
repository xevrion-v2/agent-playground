/**
 * Utility to detect if a string contains the Unicode math shift character (\u205A).
 */

/**
 * Checks if the given string contains the Unicode math shift character (\u205A).
 * @param str - The string to check.
 * @returns {present: boolean} Object indicating whether the character is present.
 */
export function is-math-shift-present(str: string): { present: boolean } {
  return { present: str.includes('\u205A') };
}
