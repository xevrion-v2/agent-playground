export function isHalfwidthKatakanaLetterToPresent(input: string): boolean {
  return input.includes("\u{FF84}");
}
