export function isHalfwidthKatakanaLetterRuPresent(input: string): boolean {
  return input.includes("\uff99");
}
