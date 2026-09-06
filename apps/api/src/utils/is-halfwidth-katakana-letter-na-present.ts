export function isHalfwidthKatakanaLetterNaPresent(input: string): boolean {
  return input.includes("\u{FF85}");
}
