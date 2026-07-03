import { containsSymbol } from "./contains-symbol";

export function detectHashSymbol(value: string): boolean {
  return containsSymbol(value, "#");
}
