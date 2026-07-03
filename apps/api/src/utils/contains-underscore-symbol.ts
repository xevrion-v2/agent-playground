import { containsSymbol } from "./contains-symbol";

export function containsUnderscoreSymbol(value: string): boolean {
  return containsSymbol(value, "_");
}
