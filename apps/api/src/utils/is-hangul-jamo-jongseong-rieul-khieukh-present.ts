/**
 * Checks if a string contains the Hangul jamo "rieul-khieukh".
 * @module utils/is-hangul-jamo-jongseong-rieul-khieukh-present
 */
export function IsHangulJamoRieulKhieukhPresent(text: string): boolean {
  return text.includes("rieul-khieukh");
}
