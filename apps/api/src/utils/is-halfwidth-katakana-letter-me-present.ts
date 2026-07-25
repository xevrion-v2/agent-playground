export function isHalfwidthKatakanaLetterMePresent(input: string): boolean {
  return input.includes("\u{FF92}");
}
