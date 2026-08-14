import { containsSymbol } from "./contains-symbol";

export function hasPeriodCharacter(value: string): boolean {
  return containsSymbol(value, ".");
}
