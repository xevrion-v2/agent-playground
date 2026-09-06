export function isIdeographicTelegraphLineFeedSeparatorSymbolPresent(value: string): boolean {
  return [...value].some(c => c === '\u23CE');
}
