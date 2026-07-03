import { containsSymbol } from "./contains-symbol";

export function hasAmpersandCharacter(value: string): boolean {
  return containsSymbol(value, "&");
}
