export function isHalfwidthKatakanaLetterNaPresent(input: string): boolean {
  return input.includes("\uff85");
}
