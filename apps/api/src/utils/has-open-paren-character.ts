import { containsSymbol } from "./contains-symbol";

export function hasOpenParenCharacter(value: string): boolean {
  return containsSymbol(value, "(");
}
