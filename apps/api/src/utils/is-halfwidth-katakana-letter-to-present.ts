export function isHalfwidthKatakanaLetterToPresent(input: string): boolean {
  return input.includes("\uff84");
}
