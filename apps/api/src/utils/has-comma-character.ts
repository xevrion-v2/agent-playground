import { containsSymbol } from "./contains-symbol";

export function hasCommaCharacter(value: string): boolean {
  return containsSymbol(value, ",");
}
