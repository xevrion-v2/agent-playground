import { containsSymbol } from "./contains-symbol";

export function detectPipeSymbol(value: string): boolean {
  return containsSymbol(value, "|");
}
