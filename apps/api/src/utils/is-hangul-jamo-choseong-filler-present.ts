/**
 * Checks if the input string contains the Hangul choseong filler character (U+115F).
 * @param input - The string to check.
 * @returns True if the input contains the Hangul choseong filler character, false otherwise.
 */
export function isHangulJamoChoseongFillerPresent(input: string): boolean {
  return input.includes('\u115F');
}
