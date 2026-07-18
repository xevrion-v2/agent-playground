export function isKatakanaLetterHaPresent(input: string): boolean {
  return input.includes("\u{30CF}");
}
