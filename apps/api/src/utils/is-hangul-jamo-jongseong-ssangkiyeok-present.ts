/**
 * Checks if a string contains the Hangul jamo "ssangkiyeok".
 * @module utils/is-hangul-jamo-jongseong-ssangkiyeok-present
 */
export function IsHangulJamoSsangKieokPresent(text: string): boolean {
  return text.includes("ssangkiyeok");
}
