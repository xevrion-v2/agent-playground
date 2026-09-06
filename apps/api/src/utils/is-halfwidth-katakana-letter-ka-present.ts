export function isHalfwidthKatakanaLetterKaPresent(input: string): boolean {
  return input.includes("\u{FF76}");
}
