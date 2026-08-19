export function isSquaredFourDotPunctuationPresent(value: string): boolean {
  return [...value].some(c => c === '\u2059');
}
