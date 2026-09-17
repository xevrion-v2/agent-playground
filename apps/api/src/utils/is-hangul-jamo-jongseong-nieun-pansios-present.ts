/**
 * Checks if a string contains the Hangul jamo "nieun-pansios".
 * @module utils/is-hangul-jamo-jongseong-nieun-pansios-present
 */
export function IsHangulJamoNieunPansiosPresent(text: string): boolean {
  return text.includes("nieun-pansios");
}
