export function isKatakanaLetterWaPresent(input: string): boolean {
  return input.includes("\u{30EF}");
}
