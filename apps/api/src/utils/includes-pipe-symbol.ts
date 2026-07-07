import { containsSymbol } from "./contains-symbol";

export function includesPipeSymbol(value: string): boolean {
  return containsSymbol(value, "|");
}
