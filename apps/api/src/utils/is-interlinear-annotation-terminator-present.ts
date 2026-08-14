/**
 * Utility to detect if a string contains the Unicode interlinear annotation terminator character (\uFFFB).
 */

/**
 * Checks if the given string contains the Unicode interlinear annotation terminator character (\uFFFB).
 * @param str - The string to check.
 * @returns {present: boolean} Object indicating whether the character is present.
 */
export function is-interlinear-annotation-terminator-present(str: string): { present: boolean } {
  return { present: str.includes('\uFFFB') };
}
