export function isHiraganaLetterSmallYuPresent(input: string): boolean {
  return input.includes("\u{3085}");
}
