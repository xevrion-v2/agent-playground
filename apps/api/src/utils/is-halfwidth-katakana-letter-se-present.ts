export function isHalfwidthKatakanaLetterSePresent(input: string): boolean {
  return input.includes("\u{FF7E}");
}
