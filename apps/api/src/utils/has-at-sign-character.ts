import { containsSymbol } from "./contains-symbol";

export function hasAtSignCharacter(value: string): boolean {
  return containsSymbol(value, "@");
}
