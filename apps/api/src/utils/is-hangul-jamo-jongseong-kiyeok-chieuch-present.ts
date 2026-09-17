/**
 * Checks if a string contains the Hangul jamo "kiyeok-chieuch".
 * @module utils/is-hangul-jamo-jongseong-kiyeok-chieuch-present
 */
export function IsHangulJamoKieokChieuchPresent(text: string): boolean {
  return text.includes("kiyeok-chieuch");
}
