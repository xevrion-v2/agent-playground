export function isKatakanaHiraganaDoubleHyphenPresent(input: string): boolean {
  return input.includes("\u{30A0}");
}
