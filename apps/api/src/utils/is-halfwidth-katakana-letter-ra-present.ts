export function isHalfwidthKatakanaLetterRaPresent(input: string): boolean {
  return input.includes("\u{FF97}");
}
