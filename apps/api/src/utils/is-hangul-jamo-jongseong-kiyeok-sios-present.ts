/**
 * Checks if a string contains the Hangul jamo "kiyeok-sios".
 * @module utils/is-hangul-jamo-jongseong-kiyeok-sios-present
 */
export function IsHangulJamoKieokSiosPresent(text: string): boolean {
  return text.includes("kiyeok-sios");
}
