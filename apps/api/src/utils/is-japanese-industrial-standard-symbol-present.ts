export function isJapaneseIndustrialStandardSymbolPresent(input: string): boolean {
  return input.includes("\u{3004}");
}
