import { containsSymbol } from "./contains-symbol";

export function hasOpenBraceCharacter(value: string): boolean {
  return containsSymbol(value, "{");
}
