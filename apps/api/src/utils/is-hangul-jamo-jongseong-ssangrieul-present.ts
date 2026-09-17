/**
 * Checks if a string contains the Hangul jamo "ssangrieul".
 * @module utils/is-hangul-jamo-jongseong-ssangrieul-present
 */
export function IsHangulJamoSsangRieulPresent(text: string): boolean {
  return text.includes("ssangrieul");
}
