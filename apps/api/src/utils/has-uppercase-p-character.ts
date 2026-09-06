import { containsSymbol } from "./contains-symbol";

export function hasUppercasePCharacter(value: string): boolean {
  return containsSymbol(value, "P");
}
