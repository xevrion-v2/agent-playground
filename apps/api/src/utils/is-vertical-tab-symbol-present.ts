const VERTICAL_TAB_SYMBOL = "\v";

export function isVerticalTabSymbolPresent(value: string): boolean {
  return value.includes(VERTICAL_TAB_SYMBOL);
}
