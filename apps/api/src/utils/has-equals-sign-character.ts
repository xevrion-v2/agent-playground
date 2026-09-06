import { containsSymbol } from "./contains-symbol";

export function hasEqualsSignCharacter(value: string): boolean {
  return containsSymbol(value, "=");
}
