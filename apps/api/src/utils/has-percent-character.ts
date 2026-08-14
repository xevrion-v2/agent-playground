import { containsSymbol } from "./contains-symbol";

export function hasPercentCharacter(value: string): boolean {
  return containsSymbol(value, "%");
}
