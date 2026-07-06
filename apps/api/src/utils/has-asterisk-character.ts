import { containsSymbol } from "./contains-symbol";

export function hasAsteriskCharacter(value: string): boolean {
  return containsSymbol(value, "*");
}
