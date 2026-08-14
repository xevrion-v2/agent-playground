export function isHalfwidthKatakanaLetterHiPresent(input: string): boolean {
  return input.includes("\uff8b");
}
