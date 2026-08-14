import { containsSymbol } from "./contains-symbol";

export function hasCloseParenthesisCharacter(value: string): boolean {
  return containsSymbol(value, ")");
}
