import { containsSymbol } from "./contains-symbol";

export function hasLowercaseUCharacter(value: string): boolean {
  return containsSymbol(value, "u");
}
