export function isHalfwidthKatakanaLetterSmallOPresent(input: string): boolean {
  return input.includes("\u{FF6B}");
}
