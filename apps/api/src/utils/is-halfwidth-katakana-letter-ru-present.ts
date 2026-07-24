export function isHalfwidthKatakanaLetterRuPresent(input: string): boolean {
  return input.includes("\u{FF99}");
}
