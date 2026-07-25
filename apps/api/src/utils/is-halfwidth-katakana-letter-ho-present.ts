export function isHalfwidthKatakanaLetterHoPresent(input: string): boolean {
  return input.includes("\u{FF8E}");
}
