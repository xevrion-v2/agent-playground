import { containsSymbol } from "./contains-symbol";

export function hasUppercaseQCharacter(value: string): boolean {
  return containsSymbol(value, "Q");
}
