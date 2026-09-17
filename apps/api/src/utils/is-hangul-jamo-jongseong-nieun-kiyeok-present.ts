/**
 * Checks if a string contains the Hangul jamo "nieun-kiyeok".
 * @module utils/is-hangul-jamo-jongseong-nieun-kiyeok-present
 */
export function IsHangulJamoNieunKieokPresent(text: string): boolean {
  return text.includes("nieun-kiyeok");
}
