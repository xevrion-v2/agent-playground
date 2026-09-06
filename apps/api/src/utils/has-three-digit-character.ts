import { containsSymbol } from "./contains-symbol";

export function hasThreeDigitCharacter(value: string): boolean {
  return containsSymbol(value, "3");
}
