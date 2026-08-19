export function isTwoDotPunctuationPresent(value: string): boolean {
  return [...value].some(c => c === '\u205A');
}
