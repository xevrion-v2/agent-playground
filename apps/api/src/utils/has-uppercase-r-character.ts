import { containsSymbol } from "./contains-symbol";

export function hasUppercaseRCharacter(value: string): boolean {
  return containsSymbol(value, "R");
}
