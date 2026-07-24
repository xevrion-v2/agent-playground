export function isHalfwidthKatakanaLetterMoPresent(input: string): boolean {
  return input.includes("\u{FF93}");
}
