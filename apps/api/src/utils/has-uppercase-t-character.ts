import { containsSymbol } from "./contains-symbol";

export function hasUppercaseTCharacter(value: string): boolean {
  return containsSymbol(value, "T");
}
