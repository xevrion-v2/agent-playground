import { containsSymbol } from "./contains-symbol";

export function hasMinusSignCharacter(value: string): boolean {
  return containsSymbol(value, "-");
}
