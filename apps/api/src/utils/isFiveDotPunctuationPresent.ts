export function isFiveDotPunctuationPresent(value: string): boolean {
  return [...value].some(c => c === '\u2058');
}
