import { containsSymbol } from "./contains-symbol";

export function isCaretSymbolPresent(value: string): boolean {
  return containsSymbol(value, "^");
}
