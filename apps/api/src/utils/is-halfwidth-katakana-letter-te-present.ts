export function isHalfwidthKatakanaLetterTePresent(input: string): boolean {
  return input.includes("\u{FF83}");
}
