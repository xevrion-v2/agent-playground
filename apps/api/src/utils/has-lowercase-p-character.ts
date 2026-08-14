import { containsSymbol } from "./contains-symbol";

export function hasLowercasePCharacter(value: string): boolean {
  return containsSymbol(value, "p");
}
