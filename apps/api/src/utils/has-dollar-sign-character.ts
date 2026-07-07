import { containsSymbol } from "./contains-symbol";

export function hasDollarSignCharacter(value: string): boolean {
  return containsSymbol(value, "$");
}
