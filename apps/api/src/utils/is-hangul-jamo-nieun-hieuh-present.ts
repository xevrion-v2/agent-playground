/**
 * Checks if the input string contains the Hangul choseong nieun-hieuh character (U+115D).
 * @param input - The string to check.
 * @returns true if the character is present, false otherwise.
 */
export function isHangulJamoNieunHieuhPresent(input: string): boolean {
  const targetChar = '\u115D';
  return input.includes(targetChar);
}
