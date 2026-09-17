/**
 * Checks if a string contains the Hangul jamo "ssangnieun".
 * @module utils/is-hangul-jamo-jongseong-ssangnieun-present
 */
export function IsHangulJamoSsangNieunPresent(text: string): boolean {
  return text.includes("ssangnieun");
}
