import { containsSymbol } from "./contains-symbol";

export function hasEqualsCharacter(value: string): boolean {
  return containsSymbol(value, "=");
}
