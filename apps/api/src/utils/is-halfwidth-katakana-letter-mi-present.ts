export function isHalfwidthKatakanaLetterMiPresent(input: string): boolean {
  return input.includes("\u{FF90}");
}
