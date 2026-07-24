export function isHalfwidthKatakanaLetterTiPresent(input: string): boolean {
  return input.includes("\u{FF81}");
}
