import { containsSymbol } from "./contains-symbol";

export function hasOpenParenthesisCharacter(value: string): boolean {
  return containsSymbol(value, "(");
}
