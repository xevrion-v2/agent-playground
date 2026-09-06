export function isHalfwidthKatakanaLetterSiPresent(input: string): boolean {
  return input.includes("\u{FF7C}");
}
