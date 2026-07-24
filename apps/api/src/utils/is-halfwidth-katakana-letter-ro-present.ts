export function isHalfwidthKatakanaLetterRoPresent(input: string): boolean {
  return input.includes("\u{FF9B}");
}
