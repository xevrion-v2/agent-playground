export function isFourDotPunctuationPresent(value: string): boolean {
  return [...value].some(c => c === '\u2057');
}
