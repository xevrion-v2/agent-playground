import { containsSymbol } from "./contains-symbol";

export function hasLessThanCharacter(value: string): boolean {
  return containsSymbol(value, "<");
}
