import { containsSymbol } from "./contains-symbol";

export function hasAtSymbolCharacter(value: string): boolean {
  return containsSymbol(value, "@");
}
