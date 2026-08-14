import { containsSymbol } from "./contains-symbol";

export function hasDotCharacter(value: string): boolean {
  return containsSymbol(value, ".");
}
