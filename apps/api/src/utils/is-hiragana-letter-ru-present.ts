export function isHiraganaLetterRuPresent(input: string): boolean {
  return input.includes("\u{308B}");
}
