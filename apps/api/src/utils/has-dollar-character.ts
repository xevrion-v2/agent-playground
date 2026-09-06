import { containsSymbol } from "./contains-symbol";

export function hasDollarCharacter(value: string): boolean {
  return containsSymbol(value, "$");
}
