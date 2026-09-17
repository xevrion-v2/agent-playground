/**
 * Checks if a string contains the Hangul jamo "kiyeok-khieukh".
 * @module utils/is-hangul-jamo-jongseong-kiyeok-khieukh-present
 */
export function IsHangulJamoKieokKhieukhPresent(text: string): boolean {
  return text.includes("kiyeok-khieukh");
}
