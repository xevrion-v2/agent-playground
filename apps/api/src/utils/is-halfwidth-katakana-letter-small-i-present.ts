export function isHalfwidthKatakanaLetterSmallIPresent(input: string): boolean {
  return input.includes("\u{FF68}");
}
