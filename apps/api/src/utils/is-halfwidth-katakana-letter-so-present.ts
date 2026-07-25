export function isHalfwidthKatakanaLetterSoPresent(input: string): boolean {
  return input.includes("\u{FF7F}");
}
