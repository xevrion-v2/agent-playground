export function isIdeographicTelegraphLineFeedSeparatorSymbolPresent(input: string): boolean {
  return input.includes("\u{3037}");
}
