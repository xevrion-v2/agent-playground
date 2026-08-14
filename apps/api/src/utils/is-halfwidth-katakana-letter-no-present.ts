export function isHalfwidthKatakanaLetterNoPresent(input: string): boolean {
  return input.includes("\uff89");
}
