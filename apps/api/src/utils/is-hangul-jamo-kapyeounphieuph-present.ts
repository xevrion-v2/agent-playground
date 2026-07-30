/**
 * Checks if the input string contains the Hangul choseong kapyeounphieuph character (U+1157).
 * @param input - The string to check.
 * @returns true if the input contains U+1157, false otherwise.
 */
export function isHangulJamoKapyeounphieuphPresent(input: string): boolean {
  return input.includes('\u1157');
}
