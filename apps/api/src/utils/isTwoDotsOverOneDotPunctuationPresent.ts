export function isTwoDotsOverOneDotPunctuationPresent(value: string): boolean {
  return [...value].some(c => c === '\u2E3A');
}
