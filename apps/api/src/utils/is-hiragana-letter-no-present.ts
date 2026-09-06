export function isHiraganaLetterNoPresent(input: string): boolean {
  return input.includes("\u{306E}");
}
