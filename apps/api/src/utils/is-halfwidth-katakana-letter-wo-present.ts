export function isHalfwidthKatakanaLetterWoPresent(input: string): boolean {
  return input.includes("\u{FF66}");
}
