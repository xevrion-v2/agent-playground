/**
 * Checks if a string contains the Hangul jamo "rieul-kiyeok".
 * @module utils/is-hangul-jamo-jongseong-rieul-kiyeok-present
 */
export function IsHangulJamoRieulKieokPresent(text: string): boolean {
  return text.includes("rieul-kiyeok");
}
