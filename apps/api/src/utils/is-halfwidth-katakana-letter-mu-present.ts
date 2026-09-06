export function isHalfwidthKatakanaLetterMuPresent(input: string): boolean {
  return input.includes("\u{FF91}");
}
