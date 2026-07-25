export function isHalfwidthKatakanaLetterHuPresent(input: string): boolean {
  return input.includes("\u{FF8C}");
}
