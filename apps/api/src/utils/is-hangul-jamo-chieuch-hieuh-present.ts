/**
 * Checks if the input string contains the Hangul choseong chieuch-hieuh character (U+1153).
 * @param input - The string to check.
 * @returns true if the character is present, false otherwise.
 */
export function isHangulJamoChieuchHieuhPresent(input: string): boolean {
  return input.includes('\u1153');
}
