/**
 * Checks if a string contains the Hangul jamo "tikeut-kiyeok".
 * @module utils/is-hangul-jamo-jongseong-tikeut-kiyeok-present
 */
export function IsHangulJamoTikeutKieokPresent(text: string): boolean {
  return text.includes("tikeut-kiyeok");
}
