/**
 * Checks if the input string contains the Hangul choseong chitueumcieuc character (U+114E).
 * @param input - The string to check.
 * @returns true if the character is present, false otherwise.
 */
export function isHangulJamoChitueumcieucPresent(input: string): boolean {
  const targetChar = '\u114E';
  return input.includes(targetChar);
}
