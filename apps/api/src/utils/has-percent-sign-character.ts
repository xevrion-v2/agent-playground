import { containsSymbol } from "./contains-symbol";

export function hasPercentSignCharacter(value: string): boolean {
  return containsSymbol(value, "%");
}
