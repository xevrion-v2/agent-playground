import { containsSymbol } from "./contains-symbol";

export function hasPipeCharacter(value: string): boolean {
  return containsSymbol(value, "|");
}
