import { containsSymbol } from "./contains-symbol";

export function hasTildeCharacter(value: string): boolean {
  return containsSymbol(value, "~");
}
