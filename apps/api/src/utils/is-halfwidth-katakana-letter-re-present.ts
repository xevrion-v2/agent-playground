export function isHalfwidthKatakanaLetterRePresent(input: string): boolean {
  return input.includes("\u{FF9A}");
}
