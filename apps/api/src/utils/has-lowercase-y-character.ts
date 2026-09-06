import { containsSymbol } from "./contains-symbol";

export function hasLowercaseYCharacter(value: string): boolean {
  return containsSymbol(value, "y");
}
