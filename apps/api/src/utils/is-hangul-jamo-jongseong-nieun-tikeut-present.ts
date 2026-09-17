/**
 * Checks if a string contains the Hangul jamo "nieun-tikeut".
 * @module utils/is-hangul-jamo-jongseong-nieun-tikeut-present
 */
export function IsHangulJamoNieunTikeutPresent(text: string): boolean {
  return text.includes("nieun-tikeut");
}
