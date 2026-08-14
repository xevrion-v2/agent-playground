import { containsSymbol } from "./contains-symbol";

export function hasLowercaseTCharacter(value: string): boolean {
  return containsSymbol(value, "t");
}
