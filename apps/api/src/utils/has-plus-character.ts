import { containsSymbol } from "./contains-symbol";

export function hasPlusCharacter(value: string): boolean {
  return containsSymbol(value, "+");
}
