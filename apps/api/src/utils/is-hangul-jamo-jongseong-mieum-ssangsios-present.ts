/**
 * Checks if a string contains the Hangul jamo "mieum-ssangsios".
 * @module utils/is-hangul-jamo-jongseong-mieum-ssangsios-present
 */
export function IsHangulJamoMieumSsangSiosPresent(text: string): boolean {
  return text.includes("mieum-ssangsios");
}
