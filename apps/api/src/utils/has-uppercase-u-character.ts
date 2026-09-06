import { containsSymbol } from "./contains-symbol";

export function hasUppercaseUCharacter(value: string): boolean {
  return containsSymbol(value, "U");
}
