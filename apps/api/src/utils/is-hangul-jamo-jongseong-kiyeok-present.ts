/**
 * Checks if a string contains the Hangul jamo "kiyeok".
 * @module utils/is-hangul-jamo-jongseong-kiyeok-present
 */
export function IsHangulJamoKieokPresent(text: string): boolean {
  return text.includes("kiyeok");
}
