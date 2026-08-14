export function isHalfwidthKatakanaLetterKuPresent(input: string): boolean {
  return input.includes("\u{FF78}");
}
