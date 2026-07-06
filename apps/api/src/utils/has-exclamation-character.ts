import { containsSymbol } from "./contains-symbol";

export function hasExclamationCharacter(value: string): boolean {
  return containsSymbol(value, "!");
}
