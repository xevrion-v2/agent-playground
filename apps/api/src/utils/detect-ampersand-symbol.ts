import { containsSymbol } from "./contains-symbol";

export function detectAmpersandSymbol(value: string): boolean {
  return containsSymbol(value, "&");
}
