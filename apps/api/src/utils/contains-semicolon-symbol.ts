import { containsSymbol } from "./contains-symbol";

export function containsSemicolonSymbol(value: string): boolean {
  return containsSymbol(value, ";");
}
