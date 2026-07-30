/**
 * Checks if the input string contains the Hangul choseong yeorinhieuh character (U+1159).
 * @param input - The string to check.
 * @returns true if the character is present, false otherwise.
 */
export function isHangulJamoYeorinhieuhPresent(input: string): boolean {
  return input.includes('\u1159');
}
