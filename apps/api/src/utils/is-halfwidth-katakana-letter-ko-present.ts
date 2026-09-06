export function isHalfwidthKatakanaLetterKoPresent(input: string): boolean {
  return input.includes("\u{FF7A}");
}
