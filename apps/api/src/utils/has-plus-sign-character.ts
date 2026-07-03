import { containsSymbol } from "./contains-symbol";

export function hasPlusSignCharacter(value: string): boolean {
  return containsSymbol(value, "+");
}
