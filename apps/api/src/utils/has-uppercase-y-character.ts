import { containsSymbol } from "./contains-symbol";

export function hasUppercaseYCharacter(value: string): boolean {
  return containsSymbol(value, "Y");
}
