const NEWLINE_SYMBOL = "\n";

export function isNewlineSymbolPresent(value: string): boolean {
  return value.includes(NEWLINE_SYMBOL);
}
