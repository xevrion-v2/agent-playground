/**
 * Checks if a string contains the Hangul jamo "ssangieung".
 * @module utils/is-hangul-jamo-jongseong-ssangieung-present
 */
export function IsHangulJamoSsangIeungPresent(text: string): boolean {
  return text.includes("ssangieung");
}
