export function isHalfwidthKatakanaLetterSmallEPresent(input: string): boolean {
  return input.includes("\u{FF6A}");
}
