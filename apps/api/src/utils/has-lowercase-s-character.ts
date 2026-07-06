import { containsSymbol } from "./contains-symbol";

export function hasLowercaseSCharacter(value: string): boolean {
  return containsSymbol(value, "s");
}
