export function isHalfwidthKatakanaLetterNuPresent(input: string): boolean {
  return input.includes("\u{FF87}");
}
