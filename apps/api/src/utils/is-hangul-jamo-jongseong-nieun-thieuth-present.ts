/**
 * Checks if a string contains the Hangul jamo "nieun-thieuth".
 * @module utils/is-hangul-jamo-jongseong-nieun-thieuth-present
 */
export function IsHangulJamoNieunThieuthPresent(text: string): boolean {
  return text.includes("nieun-thieuth");
}
