export function isThreeDotPunctuationPresent(value: string): boolean {
  return [...value].some(c => c === '\u2056');
}
