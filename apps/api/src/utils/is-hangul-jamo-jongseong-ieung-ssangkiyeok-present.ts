/**
 * Checks if a string contains the Hangul jamo "ieung-ssangkiyeok".
 * @module utils/is-hangul-jamo-jongseong-ieung-ssangkiyeok-present
 */
export function IsHangulJamoIeungSsangKieokPresent(text: string): boolean {
  return text.includes("ieung-ssangkiyeok");
}
