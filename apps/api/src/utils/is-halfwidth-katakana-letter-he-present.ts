export function isHalfwidthKatakanaLetterHePresent(input: string): boolean {
  return input.includes("\u{FF8D}");
}
