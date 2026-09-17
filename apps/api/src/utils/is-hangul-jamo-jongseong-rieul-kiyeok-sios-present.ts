/**
 * Checks if a string contains the Hangul jamo "rieul-kiyeok-sios".
 * @module utils/is-hangul-jamo-jongseong-rieul-kiyeok-sios-present
 */
export function IsHangulJamoRieulKieokSiosPresent(text: string): boolean {
  return text.includes("rieul-kiyeok-sios");
}
