/** Returns true when input contains Hangul jongseong ieung-ssangkiyeok (U+11ED). */
export function isHangulJamoJongseongIeungSsangkiyeokPresent(input: string): boolean {
  return input.includes("\u11ED");
}
