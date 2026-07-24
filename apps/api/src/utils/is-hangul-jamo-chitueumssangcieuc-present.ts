/**
 * Checks if the input string contains the Hangul choseong chitueumssangcieuc character (U+114F).
 * @param input - The string to check.
 * @returns true if the character is present, false otherwise.
 */
export function isHangulJamoChitueumssangcieucPresent(input: string): boolean {
  const targetChar = '\u114F';
  return input.includes(targetChar);
}
