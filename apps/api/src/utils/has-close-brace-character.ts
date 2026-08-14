import { containsSymbol } from "./contains-symbol";

export function hasCloseBraceCharacter(value: string): boolean {
  return containsSymbol(value, "}");
}
