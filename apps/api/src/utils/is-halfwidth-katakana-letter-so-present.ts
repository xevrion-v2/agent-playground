export function isHalfwidthKatakanaLetterSoPresent(input: string): boolean {
  return input.includes("\uff7f");
}
