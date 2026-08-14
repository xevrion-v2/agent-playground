export function isHalfwidthKatakanaLetterSmallAPresent(input: string): boolean {
  return input.includes("\u{FF67}");
}
