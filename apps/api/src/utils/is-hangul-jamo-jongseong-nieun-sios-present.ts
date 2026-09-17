/**
 * Checks if a string contains the Hangul jamo "nieun-sios".
 * @module utils/is-hangul-jamo-jongseong-nieun-sios-present
 */
export function IsHangulJamoNieunSiosPresent(text: string): boolean {
  return text.includes("nieun-sios");
}
