export function isHalfwidthKatakanaLetterTaPresent(input: string): boolean {
  return input.includes("\uff80");
}
