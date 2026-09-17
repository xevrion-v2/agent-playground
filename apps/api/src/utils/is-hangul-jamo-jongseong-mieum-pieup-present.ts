/**
 * Checks if a string contains the Hangul jamo "mieum-pieup".
 * @module utils/is-hangul-jamo-jongseong-mieum-pieup-present
 */
export function IsHangulJamoMieumPieupPresent(text: string): boolean {
  return text.includes("mieum-pieup");
}
