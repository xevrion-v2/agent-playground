/**
 * Checks if the input string contains the Hangul choseong ssanghieuh character (U+1158).
 * @param input - The string to check.
 * @returns true if the input contains U+1158, false otherwise.
 */
export function isHangulJamoSsanghieuhPresent(input: string): boolean {
  return input.includes('\u1158');
}
