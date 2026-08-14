import { containsSymbol } from "./contains-symbol";

export function isTildeSymbolPresent(value: string): boolean {
  return containsSymbol(value, "~");
}
