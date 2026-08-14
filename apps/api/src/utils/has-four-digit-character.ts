import { containsSymbol } from "./contains-symbol";

export function hasFourDigitCharacter(value: string): boolean {
  return containsSymbol(value, "4");
}
