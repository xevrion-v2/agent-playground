/**
 * Checks if a string contains the Hangul jamo "kiyeok-hieuh".
 * @module utils/is-hangul-jamo-jongseong-kiyeok-hieuh-present
 */
export function IsHangulJamoKieokHieuhPresent(text: string): boolean {
  return text.includes("kiyeok-hieuh");
}
