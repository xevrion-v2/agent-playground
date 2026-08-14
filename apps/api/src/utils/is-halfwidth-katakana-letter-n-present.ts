export function isHalfwidthKatakanaLetterNPresent(input: string): boolean {
  return input.includes("\u{FF9D}");
}
