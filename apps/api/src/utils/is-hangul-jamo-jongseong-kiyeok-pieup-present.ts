/**
 * Checks if a string contains the Hangul jamo "kiyeok-pieup".
 * @module utils/is-hangul-jamo-jongseong-kiyeok-pieup-present
 */
export function IsHangulJamoKieokPieupPresent(text: string): boolean {
  return text.includes("kiyeok-pieup");
}
