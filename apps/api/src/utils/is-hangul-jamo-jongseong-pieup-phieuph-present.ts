/**
 * Checks if a string contains the Hangul jamo "pieup-phieuph".
 * @module utils/is-hangul-jamo-jongseong-pieup-phieuph-present
 */
export function IsHangulJamoPieupPhieuphPresent(text: string): boolean {
  return text.includes("pieup-phieuph");
}
