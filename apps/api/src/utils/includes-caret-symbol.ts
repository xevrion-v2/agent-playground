import { containsSymbol } from "./contains-symbol";

export function includesCaretSymbol(value: string): boolean {
  return containsSymbol(value, "^");
}
