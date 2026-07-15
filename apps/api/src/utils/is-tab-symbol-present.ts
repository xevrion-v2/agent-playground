const TAB_SYMBOL = "\t";

export function isTabSymbolPresent(value: string): boolean {
  return value.includes(TAB_SYMBOL);
}
