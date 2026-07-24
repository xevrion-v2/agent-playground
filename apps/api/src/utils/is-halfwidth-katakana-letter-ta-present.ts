export function isHalfwidthKatakanaLetterTaPresent(input: string): boolean {
  return input.includes("\u{FF80}");
}
