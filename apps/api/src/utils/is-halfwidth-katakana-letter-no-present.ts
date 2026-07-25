export function isHalfwidthKatakanaLetterNoPresent(input: string): boolean {
  return input.includes("\u{FF89}");
}
