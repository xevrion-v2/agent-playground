export function isHalfwidthKatakanaLetterSuPresent(input: string): boolean {
  return input.includes("\u{FF7D}");
}
