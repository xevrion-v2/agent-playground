import { containsSymbol } from "./contains-symbol";

export function hasGreaterThanCharacter(value: string): boolean {
  return containsSymbol(value, ">");
}
