/**
 * Checks if a string contains the Hangul jamo "ssangsios".
 * @module utils/is-hangul-jamo-jongseong-ssangsios-present
 */
export function IsHangulJamoSsangSiosPresent(text: string): boolean {
  return text.includes("ssangsios");
}
