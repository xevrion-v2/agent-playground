export function isKatakanaLetterNoPresent(input: string): boolean {
  return input.includes("\u{30CE}");
}
