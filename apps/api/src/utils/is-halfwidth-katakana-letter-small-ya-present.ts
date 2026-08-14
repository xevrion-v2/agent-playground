export function isHalfwidthKatakanaLetterSmallYaPresent(input: string): boolean {
  return input.includes("\u{FF6C}");
}
