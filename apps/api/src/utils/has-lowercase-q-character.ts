import { containsSymbol } from "./contains-symbol";

export function hasLowercaseQCharacter(value: string): boolean {
  return containsSymbol(value, "q");
}
