export function isHalfwidthKatakanaLetterMaPresent(input: string): boolean {
  return input.includes("\u{FF8F}");
}
