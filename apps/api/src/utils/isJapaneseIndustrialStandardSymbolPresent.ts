export function isJapaneseIndustrialStandardSymbolPresent(value: string): boolean {
  return [...value].some(c => c === '\u29E3');
}
