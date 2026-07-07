import { containsSymbol } from "./contains-symbol";

export function isAmpersandSymbolPresent(value: string): boolean {
  return containsSymbol(value, "&");
}
