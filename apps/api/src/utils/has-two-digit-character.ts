import { containsSymbol } from "./contains-symbol";

export function hasTwoDigitCharacter(value: string): boolean {
  return containsSymbol(value, "2");
}
