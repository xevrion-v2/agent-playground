import { containsSymbol } from "./contains-symbol";

export function hasCaretCharacter(value: string): boolean {
  return containsSymbol(value, "^");
}
