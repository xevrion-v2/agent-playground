import { containsSymbol } from "./contains-symbol";

export function includesTildeSymbol(value: string): boolean {
  return containsSymbol(value, "~");
}
