import { containsSymbol } from "./contains-symbol";

export function hasUppercaseZCharacter(value: string): boolean {
  return containsSymbol(value, "Z");
}
