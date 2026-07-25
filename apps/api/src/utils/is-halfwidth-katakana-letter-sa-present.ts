export function isHalfwidthKatakanaLetterSaPresent(input: string): boolean {
  return input.includes("\u{FF7B}");
}
