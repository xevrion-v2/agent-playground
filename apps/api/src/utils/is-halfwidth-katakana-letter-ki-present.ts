export function isHalfwidthKatakanaLetterKiPresent(input: string): boolean {
  return input.includes("\u{FF77}");
}
