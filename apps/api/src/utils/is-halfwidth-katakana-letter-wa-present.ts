export function isHalfwidthKatakanaLetterWaPresent(input: string): boolean {
  return input.includes("\u{FF9C}");
}
