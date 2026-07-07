import { containsSymbol } from "./contains-symbol";

export function detectCaretSymbol(value: string): boolean {
  return containsSymbol(value, "^");
}
