export function isHalfwidthKatakanaLetterHaPresent(input: string): boolean {
  return input.includes("\u{FF8A}");
}
