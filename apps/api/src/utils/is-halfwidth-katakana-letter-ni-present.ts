export function isHalfwidthKatakanaLetterNiPresent(input: string): boolean {
  return input.includes("\u{FF86}");
}
