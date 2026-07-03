import { containsSymbol } from "./contains-symbol";

export function isUnderscoreSymbolPresent(value: string): boolean {
  return containsSymbol(value, "_");
}
