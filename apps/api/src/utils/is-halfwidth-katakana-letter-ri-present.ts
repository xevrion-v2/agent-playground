export function isHalfwidthKatakanaLetterRiPresent(input: string): boolean {
  return input.includes("\u{FF98}");
}
