export function isFlowerPunctuationMarkPresent(value: string): boolean {
  return [...value].some(c => c === '\u2055');
}
