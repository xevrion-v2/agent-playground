import { containsSymbol } from "./contains-symbol";

export function isPipeSymbolPresent(value: string): boolean {
  return containsSymbol(value, "|");
}
