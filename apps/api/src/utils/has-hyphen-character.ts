import { containsSymbol } from "./contains-symbol";

export function hasHyphenCharacter(value: string): boolean {
  return containsSymbol(value, "-");
}
