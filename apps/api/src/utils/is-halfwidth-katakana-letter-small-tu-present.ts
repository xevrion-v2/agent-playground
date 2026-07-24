export function isHalfwidthKatakanaLetterSmallTuPresent(input: string): boolean {
  return input.includes("\u{FF6F}");
}
