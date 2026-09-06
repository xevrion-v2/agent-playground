export function isHalfwidthKatakanaLetterKePresent(input: string): boolean {
  return input.includes("\u{FF79}");
}
