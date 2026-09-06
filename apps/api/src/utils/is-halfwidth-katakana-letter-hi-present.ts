export function isHalfwidthKatakanaLetterHiPresent(input: string): boolean {
  return input.includes("\u{FF8B}");
}
