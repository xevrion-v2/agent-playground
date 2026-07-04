import { containsSymbol } from "./contains-symbol";

export function containsColonSymbol(value: string): boolean {
  return containsSymbol(value, ":");
}
