export function isHalfwidthKatakanaLetterSmallYoPresent(input: string): boolean {
  return input.includes("\u{FF6E}");
}
