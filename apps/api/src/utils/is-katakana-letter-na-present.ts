export function isKatakanaLetterNaPresent(input: string): boolean {
  return input.includes("\u{30CA}");
}
