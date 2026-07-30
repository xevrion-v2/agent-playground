/**
 * Checks if the input string contains the Hangul choseong tikeut-rieul character (U+115E).
 * @param input - The string to check.
 * @returns true if the input contains U+115E, false otherwise.
 */
export function isHangulJamoTikeutRieulPresent(input: string): boolean {
  return input.includes('\u115E');
}
