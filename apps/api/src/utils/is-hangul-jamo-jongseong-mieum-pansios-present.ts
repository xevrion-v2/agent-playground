/**
 * Checks if a string contains the Hangul jamo "mieum-pansios".
 * @module utils/is-hangul-jamo-jongseong-mieum-pansios-present
 */
export function IsHangulJamoMieumPansiosPresent(text: string): boolean {
  return text.includes("mieum-pansios");
}
