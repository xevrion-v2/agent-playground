import { containsSymbol } from "./contains-symbol";

export function hasBangCharacter(value: string): boolean {
  return containsSymbol(value, "!");
}
