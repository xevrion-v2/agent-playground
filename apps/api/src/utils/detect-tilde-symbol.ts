import { containsSymbol } from "./contains-symbol";

export function detectTildeSymbol(value: string): boolean {
  return containsSymbol(value, "~");
}
