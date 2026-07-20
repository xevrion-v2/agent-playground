const CARRIAGE_RETURN_SYMBOL = "\r";

export function isCarriageReturnSymbolPresent(value: string): boolean {
  return value.includes(CARRIAGE_RETURN_SYMBOL);
}
