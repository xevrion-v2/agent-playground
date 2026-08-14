export function isKatakanaLetterDaPresent(input: string): boolean {
  return input.includes("\u{30C0}");
}
