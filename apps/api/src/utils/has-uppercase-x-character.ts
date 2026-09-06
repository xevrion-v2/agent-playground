import { containsSymbol } from "./contains-symbol";

export function hasUppercaseXCharacter(value: string): boolean {
  return containsSymbol(value, "X");
}
