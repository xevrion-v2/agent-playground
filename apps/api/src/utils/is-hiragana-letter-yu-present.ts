export function isHiraganaLetterYuPresent(input: string): boolean {
  return input.includes("\u{3086}");
}
