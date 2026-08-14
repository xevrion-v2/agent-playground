export function isHalfwidthKatakanaLetterNePresent(input: string): boolean {
  return input.includes("\u{FF88}");
}
