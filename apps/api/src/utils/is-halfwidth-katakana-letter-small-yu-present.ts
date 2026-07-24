export function isHalfwidthKatakanaLetterSmallYuPresent(input: string): boolean {
  return input.includes("\u{FF6D}");
}
