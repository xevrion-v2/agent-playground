import { containsSymbol } from "./contains-symbol";

export function hasLowercaseZCharacter(value: string): boolean {
  return containsSymbol(value, "z");
}
